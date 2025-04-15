"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const constants_1 = require("../libs/constants");
const services_1 = require("../services");
const signUp = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log(req.body);
    console.log(req.file);
    try {
        const response = yield services_1.authService.signUp({
            body: req.body,
            file: req.file,
        });
        res.status(constants_1.OK).json({
            message: "Successfully created user",
            user: response,
        });
    }
    catch (error) {
        console.error("Failed to create user:", error.message);
        next(error);
    }
});
exports.signUp = signUp;
const signIn = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield services_1.authService.signIn({
            body: req.body,
        });
        const cookieOptions = {
            secure: true,
            httpOnly: true,
        };
        const { token } = response;
        res
            .cookie("jwt", token, cookieOptions)
            .status(constants_1.OK)
            .json({ message: "Successfully signed in user", user: response });
    }
    catch (error) {
        console.error("Failed to sign in user:", error.message);
        next(error);
    }
});
exports.signIn = signIn;
