import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy } from 'passport-local';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    // username 키 이름 변경 emaild로 요청
    super({
      // super()를 통해 부모(PassportStrategy) 속성을 변경해 HTTP 요청 시 username 키 값이 아닌 email 키 값으로 요청이 가능하게 해줌.
      usernameField: 'email',
    });
  }

  async validate(email: string, password: string): Promise<any> {
    // 꼭 validate 명을 사용해야 함.

    let loginUserDto: LoginUserDto = {
      email,
      password,
    };

    const user = await this.authService.validateUser(loginUserDto);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
