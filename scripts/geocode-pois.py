#!/usr/bin/env python3
"""Géocode chaque POI via Nominatim (OSM) pour avoir des coordonnées GPS exactes."""
import json, urllib.request, urllib.parse, time, math, sys

LAT_MIN, LAT_MAX = 43.205, 43.345
LNG_MIN, LNG_MAX = 6.560, 6.700
VW, VH = 400, 500
COS_LAT = math.cos(math.radians((LAT_MIN + LAT_MAX) / 2))
scale_y = VH / (LAT_MAX - LAT_MIN)
scale_x = scale_y * COS_LAT
x_margin = (VW - (LNG_MAX-LNG_MIN)*scale_x) / 2

def project(lat, lng):
    return (x_margin + (lng - LNG_MIN) * scale_x, (LAT_MAX - lat) * scale_y)

# Queries pour Nominatim — précises
queries = {
    "L'Arbois":            "24 Avenue Général Leclerc, 83120 Sainte-Maxime, France",
    "Marché couvert":      "Marché couvert, Place du Marché, Sainte-Maxime",
    "La Gaudina":          "Plage de la Gaudina, Sainte-Maxime",
    "Le Sémaphore":        "Sémaphore, Sainte-Maxime",
    "La Croisette":        "Pointe de la Croisette, Sainte-Maxime",
    "Jetée Olivier Bausset": "Jetée Olivier Bausset, Sainte-Maxime",
    "Plage de la Nartelle": "Plage de la Nartelle, Sainte-Maxime",
    "Le Prao":             "39 Avenue du Général Touzet du Vigier, Sainte-Maxime",
    "Sénéquier":           "Sénéquier, Quai Jean Jaurès, Saint-Tropez",
    "Place des Lices":     "Place des Lices, Saint-Tropez",
    "La Vague d'Or":       "Cheval Blanc Saint-Tropez, Plage de la Bouillabaisse, Saint-Tropez",
    "Latitude 43":         "Résidence Latitude 43, Saint-Tropez",
    "Plage de Pampelonne": "Club 55, Boulevard Patch, Ramatuelle",
    "La Voile":            "La Réserve Ramatuelle, Chemin de la Quessine, Ramatuelle",
    "Ramatuelle":          "Place de l'Ormeau, Ramatuelle",
    "Gassin":              "Place dei Barri, Gassin",
}

def nominatim(q):
    url = "https://nominatim.openstreetmap.org/search?" + urllib.parse.urlencode({
        "q": q, "format": "json", "limit": 1,
    })
    req = urllib.request.Request(url, headers={"User-Agent": "larbois-geocode/1.0 (luca@larbois.example)"})
    with urllib.request.urlopen(req, timeout=20) as resp:
        data = json.load(resp)
    if not data:
        return None
    return float(data[0]["lat"]), float(data[0]["lon"]), data[0].get("display_name", "")

results = {}
for name, q in queries.items():
    print(f"[Q] {name}: {q}", file=sys.stderr)
    try:
        r = nominatim(q)
        if r:
            lat, lng, dn = r
            x, y = project(lat, lng)
            results[name] = {"lat": lat, "lng": lng, "x": round(x), "y": round(y), "display": dn[:80]}
            print(f"    → ({lat:.4f}, {lng:.4f}) → ({x:.0f}, {y:.0f}) [{dn[:60]}]", file=sys.stderr)
        else:
            print(f"    NOT FOUND", file=sys.stderr)
    except Exception as e:
        print(f"    ERROR: {e}", file=sys.stderr)
    time.sleep(1.1)  # rate limit Nominatim

with open("scripts/poi-geocoded.json", "w") as f:
    json.dump(results, f, indent=2, ensure_ascii=False)
print(f"\n[OK] {len(results)} POIs geocoded → scripts/poi-geocoded.json")
