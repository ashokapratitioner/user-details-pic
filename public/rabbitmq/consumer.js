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
exports.consumeFromQueue = consumeFromQueue;
const connection_1 = require("./connection");
function consumeFromQueue(queueName) {
    return __awaiter(this, void 0, void 0, function* () {
        const channel = (0, connection_1.getChannel)();
        yield channel.assertQueue(queueName);
        channel.consume(queueName, (msg) => {
            console.log(`Received from ${queueName}:`, msg.content.toString());
            channel.ack(msg);
        });
    });
}
