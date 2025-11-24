# WCS React – AFA Cheatsheet

## Installation (React)
```bash
npm install wcs-core wcs-react
```

## Imports globaux (CSS + thème)
- Ajouter en tête de votre CSS global :
```css
@import "wcs-core/dist/wcs/wcs.css";
@import "wcs-core/design-tokens/dist/sncf-holding.css";
```

## Initialisation (React)
```ts
import { defineCustomElements } from "wcs-react";
defineCustomElements();
```

## Exemple minimal (App)
```tsx
import { WcsButton, WcsBadge } from "wcs-react";

function App() {
  return (
    <div className="sncf-holding">
      <h1>
        WCS Demo <WcsBadge>v7.x</WcsBadge>
      </h1>
      <WcsButton className="wcs-primary" shape="normal" size="m">Primary</WcsButton>
    </div>
  );
}
```

## Boutons (classes prêtes à l’emploi)
```html
<wcs-button class="wcs-primary" shape="normal" size="m">Primary</wcs-button>
<wcs-button class="wcs-secondary" shape="normal" size="m">Secondary</wcs-button>
<wcs-button class="wcs-success" shape="normal" size="m">Success</wcs-button>
<wcs-button class="wcs-warning" shape="normal" size="m">Warning</wcs-button>
<wcs-button class="wcs-critical" shape="normal" size="m">Critical</wcs-button>
<wcs-button class="wcs-info" shape="normal" size="m">Info</wcs-button>
<wcs-button class="wcs-dark" shape="normal" size="m">Dark</wcs-button>
<wcs-button class="wcs-light" shape="normal" size="m">Light</wcs-button>
```

## Breadcrumb (web component)
```html
<wcs-breadcrumb>
  <wcs-breadcrumb-item href="/">Bienvenue</wcs-breadcrumb-item>
  <wcs-breadcrumb-item>MQ Series</wcs-breadcrumb-item>
</wcs-breadcrumb>
```

## Notes
- Pas de hacks de visibilité : laisser WCS hydrater les composants.
- Tailles/modes peuvent rester par défaut (`mode` vide, `shape="normal"`, `size="m"`).
- Le thème Holding apporte les couleurs SNCF ; évitez de surcharger sauf besoin spécifique.
