"use strict";

module.exports = (sequelize, DataTypes) => {
  const Flux = sequelize.define(
    "Flux",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      type_flux: { type: DataTypes.STRING(30), allowNull: false },
      description: { type: DataTypes.TEXT, allowNull: true },
      frequence: { type: DataTypes.STRING(100), allowNull: true },
      critique: { type: DataTypes.BOOLEAN, allowNull: true },
      impact: { type: DataTypes.STRING(50), allowNull: true },
      reemission: { type: DataTypes.BOOLEAN, allowNull: true },
      exigence_securite: { type: DataTypes.BOOLEAN, allowNull: true },
      donnees_personnelles: { type: DataTypes.BOOLEAN, allowNull: true }
    },
    {
      tableName: "flux",
      timestamps: true
    }
  );
  return Flux;
};
