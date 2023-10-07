"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const otp_controller_1 = require("./controllers/otp.controller");
require("./db");
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
app.use(body_parser_1.default.json());
const otpController = new otp_controller_1.OtpController();
app.post('/otp/generate', otpController.generateOtp);
app.post('/otp/verify', otpController.verifyOtp);
app.listen(port, () => console.log(`Server running on port ${port}`));
