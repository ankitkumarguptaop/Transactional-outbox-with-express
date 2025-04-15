"use strict";

import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
  CreationOptional,
  ForeignKey,
} from "sequelize";

import { product } from "./product";

export class image extends Model<
  InferAttributes<image>,
  InferCreationAttributes<image>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare url: string;
  declare product_id: ForeignKey<product["id"]>;
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;

  static associate(models: any) {
    image.belongsTo(models.product, {
      foreignKey: "product_id",
      as: "product_image",
    });
  }
}

export const initImageModel = (sequelize: Sequelize) => {
  image.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      url: {
        allowNull: false,
        type: DataTypes.STRING,
      },

      name: {
        allowNull: false,
        type: DataTypes.STRING,
      },
      product_id: {
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "products",
          key: "id",
        },
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "images",
      tableName: "images",
      timestamps: true,
      paranoid: true,
    }
  );
};
