# Notes d'Architecture - Review

## 1. Appels HTTP directement dans les composants

- HttpClient injecté et utilisé directement dans les composants, ceci est un anti-pattern.
- Code dupliqué : même URL `./assets/mock/olympic.json` dans les 2 composants
- Violation de la séparation des responsabilités

---

## 2. Code dupliqué ou obsolète

Les deux composants (`home.component.ts` et `country.component.ts`) effectuent un appel HTTP identique (`this.http.get<any[]>(this.olympicUrl)`) et traitent les données de manière similaire.

C'est un anti-pattern qui rend le code fragile – une modification des données mockées nécessiterait des changements dans deux endroits. Un service partagé éliminerait cette duplication et centraliserait la logique.

---

## 3. Absence de typage strict (utilisation de any)

Problèmes de typage :

`data` ainsi que les mappings sont typés `any[]`. Ce problème est récurrent sur les composants `home` et `country`.

L'utilisation de any désactive les vérifications TypeScript.

---

## 4. Bouts de code à supprimer

Plusieurs logs de dév sont encore présents en production (voir lignes 22 et 27 du `home` component).

Il faudrait les remplacer par un logger structuré.

---

## 5. Mauvaise gestion des observables

Dans les deux composants il n'y a pas de `unsubscribe` ce qui peux être la cause de fuites de mémoires.

---

## 6. Gestion des données directement dans un composant (anti-pattern)

Pour faciliter la maintenabilité et les tests les composants devraient utiliser une couche de service plutôt que gérer cela directement dans le composant lui-même.

---

## 7. Fichiers mal placés

Aucun dossier services/ ou fichier service. La logique est dans les composants, ce qui est incorrect.
Idem aucune arborescence pour les models ou les components.

Exemple :

Créer un `OlympicService` pour centraliser les données.

# Notes d'Architecture - Conception

```
src/app/
├── components/             # Composants réutilisables standalone
│   ├── line-chart/
│   ├── pie-chart/
│   ├── stats-header/
│   └── loading/
│
├── pages/                  # Composants de pages
│   ├── home/
│   ├── country/
│   └── not-found/
│
├── services/               # Services métier
│   ├── data.service.ts
│   └── chart.service.ts
│
├── models/                 # Interfaces TypeScript
│   ├── Olympic.ts
│   └── Participation.ts
│
├── constants/              # Constantes de l'application
│
├── app.config.ts           # Modules principal de l'application
├── app.routes.ts           # Modules principal de l'application
├── app.ts                  # Modules principal de l'application
├── app.html                # Modules principal de l'application
├── app.scss                # Modules principal de l'application
└── app.module.ts           # Modules principal de l'application
```

## `components/` (Composants réutilisables standalone)

Dossier pour les composants UI réutilisables, non liés à une page spécifique. Ils sont "standalone" (indépendants de NgModule).

### Sous-dossiers :

- `line-chart/` : Composant pour afficher un graphique en ligne (ex. évolution des médailles par année pour un pays, comme dans country.component).
- `pie-chart/` : Composant pour le graphique circulaire (ex. répartition des médailles par pays, comme dans home.component).
- `stats-header/` : Composant pour afficher des statistiques communes (ex. nombre de pays/JO, totaux de médailles).
- `loading/` : Composant pour indiquer le chargement (ex. pendant les appels HTTP).

## `pages/` (Composants de pages / Routing)

Dossier pour les composants liés aux routes/pages spécifiques. Ils orchestrent l'UI et appellent les services.

### Sous-dossiers :

- `home/` : Page d'accueil (liste des pays avec pie chart et stats globales).
- `country/` : Page détail d'un pays (line chart et stats spécifiques).
- `not-found/` : Page 404 (simple, sans logique).

## `services/` (Services métier)

Dossier pour la logique métier et l'accès aux données. <br/>
Les services sont des singletons injectables.

### Fichiers :

- `data.service.ts` : <br/>
  Service pour récupérer et traiter les données olympiques (ex. appels HTTP au mock JSON, calculs de totaux). Remplace les appels directs dans les composants.

- `chart.service.ts` : <br/>
  Service pour configurer et créer les instances Chart.js (ex. méthodes pour buildPieChart et buildChart). Centralise la logique graphique.

## `models/` (Interfaces TypeScript)

Dossier pour les définitions de types/interfaces.

### Fichiers :

- `Olympic.ts` : Interface pour un objet olympique.<br/>

```
interface Olympic {
  id: number;
  country: string;
  participations: Participation[];
}
```

- `Participation.ts` : Interface pour une participation.<br/>

```
interface Participation {
  id: number;
  year: number;
  city: string;
  medalsCount: number;
  athleteCount: number;
}
```

## constants/ (Constantes de l'application)

Dossier pour les valeurs fixes (ex. couleurs des graphiques, URLs, seuils).

---
