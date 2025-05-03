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
Object.defineProperty(exports, "__esModule", { value: true });
exports.publishToQueue = void 0;
const connection_1 = require("./connection");
const publishToQueue = (routingKey_1, message_1, ...args_1) => __awaiter(void 0, [routingKey_1, message_1, ...args_1], void 0, function* (routingKey, message, retries = 5, delay = 5000) {
    while (retries) {
        try {
            const channel = yield (0, connection_1.waitForChannel)();
            const exchangeName = process.env.RABBITMQ_EXCHANGE_NAME;
            yield channel.assertExchange(exchangeName, "topic", { durable: true });
            yield channel.publish(exchangeName, routingKey, Buffer.from(JSON.stringify({
                logType: routingKey,
                message,
                dateTime: new Date(),
            })));
            console.log(`Sent to exchange name: ${exchangeName} with routing key ${routingKey}`);
            return; // Exit on success
        }
        catch (error) {
            console.error(`Error publishing to queue with routing key ${routingKey}:`, error);
            retries -= 1;
            console.log(`Retrying... Attempts remaining: ${retries}`);
            yield new Promise((resolve) => setTimeout(resolve, delay));
        }
    }
    console.error(`Failed to publish message to queue after multiple attempts: ${routingKey}`);
});
exports.publishToQueue = publishToQueue;
