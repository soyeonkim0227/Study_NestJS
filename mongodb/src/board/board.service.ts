import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { BoardDto } from './dto/updateBoard.dto';
import { Board, BoardDocument } from './schema/board.schema';

@Injectable()
export class BoardService {
  constructor(
    @InjectModel(Board.name) private boardModel: Model<BoardDocument>,
  ) {}

  async createBoard(dto: BoardDto) {
    // const thisBoard = new this.boardModel(dto);
    // return await thisBoard.save();
    return await this.boardModel.create(dto);
  }

  async findOneBoard(id: number): Promise<Board> {
    return await this.boardModel.findById(id);
  }

  async findAllBoard(): Promise<Board[]> {
    return await this.boardModel.find();
  }

  async updateBoard(id: number, dto: BoardDto): Promise<Board> {
    return await this.boardModel.findByIdAndUpdate(id, dto);
  }

  async deleteBoard(id: number) {
    return await this.boardModel.findByIdAndDelete(id);
  }
}
