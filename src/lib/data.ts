// Source unique de vérité — copiée verbatim de ~/workspace/apex-maquette/maquette-v13.html
// Tronc : Ontario. Branches : les 5 régions DriveTest. Feuilles : les centres.
// Adresses issues des annuaires publics DriveTest (selon la maquette).
// Seul Etobicoke a des parcours documentés ; les autres sont « à venir ».

export type Centre = {
  id: string;
  name: string;
  city: string;
  addr: string;
  routes?: boolean;
};

export type Region = { id: string; name: string; centres: Centre[] };

export const REGIONS: Region[] = [
  {
    id: "gta",
    name: "Centre de l'Ontario — Grand Toronto",
    centres: [
      { id: "barrie", name: "DriveTest Barrie", city: "Barrie", addr: "520 Bryne Dr, Unit 7, Barrie (ON) L4N 9P6" },
      { id: "brampton", name: "DriveTest Brampton", city: "Brampton", addr: "59 First Gulf Blvd, Unit 9, Brampton (ON) L6W 4P9" },
      { id: "burlington", name: "DriveTest Burlington", city: "Burlington", addr: "1250 Brant St, Unit 2, Burlington (ON) L7P 1X8" },
      { id: "etobicoke", name: "DriveTest Etobicoke", city: "Toronto", addr: "5555 Eglinton Ave W, Unit E120-124, Toronto (ON) M9C 5M1", routes: true },
      { id: "hamilton", name: "DriveTest Hamilton", city: "Hamilton", addr: "370 Kenora Ave, Hamilton (ON) L8E 2W2" },
      { id: "mississauga", name: "DriveTest Mississauga", city: "Mississauga", addr: "255 Longside Dr, Mississauga (ON) L5W 1L8" },
      { id: "newmarket", name: "DriveTest Newmarket", city: "Newmarket", addr: "320 Harry Walker Pkwy S, Newmarket (ON) L3Y 7B4" },
      { id: "downsview", name: "DriveTest Toronto Downsview", city: "Toronto", addr: "37 Carl Hall Rd, Toronto (ON) M3K 2E2" },
      { id: "metroeast", name: "DriveTest Toronto Metro East", city: "Toronto", addr: "1448 Lawrence Ave E, Unit 15, Toronto (ON) M4A 2V6" },
      { id: "portunion", name: "DriveTest Toronto Port Union", city: "Toronto", addr: "91 Rylander Blvd, Toronto (ON) M1B 5M5" },
    ],
  },
  {
    id: "est",
    name: "Est de l'Ontario",
    centres: [
      { id: "arnprior", name: "DriveTest Arnprior", city: "Arnprior", addr: "49 Daniel St N, Arnprior (ON) K7S 2K6" },
      { id: "belleville", name: "DriveTest Belleville", city: "Belleville", addr: "345 College St E, Unit 12, Belleville (ON) K8N 5S7" },
      { id: "cornwall", name: "DriveTest Cornwall", city: "Cornwall", addr: "120 Tollgate Rd W, Cornwall (ON) K6J 5M3" },
      { id: "canotek", name: "DriveTest Ottawa Canotek", city: "Ottawa", addr: "5303 Canotek Rd, Unit 14, Ottawa (ON) K1J 9M1" },
      { id: "walkley", name: "DriveTest Ottawa Walkley", city: "Ottawa", addr: "1570 Walkley Rd, Ottawa (ON) K1V 6P5" },
    ],
  },
  {
    id: "sud",
    name: "Sud de l'Ontario",
    centres: [
      { id: "brantford", name: "DriveTest Brantford", city: "Brantford", addr: "320 North Park St, Unit 1B, Brantford (ON) N3R 4L3" },
      { id: "guelph", name: "DriveTest Guelph", city: "Guelph", addr: "255 Woodlawn Rd W, Unit 106, Guelph (ON) N1H 8J1" },
      { id: "kitchener", name: "DriveTest Kitchener", city: "Kitchener", addr: "1405 Ottawa St N, Unit 112, Kitchener (ON) N2A 3Z1" },
      { id: "windsor", name: "DriveTest Windsor", city: "Windsor", addr: "2470 Dougall Ave, Windsor (ON) N8X 1T2" },
      { id: "woodstock", name: "DriveTest Woodstock", city: "Woodstock", addr: "476 Peel St, Woodstock (ON) N4S 1K1" },
    ],
  },
  {
    id: "ouest",
    name: "Ouest de l'Ontario",
    centres: [
      { id: "collingwood", name: "DriveTest Collingwood", city: "Collingwood", addr: "191 Hurontario St, Unit 6, Collingwood (ON) L9Y 2M1" },
    ],
  },
  {
    id: "nord",
    name: "Nord de l'Ontario",
    centres: [
      { id: "atikokan", name: "DriveTest Atikokan", city: "Atikokan", addr: "115 O'Brien St, Atikokan (ON) P0T 1C0" },
      { id: "blindriver", name: "DriveTest Blind River", city: "Blind River", addr: "110 Indiana Ave, Blind River (ON) P0R 1B0" },
      { id: "cochrane", name: "DriveTest Cochrane", city: "Cochrane", addr: "4 Third Ave, Cochrane (ON) P0N 1J0" },
      { id: "fortfrances", name: "DriveTest Fort Frances", city: "Fort Frances", addr: "533 Mowat Ave, Fort Frances (ON) P9A 1Z1" },
      { id: "kirklandlake", name: "DriveTest Kirkland Lake", city: "Kirkland Lake", addr: "150 Government Rd W, Kirkland Lake (ON) P2N 2E9" },
    ],
  },
];

export const ALL_CENTRES: Centre[] = REGIONS.flatMap((r) => r.centres);

export function findCentre(id: string): Centre | null {
  return ALL_CENTRES.find((c) => c.id === id) ?? null;
}

export function searchCentres(query: string): Centre[] {
  const q = query.toLowerCase().trim();
  if (!q) return [];
  return ALL_CENTRES.filter(
    (c) =>
      c.name.toLowerCase().includes(q) ||
      c.city.toLowerCase().includes(q) ||
      c.addr.toLowerCase().includes(q),
  );
}

export function mapsUrl(addr: string): string {
  return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(addr)}`;
}

// Parcours d'Etobicoke — tracés schématiques DISTINCTS par parcours (v13).
// Reconstitués, non officiels. Les tracés exacts varient selon l'examinateur et le jour.
export type RouteMeta = {
  id: string;
  title: string;
  km: string;
  minutes: string;
  path: string;
  isNew: boolean;
  isPop: boolean;
  locked: boolean;
};

export const ETOBICOKE_ROUTES: RouteMeta[] = [
  { id: "1", title: "Parcours 1 — Boucle", km: "6,4 km", minutes: "environ 18 min", path: "M200,150 L200,75 L300,75 L300,150 L300,225 L100,225 L100,150 L200,150", isNew: false, isPop: true, locked: false },
  { id: "2", title: "Parcours 2 — Boucle", km: "5,8 km", minutes: "environ 16 min", path: "M200,150 L200,225 L300,225 L300,75 L100,75 L100,150 L200,150", isNew: true, isPop: true, locked: true },
  { id: "3", title: "Parcours 3 — Boucle", km: "7,1 km", minutes: "environ 20 min", path: "M200,150 L100,150 L100,75 L300,75 L300,225 L200,225 L200,150", isNew: false, isPop: true, locked: true },
  { id: "4", title: "Parcours 4 — Boucle", km: "6,0 km", minutes: "environ 17 min", path: "M200,150 L200,75 L100,75 L100,225 L300,225 L300,150 L200,150", isNew: true, isPop: false, locked: true },
  { id: "5", title: "Parcours 5 — Boucle", km: "6,9 km", minutes: "environ 19 min", path: "M200,150 L300,150 L300,75 L100,75 L100,225 L200,225 L200,150", isNew: false, isPop: false, locked: true },
];

export function findRoute(id: string): RouteMeta | null {
  return ETOBICOKE_ROUTES.find((r) => r.id === id) ?? null;
}

// Manœuvres — exemples FICTIFS de la maquette, étiquetés comme tels.
export const MANOEUVRES = [
  { t: "Stationnement parallèle", s: "Rue des Lilas — côté droit (exemple fictif)" },
  { t: "Demi-tour en trois temps", s: "Rue des Érables — zone résidentielle (exemple fictif)" },
  { t: "Créneau en bataille", s: "Stationnement du centre commercial (exemple fictif)" },
];

// Examen blanc — 3 questions générales de la maquette (entraînement seulement).
export const QUIZ = [
  { q: "À un panneau STOP, que devez-vous faire ?", opts: ["Ralentir seulement", "Arrêt complet, puis repartir quand c'est libre", "Klaxonner puis passer"], ok: 1 },
  { q: "Sans panneau contraire, la limite par défaut en zone résidentielle en Ontario est de…", opts: ["30 km/h", "50 km/h", "70 km/h"], ok: 1 },
  { q: "Par temps sec, la distance de sécurité recommandée derrière le véhicule devant vous est d'au moins…", opts: ["1 seconde", "2 à 3 secondes", "5 secondes"], ok: 1 },
];

// Visite guidée — 4 étapes de la maquette.
export const TOUR = [
  { href: "/", text: "Étape 1 — Accueil. Trouvez votre centre par position, ou explorez l'arbre des centres." },
  { href: "/centres", text: "Étape 2 — L'arbre. Tronc : Ontario. Branches : 5 régions. Feuilles : 26 centres. Dépliez une branche, touchez un centre." },
  { href: "/centres/etobicoke", text: "Étape 3 — Centre. Adresse réelle, itinéraire Maps, date d'examen mémorisée, et parcours quand ils sont documentés." },
  { href: "/parcours/1", text: "Étape 4 — Parcours. Détail d'un parcours : carte schématique, distance, durée, manœuvres. Le parcours 1 d'Etobicoke est gratuit." },
];
