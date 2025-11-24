"use strict";

module.exports = (sequelize, DataTypes) => {
  const UserMQ = sequelize.define(
    "UserMQ",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      login: { type: DataTypes.STRING(50), allowNull: false, unique: true },
      droits: { type: DataTypes.STRING(15), allowNull: false }, // LECTURE / ECRITURE / LES_DEUX
      indice: { type: DataTypes.INTEGER, allowNull: true }
    },
    {
      tableName: "user_mq",
      timestamps: true
    }
  );
  return UserMQ;
};
