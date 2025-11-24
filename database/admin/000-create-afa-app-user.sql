-- ===========================================================
--  Création de l'utilisateur applicatif AFA
--  ⚠️ À exécuter connecté en superuser (postgres)
--  ⚠️ Modifier le mot de passe après exécution
-- ===========================================================

-- 1. Création du user applicatif (mdp générique à changer)
CREATE USER afa_app WITH PASSWORD 'CHANGE_ME';

-- 2. Autoriser afa_app à se connecter à la base AFA_DB
GRANT CONNECT ON DATABASE "AFA_DB" TO afa_app;

-- ===========================================================
-- 3. Bascule automatique impossible : à faire manuellement
--     Dans psql, exécuter:
--         \c "AFA_DB"
-- ===========================================================

-- 4. Droits dans AFA_DB sur le schéma public
GRANT USAGE, CREATE ON SCHEMA public TO afa_app;

-- 5. Droits sur les tables *existantes*
GRANT SELECT, INSERT, UPDATE, DELETE ON ALL TABLES IN SCHEMA public TO afa_app;

-- 6. Droits par défaut sur les futures tables
ALTER DEFAULT PRIVILEGES IN SCHEMA public
GRANT SELECT, INSERT, UPDATE, DELETE ON TABLES TO afa_app;

-- ===========================================================
-- 7. Après execution :
--     ALTER USER afa_app WITH PASSWORD 'vrai_mot_de_passe';
-- ===========================================================
