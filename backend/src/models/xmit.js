"use strict";

module.exports = (sequelize, DataTypes) => {
  const Xmit = sequelize.define(
    "Xmit",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true }
    },
    {
      tableName: "xmit",
      timestamps: true
    }
  );
  return Xmit;
};
