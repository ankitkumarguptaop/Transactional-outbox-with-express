"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const config = {
    development: {
        username: process.env.DB_USER_NAME || 'postgres',
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME || 'demodb',
        host: process.env.DB_HOST || 'database',
        dialect: process.env.DB_TYPE
    },
    test: {
        username: process.env.DB_USER_NAME || 'postgres',
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST || 'database',
        database: "database_test",
        dialect: process.env.DB_TYPE
    },
    production: {
        username: process.env.DB_USER_NAME || 'postgres',
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST || 'database',
        database: "database_production",
        dialect: process.env.DB_TYPE
    }
};
module.exports = config;
