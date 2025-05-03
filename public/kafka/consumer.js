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
const prometheus_1 = require("../services/prometheus");
const { Kafka } = require('kafkajs');
const kafka = new Kafka({
    clientId: 'user-details-pic',
    brokers: ['localhost:9092'],
});
const consumer = kafka.consumer({ groupId: 'user-service-group' });
const runConsumer = () => __awaiter(void 0, void 0, void 0, function* () {
    yield consumer.connect();
    yield consumer.subscribe({
        topic: 'user-registered',
        fromBeginning: true, // Start from the beginning for demonstration
    });
    // Listen for messages from Kafka
    yield consumer.run({
        eachMessage: (_a) => __awaiter(void 0, [_a], void 0, function* ({ topic, partition, message }) {
            prometheus_1.messageCounter.inc();
            console.log(`Received message: ${message.value.toString()}`);
        }),
    });
});
// Start the consumer
runConsumer().catch(console.error);
