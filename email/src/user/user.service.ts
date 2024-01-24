import { InjectRedis } from '@liaoliaots/nestjs-redis';
import { ConflictException, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Redis from 'ioredis';
import { Repository } from 'typeorm';
import { SignupDto } from './dto/signup.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private userEntity: Repository<User>,
        @InjectRedis() private readonly redis: Redis
    ) {}

    async signup(signupDto: SignupDto) {
        const { name, email, password } = signupDto;

        if (await this.userEntity.findOneBy({ email })) throw new ConflictException('이메일 중복');

        const verifyEmail = await this.redis.get(email);
        if (verifyEmail !== '1') throw new UnauthorizedException('이메일 인증 안됨')

        await this.userEntity.save({
            name,
            email,
            password
        });
    }

}
