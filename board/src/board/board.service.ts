import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/createBoard.dto';
import { Board } from './entity/board.entity';

@Injectable()
export class BoardService {
    constructor(
        @InjectRepository(Board) private boardEntity: Repository<Board>,
    ) {}

    /**
     * 
     * @param boardDto 
     * 
     * 게시글 생성
     */
    async createBoard(boardDto: CreateBoardDto) {
        const { title, content } = boardDto;

        return await this.boardEntity.save({
            title,
            content,
            createdAt: new Date(),
            updatedAt: new Date()
        });
    }

    /**
     * 
     * @param boardId 
     * 
     * 게시글 단일 조회
     */
    async getOneBoard(boardId: number): Promise<object> {
        const thisBoard = await this.boardEntity.findOneBy({ id: boardId });
        if (!thisBoard) throw new NotFoundException('존재하지 않는 게시글');
        return thisBoard;
    }

        /**
     * 
     * @param boardId 
     * 
     * 게시글 목록 조회
     */
}
