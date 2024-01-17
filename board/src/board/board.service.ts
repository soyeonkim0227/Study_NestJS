import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBoardDto } from './dto/createBoard.dto';
import { Board } from './entity/board.entity';

@Injectable()
export class BoardService {
    constructor(
        // DI(종속성 주입, Dependency Injection)
        @InjectRepository(Board) private boardEntity: Repository<Board>,
    ) {}
    // js는 기본적으로 비동기로 처리되기 때문에 동기로 동작하기 위해 async/await를 사용해줘야 한다. (데이터베이스 작업이 끝난 후 결과 값을 받을 수 있도록 설정)

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
     * @param boardId 
     * 
     * 게시글 목록 조회
     */
    async getAllBoard(): Promise<object> {
        return await this.boardEntity.find({
            order: { createdAt: "ASC" }
        });
    }
}
