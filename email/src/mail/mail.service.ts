import { Injectable } from '@nestjs/common';

// 메일 옵션 타입
interface EmailOptions {
    to: string,
    from: string,
    subject: string,
    html: string
};

@Injectable()
export class MailService {
    private transporter: 
    
    constructor(

    ) {}

    sendMail(email: string) {

    }

    verifyMail(email: string, code: string) {

    }
}
