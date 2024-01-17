import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { BoardService } from './board.service';
import { CreateBoardDto } from './dto/createBoard.dto';
import { UpdateBoardDto } from './dto/updateBoard.dto';

@Controller('board')
export class BoardController {
    constructor(
        private boardService: BoardService
    ) {}
    // js는 기본적으로 비동기로 처리되기 때문에 동기로 동작하기 위해 async/await를 사용해줘야 한다. (데이터베이스 작업이 끝난 후 결과 값을 받을 수 있도록 설정)

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
            message: '게시글 상세 조회 성공'
        }
    }

    @Get()
    async getAllBoard(): Promise<object> {
        const data = await this.boardService.getAllBoard();

        return {
            data,
            status: 200,
            message: '게시글 목록 조회 성공'
        }
    }

    @Patch('/:boardId')
    async updateBoard(@Param('boardId') boardId: number, @Body() boardDto: UpdateBoardDto) {
        await this.boardService.updateBoard(boardId, boardDto);

        return {
            status: 200,
            message: '게시글 수정 성공'
        }
    }

    @Delete('/:boardId')
    async deleteBoard(@Param('boardId') boardId: number) {
        await this.boardService.deleteBoard(boardId);

        return {
            status: 200,
            message: '게시글 삭제 성공'
        }
    }
}
