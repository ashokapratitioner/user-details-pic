"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AddressSchema = new mongoose_1.default.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    address1: {
        type: String,
        required: true,
    },
    address2: {
        type: String,
        required: false,
    },
    city: {
        type: String,
        required: true,
    },
    zipcode: {
        type: Number,
        required: true,
    },
    country: {
        type: String,
        required: true,
    },
}, { timestamps: true });
const Address = mongoose_1.default.model("Address", AddressSchema);
exports.default = Address;
