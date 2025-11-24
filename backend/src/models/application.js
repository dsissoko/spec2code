"use strict";

module.exports = (sequelize, DataTypes) => {
  const Application = sequelize.define(
    "Application",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      nom: { type: DataTypes.STRING(255), allowNull: false },
      trigramme: { type: DataTypes.STRING(10), allowNull: false, unique: true },
      moa: { type: DataTypes.STRING(255), allowNull: true },
      moe: { type: DataTypes.STRING(255), allowNull: true },
      conducteur_moa: { type: DataTypes.STRING(255), allowNull: true },
      responsable_applicatif: { type: DataTypes.STRING(255), allowNull: true },
      ld_responsables: { type: DataTypes.STRING(500), allowNull: true },
      chaine_applicative: { type: DataTypes.STRING(255), allowNull: true },
      localisation: { type: DataTypes.STRING(50), allowNull: true }
    },
    {
      tableName: "applications",
      timestamps: true
    }
  );
  return Application;
};
