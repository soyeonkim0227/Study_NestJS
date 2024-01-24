import { ConflictException, Injectable } from '@nestjs/common';
import { InjectRedis } from '@liaoliaots/nestjs-redis';
import Mail from 'nodemailer/lib/mailer';
import * as nodemailer from 'nodemailer';
import Redis from 'ioredis';

/**
 * nodemailer 작동방식
 * 
 */

// 메일 옵션 타입
interface EmailOptions {
    to: string,
    from: string,
    subject: string,
    html: string
};

@Injectable()
export class MailService {
    private transporter: Mail

    constructor(
        @InjectRedis() private readonly redis: Redis
    ) {
        // transporter 객체 생성
        this.transporter = nodemailer.createTransport({
            service: 'gmail',
            host: 'smtp.gmail.com',
            auth: {
                user: process.env.USER_MAIL,
                pass: process.env.USER_PASS
            }
        });
    }

     /**
     * 
     * @param email 
     * @return number
     * 
     * 이메일 발송
     */
    async sendMail(email: string) {
        // 난수 생성
        const generateRandom = (min, max) => {
            return Math.floor(Math.random() * (max - min + 1)) + min;
        }
        const number = String(generateRandom(1, 999999)).padStart(6, '0');

        // redis에 인증번호 저장 (1000은 1초를 의미)
        await this.redis.set(email, number, "EX", 1000*60);

        const mailOptions: EmailOptions = {
            to: email,
            from: process.env.USER_MAIL,
            subject: '가입 인증 메일',
            html: `인증번호: ${number}`
        };

        await this.transporter.sendMail(mailOptions);

        return number;
    }

     /**
     * 
     * @param email
     * @param code
     * 
     * 인증코드 확인
     */
    async verifyMail(email: string, code: string) {
        // 인증번호가 일치하는지 확인
        const getCode = await this.redis.get(email);
        if (Number(code) != Number(getCode)) throw new ConflictException('인증번호가 일치하지 않습니다.');

        return await this.redis.set(email, "1", "EX", 1000*60);
    }
}
