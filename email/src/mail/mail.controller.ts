import { Controller, Post, Query } from '@nestjs/common';
import { MailService } from './mail.service';

@Controller('mail')
export class MailController {
    constructor(
        private mailService: MailService
    ) {}

    @Post('send?')
    async sendMail(@Query('email') email: string) {
        const data = await this.mailService.sendMail(email);

        return {
            data,
            status: 200,
            message: '인증번호가 발송되었습니다.'
        }
    }

    @Post('verify?')
    async verifyMail(@Query('email') email: string, @Query('code') code: string) {
        await this.mailService.verifyMail(email, code);

        return {
            status: 200,
            message: '올바른 인증번호입니다.'
        }
    }
}
