"use strict";
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
const jwt_1 = require("../token/jwt");
const userModel_1 = __importDefault(require("../models/userModel"));
const password_1 = require("../services/password");
const publisher_1 = require("../rabbitmq/publisher");
class AuthenticationController {
    setTokenAsCookie(res, user) {
        const ACCESS_SECRET = process.env.ACCESS_SECRET;
        const REFRESH_SECRET = process.env.REFRESH_SECRET;
        if (!ACCESS_SECRET || !REFRESH_SECRET) {
            return res.status(500).json({
                message: "Token can't be generated, issues with env variable.",
            });
        }
        const accessToken = (0, jwt_1.generateAccessToken)(user, ACCESS_SECRET);
        const refreshToken = (0, jwt_1.generateRefreshToken)(user, REFRESH_SECRET);
        res.cookie("accessToken", accessToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: jwt_1.accessTokenTimeout
        });
        res.cookie("refreshToken", refreshToken, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: jwt_1.refreshTokenTimeout
        });
    }
    login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { email, password } = req.body;
            const user = yield userModel_1.default.findOne({ email });
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const passwordMatch = yield (0, password_1.hasValidPassword)(password, user.password);
            if (!passwordMatch) {
                return res.status(401).json({ message: "Invalid credential" });
            }
            this.setTokenAsCookie(res, user);
            (0, publisher_1.publishToQueue)("USER_PHONE", JSON.stringify({ email: user.email }));
            res.status(200).json({ message: "Login successful" });
        });
    }
    signUp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const hashedPassword = yield (0, password_1.hashPassword)(req.body.password);
                const user = new userModel_1.default({
                    email: req.body.email,
                    name: req.body.name,
                    password: hashedPassword,
                    phone: req.body.phone,
                    creator: req.body.creator,
                });
                yield user.save();
                res.status(201).json(user);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    logout(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            res.clearCookie("accessToken");
            res.clearCookie("refreshToken");
            res.status(200).json({ message: "Logout successful" });
        });
    }
    refreshToken(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { refreshToken } = req.cookies;
            const REFRESH_SECRET = process.env.REFRESH_SECRET;
            if (!REFRESH_SECRET) {
                return res.status(500).json({
                    message: "Token can't be generated, issues with env variable.",
                });
            }
            if (!refreshToken) {
                return res.status(401).json({ message: "Refresh token not found" });
            }
            try {
                const user = yield userModel_1.default.findById(refreshToken.userId);
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                this.setTokenAsCookie(res, user);
                res.status(200).json({ message: "Refresh token successful" });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.default = AuthenticationController;
