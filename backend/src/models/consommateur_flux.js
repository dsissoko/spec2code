"use strict";

module.exports = (sequelize, DataTypes) => {
  const ConsommateurFlux = sequelize.define(
    "ConsommateurFlux",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      localisation: { type: DataTypes.STRING(50), allowNull: true },
      ordre: { type: DataTypes.INTEGER, allowNull: true }
    },
    {
      tableName: "consommateur_flux",
      timestamps: true
    }
  );
  return ConsommateurFlux;
};
