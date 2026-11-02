# Apex Drive 3D — app Next.js

App réelle construite à partir de la maquette `../apex-maquette/maquette-v13.html`
(source unique de vérité : écrans, flux et données repris tels quels, sauf les
corrections d'honnêteté notées ci-dessous). App Router, TypeScript, sans backend.

## Lancer en local

```bash
npm install
npm run build
npm run start   # http://localhost:3000
```

## Routes

- `/` — Accueil : géolocalisation simulée, recherche de centre, lien vers l'arbre
- `/centres` — Arbre des centres : tronc Ontario, 5 branches régions, 26 feuilles centres, filtre
- `/centres/[id]` — Fiche centre : adresse, itinéraire Maps, date d'examen persistée
  avec compte à rebours, parcours (Etobicoke) ou « Parcours à venir »
- `/parcours/[id]` — Détail parcours (1 gratuit ; 2–5 verrouillés → paywall),
  carte schématique distincte par parcours, manœuvres, examen blanc, mode démo
- `/compte` — Mon centre, mes parcours, outils, données locales

## Persistance locale

`localStorage`, clé `apex-drive-v13` (migration depuis `apex-drive-v12`) :
date d'examen, centre choisi, filtre de parcours, signalements enregistrés.
Aucun compte, aucun serveur, aucun secret, aucune clé API.

## Écarts honnêtes par rapport à la maquette (décidés, pas inventés)

- **Recherche corrigée** : la maquette renvoyait Etobicoke pour n'importe quelle
  saisie. L'app ne renvoie que les centres qui correspondent vraiment (nom, ville,
  adresse) et affiche « Aucun centre ne correspond » sinon.
- **Géolocalisation toujours simulée** : le bouton « Utiliser ma position »
  affiche Etobicoke à 3,2 km, étiqueté « Distance fictive » comme dans la maquette.
  Pas de vraie géolocalisation tant qu'aucune permission/position réelle n'est branchée.
- **Parcours verrouillés** : l'accès direct à `/parcours/2` … `/parcours/5`
  affiche le paywall, pas le détail (comme le clic dans la maquette).
- **« Me prévenir »** : toast local seulement, comme la maquette (pas d'envoi,
  pas de notification push — tranche 2).

## Lacunes (backend inexistant, implémenté en local ou en « bientôt » explicite)

- Prix de l'accès complet : « Prix à définir » (décision de Mike en attente),
  aucun parcours d'achat, aucun paiement.
- Tracés de parcours : schémas SVG reconstitués, non officiels ; manœuvres
  fictives étiquetées comme telles. Les tracés exacts varient selon l'examinateur.
- Centres hors Etobicoke : aucun parcours documenté — « Parcours à venir »,
  jamais inventé.
- Signalements : enregistrés localement seulement ; envoi à l'équipe en tranche 2.
- Cartes hors-ligne / PWA installable : « bientôt » explicite (tranche 2).
- Navigation GPS du parcours : l'app ouvre l'itinéraire Maps vers le centre ;
  le guidage du parcours lui-même arrive en tranche 3.
- Le « 3D » du nom : non tranché (vraie carte 3D vs schémas distincts par
  parcours — les schémas distincts sont implémentés, pas de 3D réelle).
- Centres : les adresses sont celles de la maquette, présentées comme issues
  des annuaires publics DriveTest ; elles n'ont pas été re-vérifiées une par une
  dans ce chantier (lien officiel drivetest.ca affiché dans l'app).

## Ambiguïtés de la maquette (notées, non inventées)

- La maquette v13 dit « 5 régions » mais nomme la branche GTA
  « Centre de l'Ontario — Grand Toronto » : repris tel quel.
- La région « Ouest de l'Ontario » ne contient qu'un seul centre (Collingwood)
  dans la maquette : repris tel quel (total 26 = 10 + 5 + 5 + 1 + 5).
- Le centre sélectionné par défaut est Etobicoke (maquette) : repris tel quel.

## Déploiement Render (étape suivante, NON faite ici)

Voir la doc Render « Deploy a Next.js App » (lien fourni par Mike).
Reste à faire, par Mike ou sur son go explicite : créer le compte Render,
connecter le dépôt Git contenant ce projet (aucun dépôt créé ici),
choisir le type de service Web Next.js, et définir les variables
d'environnement — **aucune n'est requise par cette version** (pas de backend,
pas de clé API, pas de base de données). Vérifier ensuite l'URL publique
servie par Render avant toute annonce.
