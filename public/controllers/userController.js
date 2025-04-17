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
const userModel_1 = __importDefault(require("../models/userModel"));
const password_1 = require("../services/password");
class UserController {
    constructor() {
        this.deleteuser = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const user = yield userModel_1.default.findByIdAndDelete(id);
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                res.status(200).json({ message: "User deleted successfully" });
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const user = yield userModel_1.default.findById(id);
                if (!user) {
                    return res.status(404).json({ message: "User not found" });
                }
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const users = yield userModel_1.default.find();
                res.status(200).json(users);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    updateUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            let user;
            user = yield userModel_1.default.findById(id);
            if (!user) {
                return res.status(404).json({ message: "User not found" });
            }
            const { phone, email, name, password } = req.body;
            if (!!email && user.email !== email) {
                return res.status(400).json({ message: "Email cannot be changed" });
            }
            let hashedPassword = user.password;
            const hasPasswordChanged = yield (0, password_1.hasValidPassword)(password, hashedPassword);
            if (!hasPasswordChanged) {
                hashedPassword = yield (0, password_1.hashPassword)(password);
            }
            const creatorId = res.userId;
            if (phone)
                user.phone = phone;
            if (name)
                user.name = name;
            if (password)
                user.password = hashedPassword;
            if (creatorId)
                user.creator = creatorId;
            try {
                yield user.save();
                res.status(200).json(user);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.default = UserController;
