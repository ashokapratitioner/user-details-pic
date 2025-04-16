"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userController_1 = __importDefault(require("../controllers/userController"));
const router = (0, express_1.Router)();
const userController = new userController_1.default();
router.get("/users", userController.getUsers);
router.get("/users/:id", userController.getUser);
router.patch("/users", userController.updateUser);
router.delete("/users/:id", userController.deleteuser);
exports.default = router;
