"use strict";

module.exports = (sequelize, DataTypes) => {
  const FluxLigne = sequelize.define(
    "FluxLigne",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      numero_champ: { type: DataTypes.INTEGER, allowNull: false },
      label_champ: { type: DataTypes.STRING(150), allowNull: true },
      valeur_saisie: { type: DataTypes.TEXT, allowNull: true },
      valeur_calculee: { type: DataTypes.TEXT, allowNull: true },
      source_valeur: { type: DataTypes.STRING(10), allowNull: false } // AUTO / SAISIE / OPT
    },
    {
      tableName: "flux_lignes",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["flux_id", "numero_champ"]
        }
      ]
    }
  );
  return FluxLigne;
};
