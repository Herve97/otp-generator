import express from 'express';
import bodyParser from 'body-parser';
import { OtpController } from './controllers/otp.controller';
import './db';

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

const otpController = new OtpController();

app.post('/otp/generate', otpController.generateOtp);
app.post('/otp/verify', otpController.verifyOtp);

app.listen(port, () => console.log(`Server running on port ${port}`));