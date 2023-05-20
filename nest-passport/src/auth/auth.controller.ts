import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './guard/local-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Guard는 NestJS 미들웨어 중 하나, 특정 라우트를 통과해서 서버에 누가 들어왔는지 누가 못 들어왔는지 알려줌. (Express는 안 알려줌.) 'local'을 명시해줌으로써 local.strategy.ts를 실행 후 req.user에 반환해준다.
  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Body() loginDTO: LoginUserDto) {
    return await this.authService.validateUser(loginDTO);
  }
}
