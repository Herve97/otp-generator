import { Request, Response } from 'express';
import { Otp, OtpModel } from '../models/otp';
import { generate } from 'otp-generator';

export class OtpController {
  public async generateOtp(req: Request, res: Response) {
    const { phone, email } = req.body;

    const otp = generate(6, {
      digits: true,
      upperCaseAlphabets: false,
      specialChars: false,
    });

    const secret = generate(20, {
      digits: true,
      upperCaseAlphabets: true,
      specialChars: true,
    });

    const newOtp: Partial<Otp> = {
      phone,
      email,
      otp,
      secret,
    };

    try {
      const createdOtp = await OtpModel.create(newOtp);
      res.json({ otp: createdOtp.otp });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }

  public async verifyOtp(req: Request, res: Response) {
    const { phone, email, otp } = req.body;

    try {
      const foundOtp = await OtpModel.findOne({ phone, email, otp });
      if (foundOtp) {
        res.json({ message: 'OTP verified successfully' });
      } else {
        res.status(401).json({ message: 'Invalid OTP' });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Internal server error' });
    }
  }
}