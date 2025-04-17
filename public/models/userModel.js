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
const mongoose_1 = __importDefault(require("mongoose"));
const addressModel_1 = __importDefault(require("./addressModel"));
const userSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        immutable: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    phone: {
        type: String,
        required: true,
        minlength: 10,
        maxlength: 15,
        unique: true
    },
    creator: {
        type: String,
        required: true,
    }
}, { timestamps: true });
userSchema.virtual("address", {
    ref: "Address",
    localField: "_id",
    foreignField: "userId",
    justOne: true
});
userSchema.set("toObject", { virtuals: true });
userSchema.set("toJSON", { virtuals: true });
userSchema.pre("findOneAndDelete", function (next) {
    return __awaiter(this, void 0, void 0, function* () {
        const doc = yield this.model.findOne(this.getFilter());
        if (doc) {
            yield addressModel_1.default.deleteOne({ userId: doc._id });
        }
        next();
    });
});
const User = mongoose_1.default.model("User", userSchema);
exports.default = User;
