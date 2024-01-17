import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/createBoard.dto';
import { UpdateBoardDto } from './dto/updateBoard.dto';
import { Board } from './entity/board.entity';

@Injectable()
export class BoardService {
    constructor(
        // DI(종속성 주입, Dependency Injection)
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
     * 게시글 상세 조회
     */
    async getOneBoard(boardId: number): Promise<object> {
        const thisBoard = await this.boardEntity.findOneBy({ id: boardId });
        if (!thisBoard) throw new NotFoundException('존재하지 않는 게시글');
        return thisBoard;
    }

    /**
     * 
     * 
     * 
     * 게시글 목록 조회
     */
    async getAllBoard(): Promise<object> {
        return await this.boardEntity.find({
            order: { createdAt: "ASC" }
        });
    }

    /**
     * 
     * @param boardId 
     * @param boardDto
     * 
     * 게시글 수정
     */
    async updateBoard(boardId: number, boardDto: UpdateBoardDto) {
        const { title, content } = boardDto;

        const thisBoard = await this.boardEntity.findOneBy({ id: boardId });
        if (!thisBoard) throw new NotFoundException('존재하지 않는 게시글');

        return await this.boardEntity.update(boardId, {
           title,
           content 
        });
    }

    /**
     * 
     * @param boardId 
     * 
     * 게시글 삭제
     */
    async deleteBoard(boardId: number) {
        const thisBoard = await this.boardEntity.findOneBy({ id: boardId });
        if (!thisBoard) throw new NotFoundException('존재하지 않는 게시글');

        return await this.boardEntity.delete(boardId);
    }
}
