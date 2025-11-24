"use strict";

const { sequelize } = require("../config/db");

const Environnement = require("./environnement")(sequelize, require("sequelize").DataTypes);
const Application = require("./application")(sequelize, require("sequelize").DataTypes);
const QManager = require("./qmanager")(sequelize, require("sequelize").DataTypes);
const Flux = require("./flux")(sequelize, require("sequelize").DataTypes);
const ConsommateurFlux = require("./consommateur_flux")(sequelize, require("sequelize").DataTypes);
const Topic = require("./topic")(sequelize, require("sequelize").DataTypes);
const Abonnement = require("./abonnement")(sequelize, require("sequelize").DataTypes);
const File = require("./file")(sequelize, require("sequelize").DataTypes);
const UserMQ = require("./user_mq")(sequelize, require("sequelize").DataTypes);
const Canal = require("./canal")(sequelize, require("sequelize").DataTypes);
const Xmit = require("./xmit")(sequelize, require("sequelize").DataTypes);
const DemandeFlux = require("./demande_flux")(sequelize, require("sequelize").DataTypes);
const FluxLigne = require("./flux_ligne")(sequelize, require("sequelize").DataTypes);
const SnowChange = require("./snow_change")(sequelize, require("sequelize").DataTypes);

// Associations
QManager.belongsTo(Environnement, { foreignKey: "env_id", as: "environnement" });
Environnement.hasMany(QManager, { foreignKey: "env_id", as: "qmanagers" });

Flux.belongsTo(Application, { foreignKey: "producteur_app_id", as: "producteur" });
Application.hasMany(Flux, { foreignKey: "producteur_app_id", as: "flux_producteurs" });
Flux.belongsTo(Environnement, { foreignKey: "env_source_id", as: "env_source" });
Environnement.hasMany(Flux, { foreignKey: "env_source_id", as: "flux" });

ConsommateurFlux.belongsTo(Flux, { foreignKey: "flux_id", as: "flux" });
Flux.hasMany(ConsommateurFlux, { foreignKey: "flux_id", as: "consommateurs" });
ConsommateurFlux.belongsTo(Application, { foreignKey: "application_id", as: "application" });
Application.hasMany(ConsommateurFlux, { foreignKey: "application_id", as: "flux_consommes" });
ConsommateurFlux.belongsTo(Environnement, { foreignKey: "env_id", as: "environnement" });
Environnement.hasMany(ConsommateurFlux, { foreignKey: "env_id", as: "consommateurs" });

Topic.belongsTo(QManager, { foreignKey: "qmanager_id", as: "qmanager" });
QManager.hasMany(Topic, { foreignKey: "qmanager_id", as: "topics" });

File.belongsTo(QManager, { foreignKey: "qmanager_id", as: "qmanager" });
QManager.hasMany(File, { foreignKey: "qmanager_id", as: "files" });
File.belongsTo(QManager, { foreignKey: "remote_qmanager_id", as: "remote_qmanager" });
File.belongsTo(Topic, { foreignKey: "topic_id", as: "topic" });

Abonnement.belongsTo(Topic, { foreignKey: "topic_id", as: "topic" });
Topic.hasMany(Abonnement, { foreignKey: "topic_id", as: "abonnements" });
Abonnement.belongsTo(File, { foreignKey: "file_cible_id", as: "file_cible" });
File.hasMany(Abonnement, { foreignKey: "file_cible_id", as: "abonnements" });
Abonnement.belongsTo(ConsommateurFlux, { foreignKey: "consommateur_id", as: "consommateur" });
ConsommateurFlux.hasMany(Abonnement, { foreignKey: "consommateur_id", as: "abonnements" });

UserMQ.belongsTo(Application, { foreignKey: "application_id", as: "application" });
Application.hasMany(UserMQ, { foreignKey: "application_id", as: "users_mq" });
UserMQ.belongsTo(Environnement, { foreignKey: "env_id", as: "environnement" });
Environnement.hasMany(UserMQ, { foreignKey: "env_id", as: "users_mq" });

Canal.belongsTo(QManager, { foreignKey: "qmanager_id", as: "qmanager" });
QManager.hasMany(Canal, { foreignKey: "qmanager_id", as: "canaux" });
Canal.belongsTo(UserMQ, { foreignKey: "user_id", as: "user" });
UserMQ.hasMany(Canal, { foreignKey: "user_id", as: "canaux" });

Xmit.belongsTo(QManager, { foreignKey: "qmanager_source_id", as: "source_qmanager" });
Xmit.belongsTo(QManager, { foreignKey: "qmanager_dest_id", as: "dest_qmanager" });
Xmit.belongsTo(File, { foreignKey: "file_xmit_id", as: "file_xmit" });
Xmit.belongsTo(Canal, { foreignKey: "canal_xmit_id", as: "canal_xmit" });

DemandeFlux.belongsTo(Flux, { foreignKey: "flux_id", as: "flux" });
Flux.hasMany(DemandeFlux, { foreignKey: "flux_id", as: "demandes" });

FluxLigne.belongsTo(Flux, { foreignKey: "flux_id", as: "flux" });
Flux.hasMany(FluxLigne, { foreignKey: "flux_id", as: "lignes" });
FluxLigne.belongsTo(QManager, { foreignKey: "qmanager_id", as: "ligne_qmanager" });
FluxLigne.belongsTo(File, { foreignKey: "file_id", as: "ligne_file" });
FluxLigne.belongsTo(Canal, { foreignKey: "canal_id", as: "ligne_canal" });
FluxLigne.belongsTo(UserMQ, { foreignKey: "user_id", as: "ligne_user" });

SnowChange.belongsTo(DemandeFlux, { foreignKey: "demande_id", as: "demande" });
DemandeFlux.hasMany(SnowChange, { foreignKey: "demande_id", as: "snow_changes" });

module.exports = {
  sequelize,
  Environnement,
  Application,
  QManager,
  Flux,
  ConsommateurFlux,
  Topic,
  Abonnement,
  File,
  UserMQ,
  Canal,
  Xmit,
  DemandeFlux,
  FluxLigne,
  SnowChange
};
