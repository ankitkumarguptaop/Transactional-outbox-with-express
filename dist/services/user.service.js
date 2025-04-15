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
exports.updateUser = exports.deleteUser = void 0;
const errors_1 = require("../libs/errors");
const repositories_1 = require("../repositories");
const deleteUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = payload.user;
    const user = yield repositories_1.userRepository.findOne({ id: id });
    if (!user) {
        throw new errors_1.ForBidden("User not found");
    }
    return yield repositories_1.userRepository.softDelete({
        criteria: { id: id },
        options: { returning: true },
    });
});
exports.deleteUser = deleteUser;
const updateUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = payload.user;
    const user = yield repositories_1.userRepository.findOne({ id: id });
    if (!user) {
        throw new errors_1.ForBidden("User not found");
    }
    return yield repositories_1.userRepository.update({
        payload: payload.body,
        criteria: { id: id },
        options: { returning: true },
    });
});
exports.updateUser = updateUser;
