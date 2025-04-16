"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.accessTokenTimeout = exports.refreshTokenTimeout = exports.generateRefreshToken = exports.generateAccessToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const refreshTokenTimeout = 7 * 24 * 60 * 60 * 1000; // 7 days
exports.refreshTokenTimeout = refreshTokenTimeout;
const accessTokenTimeout = 15 * 60 * 1000; // 15 minutes
exports.accessTokenTimeout = accessTokenTimeout;
const generateAccessToken = (user, accessSecret) => {
    return jsonwebtoken_1.default.sign({ userId: user.id }, accessSecret, {
        expiresIn: accessTokenTimeout,
    });
};
exports.generateAccessToken = generateAccessToken;
const generateRefreshToken = (user, refreshSecret) => {
    return jsonwebtoken_1.default.sign({ userId: user.id }, refreshSecret, {
        expiresIn: refreshTokenTimeout,
    });
};
exports.generateRefreshToken = generateRefreshToken;
