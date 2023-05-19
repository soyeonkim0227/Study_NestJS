import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll(): Promise<User[]> {
    console.log('유저 전체 불러오기');
    return this.userRepository.find();
  }

  async create(userData: CreateUserDto): Promise<User> {
    // CreateUserDto는 회원가입 할 때 받는 데이터의 형식을 정의함.
    const { email, username, password } = userData;

    const user = new User();
    user.email = email;
    user.username = username;
    user.password = password;

    await this.userRepository.save(user);
    // user.password = undefined; // DB에는 비밀번호 그대로 저장해주고 클라이언트에게 다시 보내줄 때 탈취당할 수 있으므로 비밀번호는 undefined로 변경해줌.
    console.log(user);

    return user;
  }
}
