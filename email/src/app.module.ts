import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { MailModule } from './mail/mail.module';
import { UserModule } from './user/user.module';
import { configDotenv } from 'dotenv';

configDotenv();

@Module({
  imports: [
    RedisModule.forRoot({
      readyLog: true,
      config: {
        host: process.env.REDIS_HOST,
        port: Number(process.env.REDIS_PORT),
        password: process.env.REDIS_PW
      }
    }),
    MailModule,
    UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
