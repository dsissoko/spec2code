"use strict";

module.exports = (sequelize, DataTypes) => {
  const Canal = sequelize.define(
    "Canal",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      nom: { type: DataTypes.STRING(80), allowNull: false, unique: true },
      type_canal: { type: DataTypes.STRING(15), allowNull: false }, // PRODUCTEUR / CONSOMMATEUR / XMIT
      securise: { type: DataTypes.BOOLEAN, allowNull: true },
      cert_cn: { type: DataTypes.STRING(255), allowNull: true },
      etat: { type: DataTypes.STRING(15), allowNull: false }
    },
    {
      tableName: "canaux",
      timestamps: true
    }
  );
  return Canal;
};
