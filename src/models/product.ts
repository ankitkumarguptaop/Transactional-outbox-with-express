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
import { User } from "./user";

export class product extends Model<
  InferAttributes<product>,
  InferCreationAttributes<product>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare price: string;
  declare rating: string;
  declare description: string;
  declare brand: string;
  declare stock: string;
  declare user_id: ForeignKey<User["id"]>;
  declare category: 'books' | 'electronics' | 'clothing';
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;

  static associate(models: any) {
    product.hasMany(models.image, {
      foreignKey: "product_id",
      as: "product_images",
    });
  }
}

export const initProductModel = (sequelize: Sequelize) => {
  product.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      name: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [3, 100],
            msg: "name length should lie between 3 to 30",
          },
        },
      },
      price:{
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          min:1
        },
      },
      rating:{
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          min:1,
          max:5
        },
      },
      description: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [10, 1000],
            msg: "description  length should lie between 10 to 100",
          },
        },
      },
      brand:{
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [3, 1000],
            msg: "description  length should lie between 10 to 100",
          },
        },
      },
      stock:{
        allowNull: false,
        type: DataTypes.INTEGER,
        validate: {
          min:1,
        },
      },
      category:{
        allowNull: false,
        type: DataTypes.ENUM('books', 'electronics' , 'clothing'),
      },
      user_id:{
        allowNull: false,
        type: DataTypes.INTEGER,
        references: {
          model: "Users", 
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
      modelName: "products",
      tableName: "products",
      timestamps: true,
      paranoid: true,
    }
  );
};
