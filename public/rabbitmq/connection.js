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
exports.connectRabbitMQ = connectRabbitMQ;
exports.getChannel = getChannel;
const amqplib_1 = __importDefault(require("amqplib"));
let channel, connection;
function connectRabbitMQ() {
    return __awaiter(this, void 0, void 0, function* () {
        const URL = process.env.RABBITMQ_URL;
        console.log("Rabbit URL: ", URL);
        if (!URL) {
            console.log("Connected to RabbitMQ failed.");
            return;
        }
        connection = yield amqplib_1.default.connect(URL);
        channel = yield connection.createChannel();
        console.log("Connected to RabbitMQ");
    });
}
function getChannel() {
    if (!channel)
        throw new Error("Channel not initialized");
    return channel;
}
