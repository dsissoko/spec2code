"use strict";

module.exports = (sequelize, DataTypes) => {
  const DemandeFlux = sequelize.define(
    "DemandeFlux",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      statut: { type: DataTypes.STRING(20), allowNull: false, defaultValue: "BROUILLON" },
      formulaire_json: { type: DataTypes.JSONB, allowNull: true },
      ticket_snow: { type: DataTypes.STRING(100), allowNull: true },
      cree_par: { type: DataTypes.STRING(100), allowNull: true },
      valide_par: { type: DataTypes.STRING(100), allowNull: true },
      date_soumission: { type: DataTypes.DATE, allowNull: true },
      date_validation: { type: DataTypes.DATE, allowNull: true },
      date_traitement: { type: DataTypes.DATE, allowNull: true }
    },
    {
      tableName: "demande_flux",
      timestamps: true
    }
  );
  return DemandeFlux;
};
