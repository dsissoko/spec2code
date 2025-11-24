"use strict";

module.exports = (sequelize, DataTypes) => {
  const SnowChange = sequelize.define(
    "SnowChange",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      snow_number: { type: DataTypes.STRING(100), allowNull: true },
      statut: { type: DataTypes.STRING(50), allowNull: true },
      sys_id: { type: DataTypes.STRING(100), allowNull: true },
      payload_json: { type: DataTypes.JSONB, allowNull: true }
    },
    {
      tableName: "snow_change",
      timestamps: true
    }
  );
  return SnowChange;
};
