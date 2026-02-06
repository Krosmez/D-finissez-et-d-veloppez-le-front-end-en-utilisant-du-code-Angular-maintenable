# Olympic Games Dashboard

## Prérequis

- Node.js (version recommandée : LTS)
- Angular CLI 18.0.6

## Installation

```bash
npm install
```

## Développement

Lancer le serveur de développement :

```bash
ng serve
```

L'application sera accessible sur `http://localhost:4200/`

## Build

```bash
ng build
```

Les fichiers de production seront générés dans un dossier `dist/`.

## Architecture

```
src/app/
├── components/             # Composants réutilisables
│   ├── pie-chart/          # Graphique camembert (Chart.js)
│   ├── line-chart/         # Graphique linéaire (Chart.js)
│   ├── stats-header/       # Header avec les stats et le titre
│   └── loading/            # Composant de chargement de page (spinner)
│
├── pages/                  # Composants de pages
│   ├── home/               # Page d'accueil avec vue sur le camembert
│   ├── country/            # Page détail d'un pays avec graphique linéaire
│   └── not-found/          # Page 404
│
├── services/               # Services métier
│   └── data.service.ts     # Gestion des données olympiques
│
└── models/                 # Interfaces de données TypeScript
    ├── Olympic.ts          # Modèle de données olympiques
    ├── Participation.ts    # Modèle de participation
    └── Stats.ts            # Modèle de statistique pour les inputs
```

**Principes appliqués** :

- Composants réutilisables
- Typage TypeScript strict (sans `any`)
- Séparation présentation/logique métier

## Technologies

- Angular 18
- TypeScript
- Chart.js

## Aperçu de l'application

### Page d'accueil

<table>
  <tr>
    <td><b>Desktop</b></td>
    <td><b>Mobile</b></td>
  </tr>
  <tr>
    <td><img src="./screenshots/home-desktop.png" alt="Page d'accueil - Desktop" width="500"/></td>
    <td><img src="./screenshots/home-mobile.png" alt="Page d'accueil - Mobile" width="250"/></td>
  </tr>
</table>

### Page détail pays

<table>
  <tr>
    <td><b>Desktop</b></td>
    <td><b>Mobile</b></td>
  </tr>
  <tr>
    <td><img src="./screenshots/country-desktop.png" alt="Page pays - Desktop" width="500"/></td>
    <td><img src="./screenshots/country-mobile.png" alt="Page pays - Mobile" width="250"/></td>
  </tr>
</table>
