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
exports.OtpController = void 0;
const otp_1 = require("../models/otp");
const otp_generator_1 = require("otp-generator");
class OtpController {
    generateOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { phone, email } = req.body;
            const otp = (0, otp_generator_1.generate)(6, {
                digits: true,
                upperCaseAlphabets: false,
                specialChars: false,
            });
            const secret = (0, otp_generator_1.generate)(20, {
                digits: true,
                upperCaseAlphabets: true,
                specialChars: true,
            });
            const newOtp = {
                phone,
                email,
                otp,
                secret,
            };
            try {
                const createdOtp = yield otp_1.OtpModel.create(newOtp);
                res.json({ otp: createdOtp.otp });
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
    verifyOtp(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const { phone, email, otp } = req.body;
            try {
                const foundOtp = yield otp_1.OtpModel.findOne({ phone, email, otp });
                if (foundOtp) {
                    res.json({ message: 'OTP verified successfully' });
                }
                else {
                    res.status(401).json({ message: 'Invalid OTP' });
                }
            }
            catch (error) {
                console.error(error);
                res.status(500).json({ message: 'Internal server error' });
            }
        });
    }
}
exports.OtpController = OtpController;
