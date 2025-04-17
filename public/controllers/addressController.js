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
const addressModel_1 = __importDefault(require("../models/addressModel"));
class AddressController {
    updateAddress(address, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const { address1, address2, city, zipcode, country } = reqBody;
            // Update existing address
            if (address1)
                address.address1 = address1;
            if (address2)
                address.address2 = address2;
            if (city)
                address.city = city;
            if (zipcode)
                address.zipcode = zipcode;
            if (country)
                address.country = country;
            yield address.save();
        });
    }
    createAddress(userId, reqBody) {
        return __awaiter(this, void 0, void 0, function* () {
            const { address1, address2, city = "Bengaluru", zipcode, country = "India", } = reqBody;
            const newAddress = new addressModel_1.default({
                userId,
                address1,
                address2,
                city,
                zipcode,
                country,
            });
            yield newAddress.save();
            return newAddress;
        });
    }
    upsertAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = res.userId;
            try {
                const address = yield addressModel_1.default.findOne({ userId });
                if (address) {
                    yield this.updateAddress(address, req.body);
                    return res.status(200).json(address);
                }
                else {
                    const newAddress = yield this.createAddress(userId, req.body);
                    res.status(201).json(newAddress);
                }
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
    getAddress(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { id } = req.params;
            try {
                const address = yield addressModel_1.default.findById(id);
                if (!address) {
                    return res.status(404).json({ message: "Address not found" });
                }
                res.status(200).json(address);
            }
            catch (error) {
                res.status(500).json({ message: error.message });
            }
        });
    }
}
exports.default = AddressController;
