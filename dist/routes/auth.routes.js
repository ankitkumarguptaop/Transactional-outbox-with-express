"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const controllers_1 = require("../controllers");
const middlewares_1 = require("../middlewares");
const router = express_1.default.Router();
router.post("/signup", middlewares_1.imageUpload.upload().single("profilePic"), controllers_1.authController.signUp);
router.post("/signin", controllers_1.authController.signIn);
exports.default = router;
