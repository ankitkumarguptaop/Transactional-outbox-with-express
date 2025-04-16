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
import { OutboxMessage } from "./outbox-message";

export class InboxMessage extends Model<
  InferAttributes<InboxMessage>,
  InferCreationAttributes<InboxMessage>
> {
  declare id: CreationOptional<number>;
  declare message_id: ForeignKey<OutboxMessage["id"]>;
  declare type: "NOTIFICATION" | "EMAIL";
  declare is_seen: "YES" | "NO";
  declare createdAt: Date;
  declare updatedAt: Date;

  static associate(models: any) {}
}

export const initInBoxMessageModel = (sequelize: Sequelize) => {
  InboxMessage.init(
    {
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
        defaultValue: "NO",
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      modelName: "inbox-messages",
      tableName: "inbox-messages",
      timestamps: true,
    }
  );
};
