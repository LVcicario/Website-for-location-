#!/usr/bin/env python3
"""
Génère le SVG de la carte à partir de données OSM réelles.
- Côte récupérée via Overpass API
- Projection equirectangulaire corrigée cos(43°N)
- Simplification Douglas-Peucker
- Assemblage en peninsulas closes (Sainte-Maxime, Saint-Tropez)
"""
import json
import math
import sys
import urllib.request
import urllib.parse

LAT_MIN, LAT_MAX = 43.205, 43.345
LNG_MIN, LNG_MAX = 6.560, 6.700
VW, VH = 400, 500

LAT_CENTER = (LAT_MIN + LAT_MAX) / 2
COS_LAT = math.cos(math.radians(LAT_CENTER))
scale_y = VH / (LAT_MAX - LAT_MIN)
scale_x = scale_y * COS_LAT
width_used = (LNG_MAX - LNG_MIN) * scale_x
x_margin = (VW - width_used) / 2

def project(lat, lng):
    x = x_margin + (lng - LNG_MIN) * scale_x
    y = (LAT_MAX - lat) * scale_y
    return x, y

# Douglas-Peucker simplification
def perp_dist(p, a, b):
    # perpendicular distance from p to line ab
    if a == b:
        return math.hypot(p[0] - a[0], p[1] - a[1])
    t = ((p[0]-a[0])*(b[0]-a[0]) + (p[1]-a[1])*(b[1]-a[1])) / ((b[0]-a[0])**2 + (b[1]-a[1])**2)
    t = max(0, min(1, t))
    proj = (a[0] + t*(b[0]-a[0]), a[1] + t*(b[1]-a[1]))
    return math.hypot(p[0]-proj[0], p[1]-proj[1])

def dp_simplify(pts, tol):
    if len(pts) < 3:
        return list(pts)
    a, b = pts[0], pts[-1]
    max_d, max_i = 0, 0
    for i in range(1, len(pts)-1):
        d = perp_dist(pts[i], a, b)
        if d > max_d:
            max_d, max_i = d, i
    if max_d > tol:
        left = dp_simplify(pts[:max_i+1], tol)
        right = dp_simplify(pts[max_i:], tol)
        return left[:-1] + right
    return [a, b]

# Fetch coastlines
query = f"""
[out:json][timeout:30];
(way["natural"="coastline"]({LAT_MIN},{LNG_MIN},{LAT_MAX},{LNG_MAX}););
(._;>;);
out body;
"""
print(f"[INFO] Fetching coastline...", file=sys.stderr)
req = urllib.request.Request(
    "https://overpass-api.de/api/interpreter",
    data=urllib.parse.urlencode({"data": query}).encode(),
    headers={"User-Agent": "larbois-build-map/1.0"},
)
with urllib.request.urlopen(req, timeout=60) as resp:
    osm = json.load(resp)

elements = osm.get("elements", [])
nodes = {e["id"]: (e["lat"], e["lon"]) for e in elements if e["type"] == "node"}
ways = [e for e in elements if e["type"] == "way"]
print(f"[INFO] {len(nodes)} nodes / {len(ways)} ways", file=sys.stderr)

# Project + simplify each way
def way_to_pts(w):
    pts = []
    for nid in w["nodes"]:
        if nid in nodes:
            lat, lng = nodes[nid]
            pts.append(project(lat, lng))
    return pts

ways_pts = [dp_simplify(way_to_pts(w), tol=1.2) for w in ways]
ways_pts = [p for p in ways_pts if len(p) >= 2]
total_pts = sum(len(p) for p in ways_pts)
print(f"[INFO] After DP simplify (tol=1.2): {total_pts} points across {len(ways_pts)} ways", file=sys.stderr)

# Try to merge ways that share endpoints (build polygons)
# This is a graph-walk: find ways whose start/end matches, chain them.
def round_pt(p, decimals=1):
    return (round(p[0], decimals), round(p[1], decimals))

def merge_ways(ways_list):
    """Walk through ways, merging where endpoints match."""
    remaining = [list(w) for w in ways_list]
    merged = []
    while remaining:
        chain = remaining.pop(0)
        progress = True
        while progress:
            progress = False
            for i, w in enumerate(remaining):
                if round_pt(w[0]) == round_pt(chain[-1]):
                    chain = chain + w[1:]
                    remaining.pop(i)
                    progress = True
                    break
                elif round_pt(w[-1]) == round_pt(chain[-1]):
                    chain = chain + list(reversed(w))[1:]
                    remaining.pop(i)
                    progress = True
                    break
                elif round_pt(w[-1]) == round_pt(chain[0]):
                    chain = w + chain[1:]
                    remaining.pop(i)
                    progress = True
                    break
                elif round_pt(w[0]) == round_pt(chain[0]):
                    chain = list(reversed(w)) + chain[1:]
                    remaining.pop(i)
                    progress = True
                    break
        merged.append(chain)
    return merged

merged_ways = merge_ways(ways_pts)
print(f"[INFO] Merged into {len(merged_ways)} chain(s)", file=sys.stderr)
for i, w in enumerate(merged_ways):
    closed = round_pt(w[0]) == round_pt(w[-1])
    print(f"  chain{i}: {len(w)} pts, closed={closed}, span y=({min(p[1] for p in w):.0f}–{max(p[1] for p in w):.0f})", file=sys.stderr)

# Build a single SVG path with each chain as a subpath
def chain_to_d(chain, close=False):
    out = "M " + " L ".join(f"{x:.1f},{y:.1f}" for x, y in chain)
    if close:
        out += " Z"
    return out

# Sort chains by size (largest first) — assume largest is main land mass
merged_ways.sort(key=len, reverse=True)

# Output: produce a "land-mass" path that closes each major chain
# For chains that touch the canvas edges, close along edges to make filled shapes.
def close_to_edges(chain):
    """Extend chain to canvas edges to form a closed polygon for fill."""
    pts = list(chain)
    sx, sy = pts[0]
    ex, ey = pts[-1]

    def edge_y(y):
        return 0 if y < VH/2 else VH

    # Decide how to close based on endpoints
    # If both endpoints near top edge, close via top
    # If near bottom, via bottom
    # If start near left edge, close via left
    # Mix: close via the appropriate corner sequence
    edges = []
    EM = 5  # edge margin tolerance

    def near_top(y): return y < EM
    def near_bot(y): return y > VH - EM
    def near_left(x): return x < EM
    def near_right(x): return x > VW - EM

    # Build close path from end to start tracing edges
    # Strategy: go to nearest edge from end, follow edge clockwise to nearest edge of start
    # Simplification: just close end -> top-right -> top-left -> start (for north peninsula)
    # or end -> bottom-right -> bottom-left -> start (for south)
    centroid_y = sum(p[1] for p in pts) / len(pts)
    if centroid_y < VH/2:
        # Sainte-Maxime peninsula — close via top
        close_path = [(ex, 0), (sx, 0)]
    else:
        # Saint-Tropez peninsula — close via bottom
        close_path = [(ex, VH), (sx, VH)]
    return pts + close_path

# Build land paths for the 2 major chains (north peninsula, south peninsula)
land_paths = []
for chain in merged_ways:
    if len(chain) < 20:
        # Skip tiny islands
        continue
    closed = close_to_edges(chain)
    d = chain_to_d(closed, close=True)
    land_paths.append({"d": d, "n": len(closed)})

print(f"\n[INFO] {len(land_paths)} land masses", file=sys.stderr)

# === POIs ===
pois = {
    "L'Arbois": (43.3093, 6.6432),
    "Le Sémaphore": (43.3221, 6.6390),
    "Marché couvert": (43.3098, 6.6363),
    "La Gaudina": (43.3083, 6.6336),
    "La Croisette": (43.3100, 6.6500),
    "Jetée Olivier Bausset": (43.3083, 6.6358),
    "Plage de la Nartelle": (43.3185, 6.6754),
    "Le Prao": (43.3175, 6.6720),
    "Sénéquier": (43.2722, 6.6378),
    "Place des Lices": (43.2706, 6.6403),
    "La Vague d'Or": (43.2669, 6.6204),
    "Latitude 43": (43.2664, 6.6280),
    "Plage de Pampelonne": (43.2278, 6.6536),
    "La Voile": (43.2161, 6.6447),
    "Ramatuelle & Gassin": (43.2200, 6.5990),
}

poi_xy = {name: project(*ll) for name, ll in pois.items()}
for name, (x, y) in poi_xy.items():
    print(f"  POI {name:25s} → ({x:.0f}, {y:.0f})", file=sys.stderr)

output = {
    "viewBox": [0, 0, VW, VH],
    "bounds": {"latMin": LAT_MIN, "latMax": LAT_MAX, "lngMin": LNG_MIN, "lngMax": LNG_MAX},
    "land": [lp["d"] for lp in land_paths],
    "land_meta": [{"n_points": lp["n"]} for lp in land_paths],
    "pois": {name: {"x": round(x), "y": round(y)} for name, (x, y) in poi_xy.items()},
}

with open("scripts/map-data.json", "w") as f:
    json.dump(output, f, indent=2, ensure_ascii=False)
print(f"\n[OK] Wrote scripts/map-data.json", file=sys.stderr)
