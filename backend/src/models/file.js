"use strict";

const { Op } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  const File = sequelize.define(
    "File",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      nom: { type: DataTypes.STRING(60), allowNull: false },
      type_file: { type: DataTypes.STRING(15), allowNull: false }, // F / FR / FT / T
      etat: { type: DataTypes.STRING(15), allowNull: false }, // A_CREER / A_MODIFIER / A_SUPPRIMER
      nb_max_msg: { type: DataTypes.INTEGER, allowNull: true },
      taille_max_mo: { type: DataTypes.INTEGER, allowNull: true },
      duree_retention_s: { type: DataTypes.INTEGER, allowNull: true },
      persistante: { type: DataTypes.BOOLEAN, allowNull: true },
      nom_alias: { type: DataTypes.STRING(70), allowNull: true }
    },
    {
      tableName: "files",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["nom", "qmanager_id"]
        },
        {
          unique: true,
          fields: ["nom_alias", "qmanager_id"],
          where: { nom_alias: { [Op.ne]: null } }
        }
      ]
    }
  );
  return File;
};
