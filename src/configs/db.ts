import { Sequelize } from "sequelize";
import dbConfigs from "./dbconfig";

const config = dbConfigs["development"] as {
  username: string;
  password: string;
  database: string;
  host: string;
  dialect: any;
};

export const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    dialect: config.dialect,
    logging: false,
  }
);

export const dbConnection = async (): Promise<void> => {
  try {
    await sequelize.authenticate();
    console.log("database Connection has been established successfully.");
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  }
};
