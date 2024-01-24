import { Body, Controller, Post } from '@nestjs/common';
import { SignupDto } from './dto/signup.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) {}

    @Post()
    async signup(@Body() signupDto: SignupDto) {
        await this.userService.signup(signupDto);

        return {
            status: 201,
            message: "회원가입 완료"
        }
    }
}
