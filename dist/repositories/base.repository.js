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
exports.BaseRepository = void 0;
class BaseRepository {
    constructor({ model }) {
        this.model = model;
    }
    create(payload_1) {
        return __awaiter(this, arguments, void 0, function* (payload, options = {}) {
            const instance = yield this.model.create(payload, options);
            return instance && instance.toJSON();
        });
    }
    update(_a) {
        return __awaiter(this, arguments, void 0, function* ({ payload, criteria, options = {} }) {
            return yield this.model.update(payload, Object.assign({ where: criteria }, options));
        });
    }
    findAll(_a) {
        return __awaiter(this, arguments, void 0, function* ({ criteria = {}, include = [], order, attributes = {}, offset = 0, paranoid = true, limit = null, }) {
            const findQuery = {
                where: criteria,
                include,
                attributes,
                offset,
                order,
                paranoid,
                subQuery: false,
            };
            if (limit)
                findQuery.limit = limit;
            return yield this.model.findAll(findQuery);
        });
    }
    findAndCountAll(_a) {
        return __awaiter(this, arguments, void 0, function* ({ criteria, include = [], offset = 0, limit = 10 }) {
            return yield this.model.findAndCountAll({
                where: criteria,
                include,
                offset,
                limit,
            });
        });
    }
    findOne(criteria_1) {
        return __awaiter(this, arguments, void 0, function* (criteria, include = [], attributes = {}, options = {}) {
            return yield this.model.findOne(Object.assign({ where: criteria, include,
                attributes }, options));
        });
    }
    createBulk(payload, options) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.model.bulkCreate(payload, options);
        });
    }
    count(_a) {
        return __awaiter(this, arguments, void 0, function* ({ criteria = {}, options = {} }) {
            return yield this.model.count(Object.assign({ where: criteria }, options));
        });
    }
    softDelete(_a) {
        return __awaiter(this, arguments, void 0, function* ({ criteria, options }) {
            return yield this.model.destroy(Object.assign({ where: criteria }, options));
        });
    }
}
exports.BaseRepository = BaseRepository;
