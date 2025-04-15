import {
  DataTypes,
  Model,
  InferAttributes,
  InferCreationAttributes,
  Sequelize,
  CreationOptional,
} from 'sequelize';

import bcrypt from 'bcryptjs'; 

export class User extends Model<
  InferAttributes<User>,
  InferCreationAttributes<User>
> {
  declare id: CreationOptional<number>;
  declare name: string;
  declare email: string;
  declare profile_image: string;
  declare password: string;
  declare role: 'normal' | 'admin' | 'superadmin';
  declare createdAt: Date;
  declare updatedAt: Date;
  declare deletedAt: Date | null;

  // Method to compare passwords
  async matchPassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

  static associate(models: any) {
    // Define associations here
  }
}

export const initUserModel = (sequelize: Sequelize) => {
  User.init(
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
            args: [3, 30],
            msg: 'name length should lie between 3 to 30',
          },
        },
      },
      email: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
        validate: {
          isEmail: {
            msg: 'invalid email format',
          },
        },
      },
      profile_image: {
        allowNull: false,
        unique: true,
        type: DataTypes.STRING,
      },
      password: {
        allowNull: false,
        type: DataTypes.STRING,
        validate: {
          len: {
            args: [6, 30],
            msg: 'password length should lie between 6 to 30',
          },
        },
      },
      role: {
        allowNull: false,
        type: DataTypes.ENUM('normal', 'admin', 'superadmin'),
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
      modelName: 'User',
      tableName: 'Users',
      timestamps: true,
      paranoid: true,
      hooks: {
        beforeCreate: async (user: User) => {
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        },
        beforeUpdate: async (user: User) => {
          if (user.changed('password')) {
            const salt = await bcrypt.genSalt(10);
            user.password = await bcrypt.hash(user.password, salt);
          }
        },
      },
    }
  );
};
