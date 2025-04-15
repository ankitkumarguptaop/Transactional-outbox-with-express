"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.initUserModel = exports.User = void 0;
const sequelize_1 = require("sequelize");
class User extends sequelize_1.Model {
    static associate(models) {
        // Define associations here
    }
}
exports.User = User;
const initUserModel = (sequelize) => {
    User.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER,
        },
        name: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING,
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
            type: sequelize_1.DataTypes.STRING,
            validate: {
                isEmail: {
                    msg: 'invalid email format',
                },
            },
        },
        profile_image: {
            allowNull: false,
            unique: true,
            type: sequelize_1.DataTypes.STRING,
        },
        password: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING,
            validate: {
                len: {
                    args: [6, 30],
                    msg: 'password length should lie between 6 to 30',
                },
            },
        },
        role: {
            allowNull: false,
            type: sequelize_1.DataTypes.ENUM('normal', 'admin', 'superadmin'),
        },
        createdAt: {
            allowNull: false,
            type: sequelize_1.DataTypes.DATE,
        },
        updatedAt: {
            allowNull: false,
            type: sequelize_1.DataTypes.DATE,
        },
        deletedAt: {
            type: sequelize_1.DataTypes.DATE,
        },
    }, {
        sequelize,
        modelName: 'User',
        tableName: 'Users',
        timestamps: true,
        paranoid: true,
    });
};
exports.initUserModel = initUserModel;
