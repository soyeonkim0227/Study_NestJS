import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BoardModule } from 'src/board/board.module';
import { UserModule } from 'src/user/user.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import connectionOptions from './ormconfig';

@Module({
  imports: [TypeOrmModule.forRoot(connectionOptions), BoardModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
