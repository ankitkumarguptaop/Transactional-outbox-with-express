"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("inbox-messages", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      message_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "outbox-messages",
          key: "id",
        },
      },
      type: {
        allowNull: false,
        type: DataTypes.ENUM("NOTIFICATION", "EMAIL"),
      },
      is_seen: {
        allowNull: false,
        type: DataTypes.ENUM("YES", "NO"),
        defaultValue:'NO'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("inbox-messages");
  },
};
