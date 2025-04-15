"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.upload = void 0;
const multer_1 = __importDefault(require("multer"));
const upload = () => {
    const storage = multer_1.default.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "src/uploads/");
        },
        filename: (req, file, cb) => {
            const suffix = Date.now();
            cb(null, `${suffix}-${file.originalname}`);
        },
    });
    return (0, multer_1.default)({ storage });
};
exports.upload = upload;
