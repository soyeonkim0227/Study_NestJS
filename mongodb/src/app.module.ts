import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BoardModule } from './board/board.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017'),
    BoardModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
