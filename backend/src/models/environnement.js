"use strict";

module.exports = (sequelize, DataTypes) => {
  const Environnement = sequelize.define(
    "Environnement",
    {
      id: { type: DataTypes.BIGINT, primaryKey: true, autoIncrement: true },
      code: { type: DataTypes.STRING(20), allowNull: false, unique: true },
      description: { type: DataTypes.STRING(100), allowNull: true }
    },
    {
      tableName: "environnements",
      timestamps: true
    }
  );
  return Environnement;
};
