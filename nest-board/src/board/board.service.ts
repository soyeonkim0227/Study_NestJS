import { ForbiddenException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from './board.entity';
import { BoardDto } from './dto/board.dto';

@Injectable()
export class BoardService {
  constructor(
    @InjectRepository(Board)
    private readonly board: Repository<Board>,
  ) {}

  async CreatePost(CreateBoardDto: BoardDto) {
    const board = new Board();

    board.title = CreateBoardDto.title;
    board.content = CreateBoardDto.content;

    const CreatedBoard = await this.board.save(board);
  }

  GetPostList() {
    return this.board.find({
      select: ['title', 'content', 'createDate'],
      order: { createDate: -1 },
    });
  }

  GetPost(board_id: number) {
    return this.board.findOne({ where: { boardId: board_id } });
  }

  async EditPost(board_id: number, EditBoardDto: BoardDto) {
    const Board = await this.board.findOne({
      where: {
        boardId: board_id,
      },
    });
    if (Board !== undefined) {
      return this.board.update(board_id, EditBoardDto);
    } else
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: '작성자가 다름',
        error: 'Forbidden',
      });
  }

  async DeletePost(board_id: number) {
    const Board = await this.board.findOne({
      where: { boardId: board_id },
    });
    if (Board !== undefined) {
      return this.board.delete(board_id);
    } else
      throw new ForbiddenException({
        statusCode: HttpStatus.FORBIDDEN,
        message: '작성자가 다름',
        error: 'Forbidden',
      });
  }
}
