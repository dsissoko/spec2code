# Modèle de données — AFA (incrément 003)

## Vue d’ensemble
Référentiel pour générer le classeur MQ et piloter les demandes : environnements, applications, QManagers, flux (producteur + consommateurs), objets MQ (files/alias, topics/abos, users/canaux, XMIT), demandes et suivi ServiceNow.

## Entités et attributs clés

### environnements
- `id` (pk), `code` (unique, DEV/INT/QUAL/REC/PREPROD/PROD), `description`.

### applications
- `id` (pk), `nom`, `trigramme` (unique), `moa`, `moe`, `conducteur_moa`, `responsable_applicatif`, `ld_responsables`, `chaine_applicative`, `localisation` (DC LYON/PA3/PA4/DC LILLE/EXTERNE/CLOUD AZURE/CLOUD AWS).

### qmanagers
- `id` (pk), `nom` (unique par env), `dns`, `port`, `hebergement`, `os`, `version_ibm_mq`, `loadbalancer`, `env_id` (fk environnements).

### flux
- `id` (pk), `type_flux` (SIMPLE_LOCAL/SIMPLE_DISTANT/TOPIC), `description`, `frequence`, `critique` (bool), `impact` (Sans impact/Mode dégradé/Arrêt), `reemission` (bool), `exigence_securite` (bool), `donnees_personnelles` (bool), `producteur_app_id` (fk applications), `env_source_id` (fk environnements).

### consommateur_flux
- `id` (pk), `flux_id` (fk flux), `application_id` (fk applications), `env_id` (fk environnements), `localisation`, `ordre`.

### topics
- `id` (pk), `nom` (unique par qmanager), `rubrique`, `alias` (.QA), `qmanager_id` (fk).

### files (F/FR/FT/T)
- `id` (pk), `nom` (unique par qmanager), `type_file` (F/FR/FT/T), `etat` (A_CREER/A_MODIFIER/A_SUPPRIMER), `qmanager_id` (fk), `nb_max_msg`, `taille_max_mo` (<=50), `duree_retention_s` (<=3600, nullable), `persistante` (bool), `nom_alias` (.QA, unique par qmanager), `remote_qmanager_id` (fk, FR), `topic_id` (fk, FT/T si alias topic).

### abonnements
- `id` (pk), `nom` (unique par topic), `etat` (A_CREER/A_MODIFIER/A_SUPPRIMER), `filtre` (nullable), `topic_id` (fk), `file_cible_id` (fk files FT/F), `consommateur_id` (fk consommateur_flux).

### user_mq
- `id` (pk), `login` (unique, lowercase `mq<trigramme><env><indice>`), `droits` (LECTURE/ECRITURE/LES_DEUX), `indice` (1..9), `application_id` (fk), `env_id` (fk).

### canaux
- `id` (pk), `nom` (unique, uppercase `LSN|LSS_<TRIGRAMME>_<ENV><indice>`), `type_canal` (PRODUCTEUR/CONSOMMATEUR/XMIT), `securise` (bool), `cert_cn` (nullable), `etat` (A_CREER/A_MODIFIER/A_SUPPRIMER), `qmanager_id` (fk), `user_id` (fk user_mq).

### xmit
- `id` (pk), `qmanager_source_id` (fk), `qmanager_dest_id` (fk), `file_xmit_id` (fk files type XMIT), `canal_xmit_id` (fk canaux type XMIT).

### demande_flux
- `id` (pk), `statut` (BROUILLON/SOUMIS/VALIDE/REJETE/DEPLOYE), `formulaire_json`, `flux_id` (fk nullable), `ticket_snow`, `cree_par`, `valide_par`, `date_soumission`, `date_validation`, `date_traitement`.

### flux_lignes
- `id` (pk), `flux_id` (fk), `numero_champ` (1..22), `label_champ`, `valeur_saisie`, `valeur_calculee`, `source_valeur` (AUTO/SAISIE/OPT), liens optionnels `qmanager_id`/`file_id`/`canal_id`/`user_id`. Unique (flux_id, numero_champ).

### snow_change
- `id` (pk), `demande_id` (fk demande_flux), `snow_number`, `statut`, `sys_id`, `payload_json`.

## Relations et cardinalités (principales)
- environnements 1–n qmanagers ; environnements 1–n flux (via env_source) ; environnements 1–n consommateur_flux.
- applications 1–n flux (producteur) ; applications 1–n consommateur_flux ; applications 1–n user_mq.
- flux 1–n consommateur_flux ; flux 1–n files (F/FR/FT/T) implicitement via usage ; flux 1–n flux_lignes ; flux 0..1 demande_flux.
- qmanagers 1–n files ; qmanagers 1–n topics ; qmanagers 1–n canaux ; qmanagers 1–n xmit (source/dest).
- topics 1–n abonnements ; abonnements n–1 file_cible ; abonnements n–1 consommateur_flux.
- files peuvent référencer remote_qmanager (FR) ou topic (FT/T alias).
- user_mq 1–n canaux ; canaux 1–n xmit (canal_xmit).
- demande_flux 1–n flux_lignes ; demande_flux 1–1..n snow_change (une entrée par ticket associé).

## Règles de validation métier
- Nommage :
  - Files : préfixes F_/FR_/FT_/T_, alias suffixe `.QA` ; unicité par QMgr.
  - Users MQ : lowercase `mq<trigramme><env><indice>` (indice 1..9).
  - Canaux : uppercase `LSN|LSS_<TRIGRAMME>_<ENV><indice>` (indice 1..9).
- Unicités : noms de file + qmanager uniques ; alias + qmanager uniques ; nom de topic + qmanager unique ; login user MQ unique ; nom de canal unique.
- Bornes : taille msg <= 50 Mo ; TTL <= 3600 s ; indices user/canal <= 9.
- États : A_CREER/A_MODIFIER/A_SUPPRIMER pour files/canaux/abos ; statuts de demande (BROUILLON→SOUMIS→VALIDE/REJETE→DEPLOYE).
- CORS/API : port 3001 (override par `PORT`), CORS autorisé pour front 3000, `DATABASE_URL` requis avant toute opération DB.

## Hypothèses
- Volumétrie interne (pas de SLA spécifiques) ; performance sub-seconde attendue par défaut.
- Pas d’auto-migration au démarrage : migrations/seeders exécutés manuellement.
- Les champs non renseignés dans le formulaire (optionnels) restent NULL en base.
