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
exports.waitForChannel = void 0;
exports.connectRabbitMQ = connectRabbitMQ;
const amqplib_1 = __importDefault(require("amqplib"));
let channel, connection;
const waitForChannel = (...args_1) => __awaiter(void 0, [...args_1], void 0, function* (timeout = 10000) {
    const start = Date.now();
    while (!channel) {
        if (Date.now() - start > timeout) {
            throw new Error("Timeout waiting for RabbitMQ channel");
        }
        yield new Promise(res => setTimeout(res, 500));
    }
    return channel;
});
exports.waitForChannel = waitForChannel;
function connectRabbitMQ() {
    return __awaiter(this, arguments, void 0, function* (retries = 5, delay = 5000) {
        const URL = process.env.RABBITMQ_URL;
        console.log("Rabbit URL: ", URL);
        if (!URL) {
            console.log("Connected to RabbitMQ failed.");
            return;
        }
        while (retries) {
            try {
                const connection = yield amqplib_1.default.connect(URL);
                console.log("RabbitMQ connected successfully");
                return connection;
            }
            catch (error) {
                console.error("Error connecting to RabbitMQ", error);
                retries -= 1;
                console.log(`Retrying to connect to RabbitMQ... Attempts remaining: ${retries}`);
                yield new Promise(resolve => setTimeout(resolve, delay));
            }
        }
        throw new Error("Failed to connect to RabbitMQ after multiple attempts");
    });
}
process.on("exit", () => {
    if (connection)
        connection.close();
    console.log("RabbitMQ connection closed");
});
