import { Module } from '@nestjs/common';
import { RedisModule } from '@liaoliaots/nestjs-redis';
import { MailModule } from './mail/mail.module';
import { UserModule } from './user/user.module';
import { configDotenv } from 'dotenv';
import { TypeOrmModule } from '@nestjs/typeorm';

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
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [__dirname + '/**/entity/*.js'],
			synchronize: false,
			logging: false,
			migrations: [__dirname + '/**/migrations/*.js'],
			migrationsTableName: 'migrations',
			autoLoadEntities: true,
			timezone: 'Asia/Seoul',
    }),
    MailModule,
    UserModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
