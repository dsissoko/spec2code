"use strict";

module.exports = (sequelize, DataTypes) => {
  const Topic = sequelize.define(
    "Topic",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      nom: { type: DataTypes.STRING(80), allowNull: false },
      rubrique: { type: DataTypes.STRING(120), allowNull: true },
      alias: { type: DataTypes.STRING(120), allowNull: true }
    },
    {
      tableName: "topics",
      timestamps: true,
      indexes: [
        {
          unique: true,
          fields: ["nom", "qmanager_id"]
        }
      ]
    }
  );
  return Topic;
};
