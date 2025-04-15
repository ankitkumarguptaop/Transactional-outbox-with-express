import { Dialect } from 'sequelize';
import dotenv from "dotenv";
dotenv.config()

interface DBConfig {
  username: string;
  password: string | undefined |null;
  database: string;
  host: string;
  dialect: Dialect ;
}

interface ConfigGroup {
  [key: string]: DBConfig;
}

const config: ConfigGroup = {
  development: {
    username: process.env.DB_USER_NAME || 'postgres',
    password: process.env.DB_PASSWORD ,
    database: process.env.DB_NAME || 'newproject',
    host: process.env.DB_HOST || 'database',
    dialect: process.env.DB_TYPE as Dialect
  },
  test: {
    username: process.env.DB_USER_NAME || 'postgres',
    password: process.env.DB_PASSWORD ,
    host: process.env.DB_HOST || 'database',
    database: "database_test" ,
    dialect: process.env.DB_TYPE as Dialect
  },
  production: {
    username: process.env.DB_USER_NAME || 'postgres',
    password: process.env.DB_PASSWORD ,
    host: process.env.DB_HOST || 'database',
    database: "database_production",
    dialect: process.env.DB_TYPE as Dialect
  }
};

export  = config;
