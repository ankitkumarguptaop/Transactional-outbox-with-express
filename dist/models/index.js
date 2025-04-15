"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const user_1 = require("./user");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_1.User; } });
const dbconfig_1 = __importDefault(require("../configs/dbconfig"));
const config = dbconfig_1.default['development'];
// Initialize Sequelize
const sequelize = new sequelize_1.Sequelize(config.database, config.username, (_a = config.password) !== null && _a !== void 0 ? _a : undefined, {
    host: config.host,
    dialect: config.dialect,
});
exports.sequelize = sequelize;
// Initialize models
(0, user_1.initUserModel)(sequelize);
// Call associate methods if needed
(_b = user_1.User.associate) === null || _b === void 0 ? void 0 : _b.call(user_1.User, {});
