"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userControllers_1 = __importDefault(require("../controllers/userControllers"));
const isLoggedIn_1 = require("../utils/isLoggedIn");
const router = express_1.default.Router();
router.get('/logged', userControllers_1.default.logged);
router.get('/no-permission', isLoggedIn_1.isLoggedIn, userControllers_1.default.permission);
exports.default = router;
