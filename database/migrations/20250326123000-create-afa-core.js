/* Migration initiale AFA : modèle minimal orienté génération du classeur MQ */
"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const { DataTypes } = Sequelize;

    await queryInterface.createTable("environnements", {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      code: { type: DataTypes.STRING(20), allowNull: false, unique: true },
      description: { type: DataTypes.STRING(100), allowNull: true },
      createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("now") },
      updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("now") }
    });

    await queryInterface.createTable("applications", {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      nom: { type: DataTypes.STRING(255), allowNull: false },
      trigramme: { type: DataTypes.STRING(10), allowNull: false },
      moa: { type: DataTypes.STRING(255), allowNull: true },
      moe: { type: DataTypes.STRING(255), allowNull: true },
      conducteur_moa: { type: DataTypes.STRING(255), allowNull: true },
      responsable_applicatif: { type: DataTypes.STRING(255), allowNull: true },
      ld_responsables: { type: DataTypes.STRING(500), allowNull: true },
      chaine_applicative: { type: DataTypes.STRING(255), allowNull: true },
      localisation: { type: DataTypes.STRING(50), allowNull: true },
      createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("now") },
      updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("now") }
    });
    await queryInterface.addConstraint("applications", {
      fields: ["trigramme"],
      type: "unique",
      name: "uniq_app_trigramme"
    });

    await queryInterface.createTable("qmanagers", {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      nom: { type: DataTypes.STRING(100), allowNull: false },
      dns: { type: DataTypes.STRING(255), allowNull: true },
      port: { type: DataTypes.INTEGER, allowNull: true },
      hebergement: { type: DataTypes.STRING(50), allowNull: true },
      os: { type: DataTypes.STRING(50), allowNull: true },
      version_ibm_mq: { type: DataTypes.STRING(20), allowNull: true },
      loadbalancer: { type: DataTypes.STRING(100), allowNull: true },
      env_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "environnements", key: "id" },
        onDelete: "CASCADE"
      },
      createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("now") },
      updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("now") }
    });
    await queryInterface.addConstraint("qmanagers", {
      fields: ["nom", "env_id"],
      type: "unique",
      name: "uniq_qmanager_nom_env"
    });

    await queryInterface.createTable("flux", {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      type_flux: { type: DataTypes.STRING(30), allowNull: false }, // SIMPLE_LOCAL / SIMPLE_DISTANT / TOPIC
      description: { type: DataTypes.TEXT, allowNull: true },
      frequence: { type: DataTypes.STRING(100), allowNull: true },
      critique: { type: DataTypes.BOOLEAN, allowNull: true },
      impact: { type: DataTypes.STRING(50), allowNull: true },
      reemission: { type: DataTypes.BOOLEAN, allowNull: true },
      exigence_securite: { type: DataTypes.BOOLEAN, allowNull: true },
      donnees_personnelles: { type: DataTypes.BOOLEAN, allowNull: true },
      producteur_app_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "applications", key: "id" },
        onDelete: "CASCADE"
      },
      env_source_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "environnements", key: "id" },
        onDelete: "CASCADE"
      },
      createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("now") },
      updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("now") }
    });

    await queryInterface.createTable("consommateur_flux", {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      flux_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "flux", key: "id" },
        onDelete: "CASCADE"
      },
      application_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "applications", key: "id" },
        onDelete: "CASCADE"
      },
      env_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "environnements", key: "id" },
        onDelete: "CASCADE"
      },
      localisation: { type: DataTypes.STRING(50), allowNull: true },
      ordre: { type: DataTypes.INTEGER, allowNull: true },
      createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("now") },
      updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("now") }
    });

    await queryInterface.createTable("topics", {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      nom: { type: DataTypes.STRING(80), allowNull: false },
      rubrique: { type: DataTypes.STRING(120), allowNull: true },
      alias: { type: DataTypes.STRING(120), allowNull: true },
      qmanager_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "qmanagers", key: "id" },
        onDelete: "CASCADE"
      },
      createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("now") },
      updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("now") }
    });
    await queryInterface.addConstraint("topics", {
      fields: ["nom", "qmanager_id"],
      type: "unique",
      name: "uniq_topic_nom_qm"
    });

    await queryInterface.createTable("files", {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      nom: { type: DataTypes.STRING(60), allowNull: false },
      type_file: { type: DataTypes.STRING(15), allowNull: false }, // F / FR / FT / T
      etat: { type: DataTypes.STRING(15), allowNull: false }, // A_CREER / A_MODIFIER / A_SUPPRIMER
      qmanager_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "qmanagers", key: "id" },
        onDelete: "CASCADE"
      },
      nb_max_msg: { type: DataTypes.INTEGER, allowNull: true },
      taille_max_mo: { type: DataTypes.INTEGER, allowNull: true },
      duree_retention_s: { type: DataTypes.INTEGER, allowNull: true },
      persistante: { type: DataTypes.BOOLEAN, allowNull: true },
      nom_alias: { type: DataTypes.STRING(70), allowNull: true },
      remote_qmanager_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: { model: "qmanagers", key: "id" },
        onDelete: "SET NULL"
      },
      topic_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: { model: "topics", key: "id" },
        onDelete: "SET NULL"
      },
      createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("now") },
      updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("now") }
    });
    await queryInterface.addConstraint("files", {
      fields: ["nom", "qmanager_id"],
      type: "unique",
      name: "uniq_file_nom_qm"
    });
    await queryInterface.addConstraint("files", {
      fields: ["nom_alias", "qmanager_id"],
      type: "unique",
      name: "uniq_file_alias_qm",
      where: { nom_alias: { [Sequelize.Op.ne]: null } }
    });

    await queryInterface.createTable("abonnements", {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      nom: { type: DataTypes.STRING(120), allowNull: false },
      etat: { type: DataTypes.STRING(15), allowNull: false },
      filtre: { type: DataTypes.TEXT, allowNull: true },
      topic_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "topics", key: "id" },
        onDelete: "CASCADE"
      },
      file_cible_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "files", key: "id" },
        onDelete: "CASCADE"
      },
      consommateur_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "consommateur_flux", key: "id" },
        onDelete: "CASCADE"
      },
      createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("now") },
      updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("now") }
    });
    await queryInterface.addConstraint("abonnements", {
      fields: ["nom", "topic_id"],
      type: "unique",
      name: "uniq_abonnement_nom_topic"
    });

    await queryInterface.createTable("user_mq", {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      login: { type: DataTypes.STRING(50), allowNull: false },
      droits: { type: DataTypes.STRING(15), allowNull: false }, // LECTURE / ECRITURE / LES_DEUX
      indice: { type: DataTypes.INTEGER, allowNull: true },
      application_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "applications", key: "id" },
        onDelete: "CASCADE"
      },
      env_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "environnements", key: "id" },
        onDelete: "CASCADE"
      },
      createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("now") },
      updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("now") }
    });
    await queryInterface.addConstraint("user_mq", {
      fields: ["login"],
      type: "unique",
      name: "uniq_user_mq_login"
    });

    await queryInterface.createTable("canaux", {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      nom: { type: DataTypes.STRING(80), allowNull: false },
      type_canal: { type: DataTypes.STRING(15), allowNull: false }, // PRODUCTEUR / CONSOMMATEUR / XMIT
      securise: { type: DataTypes.BOOLEAN, allowNull: true },
      cert_cn: { type: DataTypes.STRING(255), allowNull: true },
      etat: { type: DataTypes.STRING(15), allowNull: false },
      qmanager_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "qmanagers", key: "id" },
        onDelete: "CASCADE"
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "user_mq", key: "id" },
        onDelete: "CASCADE"
      },
      createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("now") },
      updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("now") }
    });
    await queryInterface.addConstraint("canaux", {
      fields: ["nom"],
      type: "unique",
      name: "uniq_canal_nom"
    });

    await queryInterface.createTable("xmit", {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      qmanager_source_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "qmanagers", key: "id" },
        onDelete: "CASCADE"
      },
      qmanager_dest_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "qmanagers", key: "id" },
        onDelete: "CASCADE"
      },
      file_xmit_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "files", key: "id" },
        onDelete: "CASCADE"
      },
      canal_xmit_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "canaux", key: "id" },
        onDelete: "CASCADE"
      },
      createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("now") },
      updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("now") }
    });

    await queryInterface.createTable("demande_flux", {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      statut: { type: DataTypes.STRING(20), allowNull: false, defaultValue: "BROUILLON" },
      formulaire_json: { type: DataTypes.JSONB, allowNull: true },
      flux_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: { model: "flux", key: "id" },
        onDelete: "SET NULL"
      },
      ticket_snow: { type: DataTypes.STRING(100), allowNull: true },
      cree_par: { type: DataTypes.STRING(100), allowNull: true },
      valide_par: { type: DataTypes.STRING(100), allowNull: true },
      date_soumission: { type: DataTypes.DATE, allowNull: true },
      date_validation: { type: DataTypes.DATE, allowNull: true },
      date_traitement: { type: DataTypes.DATE, allowNull: true },
      createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("now") },
      updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("now") }
    });

    await queryInterface.createTable("flux_lignes", {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      flux_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "flux", key: "id" },
        onDelete: "CASCADE"
      },
      numero_champ: { type: DataTypes.INTEGER, allowNull: false },
      label_champ: { type: DataTypes.STRING(150), allowNull: true },
      valeur_saisie: { type: DataTypes.TEXT, allowNull: true },
      valeur_calculee: { type: DataTypes.TEXT, allowNull: true },
      source_valeur: { type: DataTypes.STRING(10), allowNull: false }, // AUTO / SAISIE / OPT
      qmanager_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: { model: "qmanagers", key: "id" },
        onDelete: "SET NULL"
      },
      file_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: { model: "files", key: "id" },
        onDelete: "SET NULL"
      },
      canal_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: { model: "canaux", key: "id" },
        onDelete: "SET NULL"
      },
      user_id: {
        type: DataTypes.BIGINT,
        allowNull: true,
        references: { model: "user_mq", key: "id" },
        onDelete: "SET NULL"
      },
      createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("now") },
      updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("now") }
    });
    await queryInterface.addIndex("flux_lignes", ["flux_id", "numero_champ"], {
      unique: true,
      name: "uniq_flux_lignes_flux_num"
    });

    await queryInterface.createTable("snow_change", {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      demande_id: {
        type: DataTypes.BIGINT,
        allowNull: false,
        references: { model: "demande_flux", key: "id" },
        onDelete: "CASCADE"
      },
      snow_number: { type: DataTypes.STRING(100), allowNull: true },
      statut: { type: DataTypes.STRING(50), allowNull: true },
      sys_id: { type: DataTypes.STRING(100), allowNull: true },
      payload_json: { type: DataTypes.JSONB, allowNull: true },
      createdAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("now") },
      updatedAt: { type: DataTypes.DATE, allowNull: false, defaultValue: Sequelize.fn("now") }
    });
  },

  down: async (queryInterface) => {
    await queryInterface.dropTable("snow_change");
    await queryInterface.dropTable("flux_lignes");
    await queryInterface.dropTable("demande_flux");
    await queryInterface.dropTable("xmit");
    await queryInterface.dropTable("canaux");
    await queryInterface.dropTable("user_mq");
    await queryInterface.dropTable("abonnements");
    await queryInterface.dropTable("files");
    await queryInterface.dropTable("topics");
    await queryInterface.dropTable("consommateur_flux");
    await queryInterface.dropTable("flux");
    await queryInterface.dropTable("qmanagers");
    await queryInterface.dropTable("applications");
    await queryInterface.dropTable("environnements");
  }
};
