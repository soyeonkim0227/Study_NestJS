import {
  BadRequestException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { User } from 'src/user/user.entity';
import { Repository } from 'typeorm';

// 실제 DB에 접근해서 작업하고 비즈니스 로직을 구현하는 것이 service의 역할
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async validateUser(loginUserDto: LoginUserDto): Promise<any> {
    const user = await this.userRepository.findOne({
      where: { email: loginUserDto.email },
    });

    if (!user) {
      throw new NotFoundException({
        statuscode: HttpStatus.NOT_FOUND,
        message: '등록되지 않은 유저입니다.',
        error: 'NotFound',
      });
    }

    if (user.password == loginUserDto.password) {
      const { password, ...result } = user;

      // 비밀번호를 제외하고 유저 정보를 반환
      return result;
    } else {
      throw new BadRequestException({
        statuscode: HttpStatus.BAD_REQUEST,
        message: '비밀번호가 일치하지 않습니다.',
        error: 'BadRequest',
      });
    }
  }
}
