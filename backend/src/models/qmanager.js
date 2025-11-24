"use strict";

module.exports = (sequelize, DataTypes) => {
  const QManager = sequelize.define(
    "QManager",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      nom: { type: DataTypes.STRING(100), allowNull: false },
      dns: { type: DataTypes.STRING(255), allowNull: true },
      port: { type: DataTypes.INTEGER, allowNull: true },
      hebergement: { type: DataTypes.STRING(50), allowNull: true },
      os: { type: DataTypes.STRING(50), allowNull: true },
      version_ibm_mq: { type: DataTypes.STRING(20), allowNull: true },
      loadbalancer: { type: DataTypes.STRING(100), allowNull: true },
      env_id: { type: DataTypes.BIGINT, allowNull: false }
    },
    {
      tableName: "qmanagers",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["nom", "env_id"]
        }
      ]
    }
  );
  return QManager;
};
