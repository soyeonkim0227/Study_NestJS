import { Body, Controller, Delete, Get, Patch, Post, Query } from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardDto } from './dto/updateBoard.dto';
import { Board } from './schema/board.schema';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async createBoard(@Body() dto: BoardDto) {
    return await this.boardService.createBoard(dto);
  }

  @Get('one')
  async findOneBoard(@Query('id') id: number): Promise<Board> {
    return await this.boardService.findOneBoard(id);
  }

  @Get('all')
  async findAllBoard(): Promise<Board[]> {
    return await this.boardService.findAllBoard();
  }

  @Patch()
  async updateBoard(
    @Query('id') id: number,
    @Body() dto: BoardDto,
  ): Promise<Board> {
    return await this.boardService.updateBoard(id, dto);
  }

  @Delete()
  async deleteBoard(@Query('id') id: number) {
    return await this.boardService.deleteBoard(id);
  }
}
