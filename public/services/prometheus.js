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
exports.messageCounter = void 0;
const prom_client_1 = __importDefault(require("prom-client"));
const express_1 = __importDefault(require("express"));
const producer_1 = require("../kafka/producer");
const app = (0, express_1.default)();
exports.messageCounter = new prom_client_1.default.Counter({
    name: "kafka_message_count",
    help: "Count of messages consumed from Kafka",
});
app.get("/metrics", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.set("Content-Type", prom_client_1.default.register.contentType);
    res.end(yield prom_client_1.default.register.metrics());
}));
app.post("/message", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, producer_1.sendMessage)({ userId: '1232', username: 'Alice' });
    return res.status(200).json({ message: "Message sent" });
    // await sendMessage({ userId: '1233', username: 'Alice2' });
    // await sendMessage({ userId: '1234', username: 'Alice3' });
    // await sendMessage({ userId: '1235', username: 'Alice5' });
}));
app.listen(8080, () => {
    console.log("Prometheus metrics exposed on port 8080");
});
