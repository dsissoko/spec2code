# MQ BRIEF

## 1. Synthèse

### 1. Finalité
Assurer une communication applicative asynchrone, fiable et découplée, permettant aux systèmes d’échanger des messages sans dépendance temporelle.

### 2. Deux modes opérationnels
Deux modèles d’échange sont disponibles, au choix du producteur : **point‑à‑point** ou **publication / souscription**. Ce sont les seuls modes existants, chacun répondant à un besoin fonctionnel distinct.

### 3. Mode point‑à‑point
Le producteur dépose un message dans une **queue**, et le consommateur vient le récupérer lorsqu’il est disponible.

**Intérêt fonctionnel :**  
Garantir la remise d’un message à un destinataire unique, avec consommation exclusive. Idéal pour les commandes unitaires et les échanges transactionnels.

Schéma :  
```
Producteur → [ QUEUE ] → Consommateur
```

### 4. Mode publication / souscription
Le producteur publie un message dans un **topic**. Des abonnements définissent quelles **queues** recevront une copie de ce message.

**Intérêt fonctionnel :**  
Permettre la diffusion contrôlée d’un même événement vers plusieurs consommateurs, chacun recevant sa propre copie et traitant à son rythme. Les queues de chaque abonnement peuvent faire l'objet de filtre spécifiques permettant à l'application consommatrice de sélectionner, voir de transformer les messages qui l'intéressent.

Schéma :  
```
Producteur → TOPIC → (abonnements) → [ QUEUES ] → Consommateurs
```

### Conclusion synthétique
Le producteur envoie dans une **queue** (point à point) ou dans un **topic** (pub/sub).  
Le consommateur lit toujours dans une **queue**.  
Le broker MQ a la responsabilité de distribuer les messages publiés dans un topic vers les queues concernées via des abonnements.

---

## 2. Résumé de la gouvernance et du dossier de flux

Dans l’entreprise, la mise en œuvre d’un flux MQ ne se limite pas aux objets techniques (queues, topics, abonnements).  
La **ligne de service MQ-Series** fournit un dispositif industrialisé permettant aux projets de déclarer leurs besoins de manière fiable et homogène.

Ce dispositif repose sur un **dossier de flux**, un document structuré (aujourd’hui sous forme Excel) qui décrit :  
- l’application productrice et l’application consommatrice,  
- le mode d’échange retenu (point-à-point ou pub/sub),  
- les éléments nécessaires à la construction des objets MQ (F_, FT_, T_, A_, FR_),  
- les environnements cibles (DEV, INT, REC, PROD),  
- les trigrammes applicatifs,  
- ainsi que d’autres paramètres techniques utiles à l’usine MQ.

Un dossier complet constitue donc une **spécification fonctionnelle et technique** permettant d’alimenter automatiquement les processus de création des objets MQ.

### Conclusion
La logique sous-jacente est parfaitement automatisable : sur la base d’un formulaire web bien conçu, il est possible de générer automatiquement un dossier de flux conforme, garantissant à la fois qualité, cohérence et réduction des erreurs de saisie.

## 3. Nomenclature MQ-Series : Objets, Environnements et Trigrammes

Ce chapitre complète les principes fonctionnels du premier chapitre en introduisant la **nomenclature normalisée** utilisée pour spécifier précisément un flux MQ-Series.  
Il reprend les deux modes MQ (point-à-point et publication/souscription), puis détaille les objets MQ à créer selon la nomenclature officielle : **queues**, **topics**, **abonnements**, **alias**, **backout**, ainsi que l’usage des **environnements** et des **trigrammes applicatifs**.

---

### 1. Principes généraux de nomenclature

La nomenclature MQ suit une règle simple :  
**tout objet MQ porte dans son nom l’environnement, le trigramme applicatif et la fonction de l’objet.**

**Environnements**  
Chaque environnement est codé de manière courte et normalisée :  
- **D** : Développement  
- **I** : Intégration / Qualification  
- **R** : Recette  
- **H** : Pré-production  
- **P** : Production  

**Trigrammes applicatifs**  
Chaque application est identifiée par un trigramme unique provenant de la CMDB.  
Un flux MQ met généralement en scène :  
- un **trigramme source**,  
- un **trigramme cible**.

**Préfixes MQ-Series**

| Préfixe | Objet MQ | Rôle |
|--------|----------|------|
| **F_**  | Queue point-à-point | Échange direct 1→1 |
| **T_**  | Topic | Publication des événements |
| **A_**  | Abonnement | Lie un topic à une queue |
| **FT_** | Queue abonnée | Queue alimentée par le topic |
| **FR_** | Queue remote | Lien inter-QManager |
| **FM_** | MagicCopy (legacy) | Ancien mode de duplication |

---

### 2. Mode point-à-point : Nomenclature et exemple

Dans ce mode, un flux unique circule entre une application productrice et une application consommatrice via **une seule queue**.

**Objets MQ concernés**  
- **F_<SRC>_VERS_<DEST>**  
- (optionnel) **Alias**, **Backout Queue**, **Dead Letter Queue**

**Exemple concret (nom aléatoire issu du classeur)**

```text
F_APPDEM_VERS_APPCOM_R1
```

Décomposition :  
- **F_** : Queue point-à-point  
- **APPDEM** : trigramme applicatif source  
- **APPCOM** : trigramme applicatif cible  
- **R1** : environnement Recette n°1  

**Interprétation fonctionnelle**  
Ce nom indique clairement une queue point-à-point en **REC1**, permettant un flux de **APPDEM → APPCOM**.  
Cette queue transporte un message destiné à un **unique consommateur**.

---

### 3. Mode publication / souscription : Nomenclature et cas d’usage

Dans ce mode, une application publie dans un **topic**, et plusieurs consommateurs peuvent recevoir chacun leur copie via des **queues abonnées**.

**Objets MQ concernés (pub/sub)**

| Objet | Nomenclature | Fonction |
|-------|--------------|----------|
| Topic | **T_<SRC>** | Sujet de publication du producteur |
| Abonnement | **A_<SRC>_VERS_<DEST>** | Lien topic → queue |
| File abonnée | **FT_<SRC>_VERS_<DEST>** | Queue alimentée par le topic |

---

#### 1. Exemple : Un producteur → un consommateur

```text
T_APPDEM_R1
A_APPDEM_VERS_APPBAT_R1
FT_APPDEM_VERS_APPBAT_R1
```

**Interprétation** :  
- **APPDEM** publie dans **T_APPDEM_R1**  
- L’abonnement **A_APPDEM_VERS_APPBAT_R1** relie ce topic à une queue  
- La queue **FT_APPDEM_VERS_APPBAT_R1** reçoit les messages pour **APPBAT**

**Fonctionnellement**  
Ce flux diffuse un événement unique vers un consommateur unique, mais avec les avantages structurants du pub/sub.

---

#### 2. Exemple : Un producteur → plusieurs consommateurs

```text
T_APPDEM_R1
A_APPDEM_VERS_APPCOM_R1
FT_APPDEM_VERS_APPCOM_R1

A_APPDEM_VERS_APPBAT_R1
FT_APPDEM_VERS_APPBAT_R1
```

**Interprétation** :  
- Un seul topic, plusieurs abonnements  
- Chaque consommateur possède sa propre queue **FT_**  
- Chacun traite les messages de manière indépendante

**Fonctionnellement**  
Ce flux implémente un véritable "événement métier" diffusé à plusieurs services, chacun recevant et traitant sa copie.

---

### 4. Exemple inter-QManager : Nomenclature Remote

Dans certains cas, le flux traverse deux QManagers différents.  
On utilise alors les objets **FR_** :

```text
FR_APPDEM_VERS_APPCOM_P1
```

**FR_** indique qu'il s'agit d'une **queue remote**, utilisée pour router les messages entre QManagers.

---

### 5. Synthèse finale : Lecture immédiate d'un flux MQ

Grâce à cette nomenclature :

- On identifie le mode (direct ou pub/sub)  
- On lit la source, la cible, l’environnement  
- On connaît le rôle exact de chaque objet MQ  
- On peut reconstituer un flux complet en quelques secondes

Cette couche de nommage constitue la base d'une gouvernance industrialisée, permettant la description précise d'un flux MQ indépendamment de l'outil utilisé (Excel ou future application Web).

## 4. Modèle de données

**Un flux MQ-Series décrit la configuration d’un échange asynchrone entre une application productrice et une ou plusieurs applications consommatrices, dans un environnement MQ donné.**

Deux modes existent :

- Mode **(point-à-point)**: Le flux référence: 
  - l’application productrice,  
  - la queue dans laquelle elle écrit,  
  - l’application consommatrice qui lit cette queue.

- Mode publication / souscription **(pub/sub)**: Le flux référence:  
  - l’application productrice qui publie dans un topic,  
  - un ou plusieurs abonnements, chacun décrivant le couple *(topic → queue)*,  
  - les applications cibles associées aux queues alimentées par ces abonnements.

![Diagramme de classe AFA](AFA-diag-classes.drawio.png)

---

### 1. Application

**Rôle :** représente un système applicatif impliqué dans un flux (producteur, consommateur ou les deux).

**Principes :**
- Une application peut produire des messages.
- Une application peut consommer des messages.
- Une application peut participer à plusieurs flux.

---

### 2. Environnement

**Rôle :** identifie le contexte d’exécution dans lequel le flux est déployé.

**Exemples :** D (Dév), I (Intégration), R (Recette), H (Pré-production), P (Production)

**Principes :**
- Un environnement contient plusieurs objets MQ (queues, topics, abonnements).
- Un flux est généralement instancié dans plusieurs environnements.

---

### 3. Queue (File)

**Rôle :** représente l’objet MQ qui stocke les messages consommés par une application.

**Note importante :**  
Le terme MQ officiel est **queue**.  
Dans l’entreprise, l’usage courant est de parler de **file**, mais le terme « queue » reste conceptuellement plus juste pour MQ-Series.

**Principes :**
- Un producteur peut envoyer un message directement dans une queue (mode point-à-point).
- Un consommateur lit toujours depuis une queue.
- Une queue peut être :
  - la cible d’un flux point-à-point,
  - la cible d’un abonnement (mode pub/sub),
  - ou une queue remote (inter-QManager).
- Une queue peut être exposée à l’application via un alias, qui sert de nom d’accès sans modifier la queue réelle.
- Une queue peut être associée à une backout queue pour isoler les messages en erreur après plusieurs tentatives de lecture.
- La LS est constituée de plusieurs Queue Manager (haute dispo). Dans certains cas, le producteur doit cibler une queue qui n'est pas sur un Q Manager directement accessible. Une file distante peut être utilisée en tant que lien d’acheminement au sein de MQ-Series.

---

### 4. Topic

**Rôle :** représente un sujet logique dans lequel un producteur publie des messages.

**Principes :**
- Un producteur publie dans un topic.
- Un topic ne stocke pas les messages : il diffuse.
- Plusieurs abonnements peuvent être associés à un même topic.

---

### 5. Abonnement

**Rôle :** définit le lien entre un topic et une queue.

**Phrase clé :**  
« Cet abonnement indique que cette queue doit recevoir les messages publiés sur ce topic. »

**Principes :**
- Un abonnement relie exactement un topic à une queue.
- Une application consommatrice est rattachée à l’abonnement via la queue.
- Un topic peut avoir plusieurs abonnements.

---

### 6. Flux

**Rôle :** représente un canal d'échange de message entre une application productrice et une ou plusieurs applications cibles.

**Deux modes possibles :**
- **Point-à-point :** un producteur envoie dans une queue lue par un consommateur.
- **Publication/souscription :** un producteur publie dans un topic, plusieurs abonnements alimentent plusieurs queues, chacune lue par un consommateur distinct.

**Principes :**
- Un flux relie une application productrice aux objets MQ nécessaires (queue ou topic + abonnements).
- Un flux existe dans un environnement donné.
- En pub/sub, le flux agrège plusieurs abonnements.

---



