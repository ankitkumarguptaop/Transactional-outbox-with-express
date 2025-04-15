"use strict";

import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
  CreationOptional,
} from "sequelize";

export class OutboxMessage extends Model<
  InferAttributes<OutboxMessage>,
  InferCreationAttributes<OutboxMessage>
> {
  declare id: CreationOptional<number>;
  declare message_id: number;
  declare type: string;
  declare routing_key: string;
  declare signature: string;
  declare message: string;
  declare status: 'SENT' | 'PENDING';
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models: any) {
 
  }
}

export const initOutBoxMessageModel = (sequelize: Sequelize) => {
  OutboxMessage.init(
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      message_id: {
        type: DataTypes.INTEGER
      },
      type: {
        type: DataTypes.STRING
      },
      routing_key: {
        type: DataTypes.STRING
      },
      signature: {
        type: DataTypes.STRING
      },
      message: {
        type: DataTypes.STRING
      },
      status: {
        allowNull: false,
        type: DataTypes.ENUM('SENT', 'PENDING')
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      modelName: "outbox-messages",
      tableName: "outbox-messages",
      timestamps: true,
    }
  );
};
