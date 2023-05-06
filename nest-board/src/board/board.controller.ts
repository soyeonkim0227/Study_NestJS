import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BoardService } from './board.service';
import { BoardDto } from './dto/board.dto';

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Post()
  async create(@Body() CreateBoardDto: BoardDto) {
    await this.boardService.CreatePost(CreateBoardDto);
    return { status: 201, message: '게시글 작성 성공' };
  }

  @Get()
  async getList() {
    const post = await this.boardService.GetPostList();
    return post;
  }

  @Get(':board_id')
  async getOneList(@Param('board_id') board_id: number) {
    return await this.boardService.GetPost(board_id);
  }

  @Patch(':board_id')
  async editPost(
    @Param('board_id') board_id: number,
    @Body() UpdateBoardDto: BoardDto,
  ) {
    await this.boardService.EditPost(board_id, UpdateBoardDto);
    const post = await this.boardService.GetPost(board_id);
    return { status: 200, message: '게시글 수정 성공', post };
  }

  @Delete(':board_id')
  async deletePost(@Param('board_id') board_id: number) {
    await this.boardService.DeletePost(board_id);
    return { status: 200, message: '게시글 삭제 성공' };
  }
}
