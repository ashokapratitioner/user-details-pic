"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const app = (0, express_1.default)();
const PORT = process.env.APP_PORT || 5000;
app.use(express_1.default.json());
// Database connection
(0, db_1.default)();
// Listen to these Routes 
app.use(userRoutes_1.default);
app.listen(PORT, () => {
    console.log(`Server is running on ${process.env.APP_HOST}`);
});
