"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authenticationController_1 = __importDefault(require("../controllers/authenticationController"));
const router = (0, express_1.Router)();
const authenticationController = new authenticationController_1.default();
router.post('/login', authenticationController.login.bind(authenticationController));
router.post('/signup', authenticationController.signUp);
router.get('/logout', authenticationController.logout);
router.get('/refresh-token', authenticationController.refreshToken.bind(authenticationController));
exports.default = router;
