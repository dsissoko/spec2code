# Frontend AFA (React + Vite + TS)

Application front qui consomme l’API AFA (health, futures endpoints) et s’appuie sur Vite pour le dev et le build.

## Démarrage rapide (dev)
```bash
cd frontend
npm install
cp .env.example .env   # adapter VITE_API_BASE_URL si besoin
npm run dev             # http://localhost:3000 par défaut
```

## Configuration
- **Variables d’environnement (fichier `frontend/.env`)** :
  ```bash
  VITE_API_BASE_URL=http://backend:3001/api   # service Docker par défaut en mode compose
  VITE_LOG_LEVEL=info        # trace | debug | info | warn | error
  ```
  - Les variables Vite doivent commencer par `VITE_` pour être exposées au client.
  - `.env` n’est pas committé. `.env.example` fournit le gabarit.
- **Hors prod** : garder `VITE_API_BASE_URL` sur le backend local (3001) et un `VITE_LOG_LEVEL` verbeux (info/debug).
- **Prod** : injecter les variables via l’environnement/CI/CD ou via un `.env` monté au build, avec l’URL du backend exposé publiquement et un niveau de log plus sobre (info/warn).
- **Version affichée** : le footer affiche automatiquement `AFA front vX.Y.Z` via la constante `__APP_VERSION__` injectée au build depuis le `package.json` (pas de saisie manuelle).

## Ops
- **Health côté front** : le front déclenche un ping au démarrage vers `${VITE_API_BASE_URL}/health` et logue le résultat dans la console navigateur. 
- **Logs front** : wrapper léger (`src/lib/logger.ts`) sur `console.*` avec niveaux (trace/debug/info/warn/error) contrôlés par `VITE_LOG_LEVEL`.
- **Build** :
  ```bash
  npm run build   # génère dist/
  npm run preview # sert le build sur http://localhost:4173
  ```
- **Serveur de dev** : `npm run dev` lance Vite (HMR) sur 3000. Les logs sont visibles dans la console navigateur et dans la console Vite.

### RunBooks (copier-coller)
- **Démarrer en dev**
  ```bash
  cd frontend
  npm install
  cp .env.example .env
  npm run dev
  ```
- **Changer l’URL du backend (ex: staging)**
  ```bash
  # dans frontend/.env
  VITE_API_BASE_URL=https://api-staging.example.com/api
  npm run dev
  ```
- **Vérifier le health backend depuis le front**
  ```bash
  # lancer le front puis regarder la console navigateur :
  # [INFO] Health backend OK en XXXms
  ```
- **Build + prévisualisation locale**
  ```bash
  cd frontend
  npm run build
  npm run preview
  ```

## Bonnes pratiques
- Ne pas committer le `.env` (seul `.env.example` reste versionné).
- Garder `VITE_API_BASE_URL` cohérent avec l’instance backend ciblée.
- Régler `VITE_LOG_LEVEL` sur `info` ou `warn` en prod pour limiter le bruit.
- Ajouter de futurs endpoints front → back en réutilisant l’URL base et en loguant les erreurs côté front.
