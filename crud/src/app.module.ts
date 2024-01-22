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
  // providers는 Nest Injector에게 인스턴스화 될 provider 리스트이다.
  // provider는 Nest의 기반이 되는 개념으로 Injecting을 지원한다.
  providers: [
    // 예외 처리를 전역으로 수행하기 위한 코드
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter
    }
  ],
})
export class AppModule {}
