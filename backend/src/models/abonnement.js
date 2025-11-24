"use strict";

module.exports = (sequelize, DataTypes) => {
  const Abonnement = sequelize.define(
    "Abonnement",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      nom: { type: DataTypes.STRING(120), allowNull: false },
      etat: { type: DataTypes.STRING(15), allowNull: false },
      filtre: { type: DataTypes.TEXT, allowNull: true }
    },
    {
      tableName: "abonnements",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["nom", "topic_id"]
        }
      ]
    }
  );
  return Abonnement;
};
