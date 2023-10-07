"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const MONGO_URL = process.env.MONGO_URL || 'mongodb://127.0.0.1:27017/otp-service';
mongoose_1.default
    .connect(MONGO_URL)
    .then(() => console.log('Connected to MongoDB'))
    .catch((error) => console.error(error));
