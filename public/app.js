"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = __importDefault(require("./config/db"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const addressRoutes_1 = __importDefault(require("./routes/addressRoutes"));
const authenticationRoutes_1 = __importDefault(require("./routes/authenticationRoutes"));
const functions = __importStar(require("firebase-functions"));
const verifyTokenMiddleware_1 = require("./middleware/verifyTokenMiddleware");
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const connection_1 = require("./rabbitmq/connection");
const cors_1 = __importDefault(require("./services/cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config({
    path: `.env.${process.env.NODE_ENV}`
});
const app = (0, express_1.default)();
const PORT = Number(process.env.APP_PORT) || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
// Database connection
(0, db_1.default)();
// Listen to these Routes
app.use(authenticationRoutes_1.default);
app.use((0, cookie_parser_1.default)());
app.use('/user', verifyTokenMiddleware_1.verifyTokenMiddleware, userRoutes_1.default);
app.use('/address', verifyTokenMiddleware_1.verifyTokenMiddleware, addressRoutes_1.default);
app.use((req, res) => {
    res.status(404).json({ message: "Route not found" });
});
(() => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, connection_1.connectRabbitMQ)();
    app.listen(PORT, () => {
        console.log(`Server is running on ${process.env.APP_HOST}`);
    });
}))();
exports.api = functions.https.onRequest(app);
