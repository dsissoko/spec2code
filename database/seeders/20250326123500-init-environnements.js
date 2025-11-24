"use strict";

module.exports = {
  async up(queryInterface) {
    const now = new Date();
    const rows = [
      { code: "DEV", description: "Développement", createdAt: now, updatedAt: now },
      { code: "INT", description: "Intégration", createdAt: now, updatedAt: now },
      { code: "QUAL", description: "Qualification", createdAt: now, updatedAt: now },
      { code: "REC", description: "Recette", createdAt: now, updatedAt: now },
      { code: "PREPROD", description: "Pré-production", createdAt: now, updatedAt: now },
      { code: "PROD", description: "Production", createdAt: now, updatedAt: now }
    ];
    await queryInterface.bulkInsert("environnements", rows, {});
  },

  async down(queryInterface) {
    await queryInterface.bulkDelete("environnements", null, {});
  }
};
