import { Controller, Post, Query } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(
        private mailService: MailService
    ) {}

    @Post('send?')
    sendMail(@Query('email') email: string) {
        this.mailService.sendMail(email);

        return {
            status: 200,
            message: '인증번호가 발송되었습니다.'
        }
    }

    @Post('verify?')
    verifyMail(@Query('email') email: string, @Query('code') code: string) {
        this.mailService.verifyMail(email, code);

        return {
            status: 200,
            message: '올바른 인증번호입니다.'
        }
    }
}
