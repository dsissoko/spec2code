# Quickstart - 002-mq-demande

1. Branches / contexte
   - Branch actuelle : `002-mq-demande` (format attendu par Speckit).
   - Spécifications disponibles : `/specs/002-mq-demande/spec.md` et `/specs/002-mq-demande/screen-mq-demande.md`.

2. Pré-requis locaux
   - Frontend : Node.js LTS, dépendances déjà installées sous `frontend/` (Vite, React, wcs-react).
   - WCS : imports déjà dans `frontend/src/styles/global.css` (wcs-core + thème Holding).

3. Lancer le front (dev)  
   - `cd frontend && npm run dev -- --port 3000`

4. Cible du travail
   - Ajouter une page `/mq/demande` sous `frontend/src/pages/` en réutilisant HeaderAfa/FooterContact et le style existant (code simple/épuré et cohérent).
   - Afficher un bloc WCS (ex. wcs-card) avec le texte « Ici le formulaire de saisie de la demande de flux » pour éviter tout blocage.
   - Prévoir mais ne pas bloquer l’état LOADING/ERROR pour un futur appel d’init.

5. Manques connus (pour incréments ultérieurs)
   - Endpoint d’init (route/payload) : à définir.
   - Liste des champs et validations du formulaire : à définir.
   - Attentes de tests front (unitaires/e2e) : à définir si logique ajoutée.***
