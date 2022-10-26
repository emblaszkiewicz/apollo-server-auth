"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authControllers_1 = __importDefault(require("../controllers/authControllers"));
const router = express_1.default.Router();
router.get('/google', authControllers_1.default.login);
router.get('/google/callback', authControllers_1.default.callback);
router.get('/logout', authControllers_1.default.logout);
exports.default = router;
