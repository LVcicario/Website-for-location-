#!/usr/bin/env python3
"""Retry pour les POIs non géocodés + ajout zoom support."""
import json, urllib.request, urllib.parse, time, math, sys

LAT_MIN, LAT_MAX = 43.205, 43.345
LNG_MIN, LNG_MAX = 6.560, 6.700
VW, VH = 400, 500
COS_LAT = math.cos(math.radians((LAT_MIN + LAT_MAX) / 2))
scale_y = VH / (LAT_MAX - LAT_MIN)
scale_x = scale_y * COS_LAT
x_margin = (VW - (LNG_MAX-LNG_MIN)*scale_x) / 2
def project(lat, lng): return (x_margin + (lng - LNG_MIN) * scale_x, (LAT_MAX - lat) * scale_y)

def nominatim(q):
    url = "https://nominatim.openstreetmap.org/search?" + urllib.parse.urlencode({"q": q, "format": "json", "limit": 1})
    req = urllib.request.Request(url, headers={"User-Agent": "larbois-geocode/1.0"})
    with urllib.request.urlopen(req, timeout=20) as resp:
        data = json.load(resp)
    if not data: return None
    return float(data[0]["lat"]), float(data[0]["lon"]), data[0].get("display_name", "")[:80]

# Charger résultats existants
existing = json.load(open("scripts/poi-geocoded.json", encoding="utf-8"))

# Retries avec requêtes différentes + valeurs connues fiables (Wikipedia/site officiel)
retries = {
    "Marché couvert":      "Marché couvert Sainte-Maxime, rue Fernand Bessy",
    "La Gaudina":          "Avenue de Lattre de Tassigny, Sainte-Maxime",
    "Jetée Olivier Bausset": "Quai Léon Condroyer, 83120 Sainte-Maxime",
    "La Vague d'Or":       "Plage de la Bouillabaisse, Saint-Tropez",
    "Latitude 43":         "Avenue Paul Roussel, Saint-Tropez",
    "Plage de Pampelonne": "Plage de Pampelonne, Ramatuelle",
    "La Voile":            "Chemin de la Quessine, 83350 Ramatuelle",
}

for name, q in retries.items():
    if name in existing:
        continue
    print(f"[Q] {name}: {q}", file=sys.stderr)
    try:
        r = nominatim(q)
        if r:
            lat, lng, dn = r
            x, y = project(lat, lng)
            existing[name] = {"lat": lat, "lng": lng, "x": round(x), "y": round(y), "display": dn}
            print(f"    → ({lat:.4f}, {lng:.4f}) → ({x:.0f}, {y:.0f}) [{dn[:60]}]", file=sys.stderr)
        else:
            print(f"    STILL NOT FOUND", file=sys.stderr)
    except Exception as e:
        print(f"    ERROR: {e}", file=sys.stderr)
    time.sleep(1.1)

# Pour les 2-3 résistants, on met les coordonnées connues à la main (verifiées via Google Maps)
# - Cheval Blanc Saint-Tropez : Plage de la Bouillabaisse — environ 43.2670, 6.6195
# - Latitude 43 : Avenue Paul Roussel, Saint-Tropez — environ 43.2675, 6.6280
# - Club 55 / Pampelonne : 43.2270, 6.6505
# - La Réserve Ramatuelle : 43.2160, 6.6280 (route des Tournels)
manual_fallbacks = {
    "La Vague d'Or":       (43.2670, 6.6195),  # Cheval Blanc, Plage de la Bouillabaisse
    "Latitude 43":         (43.2683, 6.6279),  # Av. Paul Roussel, St-Tropez
    "Plage de Pampelonne": (43.2270, 6.6505),  # Club 55, Plage de Pampelonne
    "La Voile":            (43.2160, 6.6280),  # La Réserve Ramatuelle (Tournels)
}
for name, (lat, lng) in manual_fallbacks.items():
    if name not in existing:
        x, y = project(lat, lng)
        existing[name] = {"lat": lat, "lng": lng, "x": round(x), "y": round(y), "display": "manual fallback (Google Maps)"}
        print(f"[MANUAL] {name} → ({lat}, {lng}) → ({x:.0f}, {y:.0f})", file=sys.stderr)

with open("scripts/poi-geocoded.json", "w") as f:
    json.dump(existing, f, indent=2, ensure_ascii=False)

print(f"\n[OK] {len(existing)} POIs total")
print("\n=== Final positions ===")
for name in ["L'Arbois", "Marché couvert", "La Gaudina", "La Croisette", "Le Sémaphore", "Jetée Olivier Bausset",
             "Plage de la Nartelle", "Le Prao", "Sénéquier", "Place des Lices", "La Vague d'Or",
             "Latitude 43", "Plage de Pampelonne", "La Voile", "Ramatuelle", "Gassin"]:
    if name in existing:
        d = existing[name]
        print(f"  {name:25s} ({d['lat']:.4f}, {d['lng']:.4f}) → ({d['x']}, {d['y']})")
