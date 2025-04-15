"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = void 0;
const sequelize_1 = require("sequelize");
const errors_1 = require("../libs/errors");
const constants_1 = require("../libs/constants");
const errorHandler = (error, req, res, next) => {
    switch (true) {
        case error instanceof errors_1.NotFound:
            res.status(constants_1.NOT_FOUND).json({ message: error.message });
            break;
        case error instanceof errors_1.BadRequest:
            res.status(constants_1.BAD_REQUEST).json({ message: error.message });
            break;
        case error instanceof errors_1.NoContent:
            res.status(constants_1.NO_CONTENT).json({ message: error.message });
            break;
        case error instanceof errors_1.ForBidden:
            res.status(constants_1.FORBIDDEN).json({ message: error.message });
            break;
        case error instanceof errors_1.UnAuthorized:
            res.status(constants_1.UNAUTHORIZED).json({ message: error.message });
            break;
        case error instanceof sequelize_1.ValidationError:
            res.status(constants_1.BAD_REQUEST).json({ error: error.message });
            break;
        default:
            res
                .status(constants_1.INTERNAL_SERVER_ERROR)
                .json({ message: error.message || "Internal Server Error" });
    }
};
exports.errorHandler = errorHandler;
