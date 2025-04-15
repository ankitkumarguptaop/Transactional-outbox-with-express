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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signIn = exports.signUp = void 0;
const errors_1 = require("../libs/errors");
const repositories_1 = require("../repositories");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const signUp = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const { name, email, password, role } = payload.body;
    const path = ((_a = payload === null || payload === void 0 ? void 0 : payload.file) === null || _a === void 0 ? void 0 : _a.path) || null;
    if (yield repositories_1.userRepository.findOne({ email: email })) {
        throw new errors_1.ForBidden("User alredy exists");
    }
    const user = yield repositories_1.userRepository.create({
        name: name,
        email: email,
        password: password,
        profile_image: path,
        role: role
    });
    return user;
});
exports.signUp = signUp;
const generateToken = (id) => {
    var _a;
    return jsonwebtoken_1.default.sign({ id }, ((_a = process === null || process === void 0 ? void 0 : process.env) === null || _a === void 0 ? void 0 : _a.JWT_SECRET) || "jwt Secret", {
        expiresIn: "3d",
    });
};
const signIn = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload.body;
    if (!email || !password) {
        throw new errors_1.BadRequest("data is not given");
    }
    const user = yield repositories_1.userRepository.findOne({ email: email });
    if (!user) {
        throw new errors_1.UnAuthorized("Need to register first");
    }
    const validate = yield bcrypt_1.default.compare(password, user.password);
    if (!validate) {
        throw new errors_1.UnAuthorized("Unauthorised access Password not matched!");
    }
    return { token: generateToken(user.id), user: user };
});
exports.signIn = signIn;
