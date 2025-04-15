"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      "products",
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        name: {
          allowNull: false,
          type: Sequelize.STRING,
          validate: {
            len: {
              args: [3, 30],
              msg: "name length should lie between 3 to 30",
            },
          },
        },
        price: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        rating: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        description: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        brand: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        stock: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        user_id: {
          allowNull: false,
          type: Sequelize.INTEGER,
          references: {
            model: "Users",
            key: "id",
          },
        },
        category: {
          allowNull: false,
          type: Sequelize.ENUM("books", "electronics", "clothing"),
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        deletedAt: {
          type: Sequelize.DATE,
        },
      },
      {
        paranoid: true,
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("products");
  },
};
