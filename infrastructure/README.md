# AFA Infrastructure

Ce répertoire regroupe la **documentation et la configuration d’infrastructure** pour déployer l’application AFA dans différents environnements cloud.  
L’objectif est de fournir une vue synthétique des **trois scénarios de déploiement** possibles, sans entrer dans les détails d’implémentation.

Les trois options prises en charge :

- 🟦 **Azure CaaS** (déploiement Docker / containers sur Azure)
- 🟧 **AWS Elastic Beanstalk** (déploiement applicatif managé)
- 🟩 **Kubernetes Nuagik** (déploiement conteneurisé orchestré)

---

## 🔥 1. Structure du répertoire

```
infrastructure/
  azure_caas/
  aws-eb/
  nuagik/
  README.md
```

### ✔️ `azure_caas/`
Scripts et instructions pour déployer l’application dans un contexte **containers-as-a-service sur Azure** (VM + Docker, App Service, ou équivalent containerisé).

### ✔️ `aws-eb/`
Fichiers de configuration pour déployer le backend (et éventuellement le frontend) dans un environnement **AWS Elastic Beanstalk** basé sur Docker.

### ✔️ `nuagik/`
Manifests ou chart Helm simplifié pour déployer les services AFA dans un cluster Kubernetes fourni par **Nuagik**.

---

## 🚀 2. Scénario 1 — Déploiement Azure CaaS (Docker / VM)

### Résumé
Déploiement via :
- VM ou service container Azure
- Docker
- Un fichier `docker-compose.yml` présent à la **racine** du projet (optionnel selon le mode de déploiement)

### Fichiers **hors** `infrastructure/` nécessaires :
- **`Dockerfile` (backend)** → situé dans `backend/`
- **`Dockerfile` (frontend)** → dans `frontend/` s’il existe
- **`docker-compose.yml`** → généralement **à la racine du projet** si utilisé
- Fichiers `.env` pour la configuration (non versionnés)

### Avantages :
- Déploiement simple et rapide
- Adapté aux environnements de développement ou de préproduction

### Limites :
- Scalabilité et haute dispo gérées manuellement
- Moins d’orchestration native que Kubernetes

---

## 🚀 3. Scénario 2 — Déploiement AWS Elastic Beanstalk

### Résumé
Elastic Beanstalk gère :
- l’environnement d’exécution (Docker)
- le scaling automatique
- le load balancing
- le déploiement des versions applicatives

### Fichiers **hors** `infrastructure/` nécessaires :
- **`Dockerfile` du backend** (et éventuellement du frontend) dans leurs répertoires respectifs
- **Images Docker** poussées sur un registre (ECR ou autre)
- Potentiellement un fichier `Dockerrun.aws.json` à la **racine** si mode single/multi-container Elastic Beanstalk

### Avantages :
- Déploiement managé
- Auto-scaling natif
- Intégration simple avec RDS Postgres

### Limites :
- Couplage fort à AWS
- Moins flexible que Kubernetes sur la topologie globale

---

## 🚀 4. Scénario 3 — Déploiement Kubernetes (Nuagik)

### Résumé
Déploiement avancé utilisant :
- un cluster Kubernetes Nuagik
- des manifests YAML ou un chart Helm dans `infrastructure/nuagik/`
- un Ingress (Traefik, Nginx, ou autre)
- des secrets pour la connexion à PostgreSQL et autres services

### Fichiers **hors** `infrastructure/` nécessaires :
- **Images Docker** du backend et du frontend poussées sur un registre (Docker Hub, ECR, ACR, etc.)
- **Dockerfile backend / frontend** dans leurs répertoires (`backend/`, `frontend/`)

### Avantages :
- Scalabilité horizontale
- Rolling updates, blue/green, canary
- Adapté aux environnements de production structurés

### Limites :
- Complexité opérationnelle plus élevée
- Nécessite une chaîne CI/CD bien définie

---

## 🗂️ 5. Où se trouvent les fichiers Docker & Compose ?

| Type de fichier           | Répertoire prévu        | Utilisé par quel scénario ?          |
|---------------------------|-------------------------|--------------------------------------|
| `Dockerfile` backend      | `backend/`              | Azure CaaS, AWS EB, Nuagik (k8s)     |
| `Dockerfile` frontend     | `frontend/` (si présent)| Azure CaaS, AWS EB, Nuagik (k8s)     |
| `docker-compose.yml`      | **Racine du projet**    | Azure CaaS (VM / compose)            |
| Manifests / chart k8s     | `infrastructure/nuagik/`| Nuagik (Kubernetes)                  |
| Config Elastic Beanstalk  | `infrastructure/aws-eb/`| AWS Elastic Beanstalk                |
| Scripts / notes Azure CaaS| `infrastructure/azure_caas/` | Azure CaaS                      |

---

## 🧭 6. Recommandation générale

- **Azure CaaS** : idéal pour démarrer vite en mode “VM + Docker / App Service”, environnements de dev/recette.  
- **AWS Elastic Beanstalk** : bon compromis pour un déploiement managé sans devoir gérer Kubernetes.  
- **Nuagik (Kubernetes)** : cible long terme pour une prod scalable, supervisée et automatisée.

---

## 📄 7. Licence

Projet interne AFA — usage restreint.
