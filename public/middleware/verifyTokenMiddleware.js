"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyTokenMiddleware = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const verifyTokenMiddleware = (req, res, next) => {
    var _a;
    const token = req.cookies.accessToken || ((_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ")[1]);
    if (!token)
        return res.status(401).json({ message: "Access token missing" });
    try {
        const ACCESS_SECRET = process.env.ACCESS_SECRET;
        if (!ACCESS_SECRET) {
            return res.status(500).json({
                message: "Token can't be generated, issues with env variable.",
            });
        }
        const decoded = jsonwebtoken_1.default.verify(token, ACCESS_SECRET);
        if (!decoded) {
            return res.status(403).json({ message: "Invalid token" });
        }
        res.userId = decoded.userId;
        next();
    }
    catch (error) {
        return res.status(403).json({ message: "Invalid token" });
    }
};
exports.verifyTokenMiddleware = verifyTokenMiddleware;
