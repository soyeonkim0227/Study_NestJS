import { Module } from '@nestjs/common';
import { APP_FILTER } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from './board/board.module';
import { HttpExceptionFilter } from './filter/http-exception.filter';
import { config } from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(config), // NestJS에는 mysql을 연결하는 두 가지 방법이 있음. ormconfig.ts 파일을 따로 만들어서 DB 설정해줌.
    BoardModule
  ],
  controllers: [],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ],
})
export class AppModule {}
