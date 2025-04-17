"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const addressController_1 = __importDefault(require("../controllers/addressController"));
const router = (0, express_1.Router)();
const addressController = new addressController_1.default();
router.post("/add", addressController.upsertAddress.bind(addressController));
router.get("/get", addressController.getAddress);
exports.default = router;
