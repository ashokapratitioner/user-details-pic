"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const corsOptions = {
    origin: "http://localhost:8084",
    methods: ["GET", "POST", "PATCH", "OPTIONS", "PUT", "DELETE"],
    credentials: true,
};
const allowedCors = () => {
    return (0, cors_1.default)(corsOptions);
};
exports.default = allowedCors;
