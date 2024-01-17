import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/createBoard.dto';

@Controller('board')
export class BoardController {
    constructor(
        private boardService: BoardService
    ) {}

    @Post()
    async createBoard(@Body() boardDto: CreateBoardDto) {
        await this.boardService.createBoard(boardDto);

        return {
            status: 201,
            message: '게시글 작성 성공'
        };
    }

    @Get('/:boardId')
    async getOneBoard(@Param('boardId') boardId: number): Promise<object> {
        const data = await this.boardService.getOneBoard(boardId);

        return {
            data,
            status: 200,
            message: '게시글 단일 조회 성공'
        }
    }
}
