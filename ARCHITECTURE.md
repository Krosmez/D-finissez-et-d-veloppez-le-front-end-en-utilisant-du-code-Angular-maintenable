# Architecture de l'application après refactorisation

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
│   └── data.service.ts
│
├── models/                 # Interfaces TypeScript
│   ├── Olympic.ts
│   ├── Stats.ts
│   └── Participation.ts
│
│
└── app.module.ts           # Modules principal de l'application
```

## Composants

### `LineChartComponent`

- Rôle : Affiche un graphique en ligne avec Chart.js
- Inputs : `years`, `medalsData`, `chartId`
- Responsabilité : Visualisation de l'évolution des médailles par année
- Autonomie : Composant importable dans n'importe quel module

### `PieChartComponent`

- Rôle : Affiche un graphique camembert avec Chart.js
- Inputs : `countries`, `medalsData`, `chartId`
- Evénement : `pieClick` - Émission d'événement lors du clic sur une part
- Responsabilité : Visualisation des médailles par pays
- Autonomie : Composant standalone importable dans n'importe quel module

### `StatsHeaderComponent`

### `Loading`

## Pages

### `HomeComponent`

- Rôle : Dashboard de l'application
- Responsabilités :
  - Charger les données olympiques via `DataService`
  - Calculer les statistiques globales (nombre de pays, nombre de JOs)
  - Afficher le graphique camembert des médailles par pays et trouver un pays
- Services utilisés : `DataService`, `Router`

### `CountryComponent`

- Rôle : Page de détail d'un pays spécifique
- Responsabilités :
  - Récupérer les données d'un pays via son nom (paramètre de route)
  - Calculer les statistiques du pays (total de médailles, d'athlètes et de participations aux JO)
  - Afficher l'évolution des médailles par année (graphique ligne)
- Services utilisés : `DataService`, `ActivatedRoute`, `Router`

### `NotFoundComponent`

- Rôle : Page 404 pour les routes non trouvées
- Responsabilités : Afficher un message d'erreur et permettre le retour à l'accueil

## Services

### DataService

Rôle principal : Service central pour la gestion des données olympiques et la logique métier

Logiques métiers :

- `getOlympics` : Permet de fetch la liste des Olympics
- `getOlympicsByCountry` : Permet de fetch la liste des Olympics par pays
- `getTotalJOs` : Calcule le total de JO
- `getCountries` : Permet de fetch les données d'un pays
- `getTotalCountryMedals` : Retourne le total de médaille obtenue pour un pays
- `sumCountryMedals` : Additionne le total de médaille obtenue pour un Olymmpic
- `getTotalAthletes` : Calcule le total d'athletes pour un pays

## Modèles

### `Olympic.ts` : Interface pour un objet olympique.<br/>

```
interface Olympic {
  id: number;
  country: string;
  participations: Participation[];
}
```

### `Participation.ts` : Interface pour une participation.<br/>

```
interface Participation {
  id: number;
  year: number;
  city: string;
  medalsCount: number;
  athleteCount: number;
}
```

### `Stats.ts` : Interface pour les stats en heqder.<br/>

```
export interface Stats {
  title: string;
  data: number;
}
```
