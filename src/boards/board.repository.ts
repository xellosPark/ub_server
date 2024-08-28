// src/boards/board.repository.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardRepository {
  private boardRepository: Repository<Board>;

  constructor(private readonly dataSource: DataSource) {
    this.boardRepository = this.dataSource.getRepository(Board);
  }

  // 게시판을 생성하는 메서드
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    // DB 사용 안할경우에는 ID는 어떻게 처리 -> uuid 모듈 사용 id: uuid() import { v1 as uuid } from 'uuid'
    // const board = this.boardRepository.create({I, title, description, isPublic }); 
    const { title, description, isPublic } = createBoardDto;

    // 콘솔 로그 추가: DTO에서 추출한 데이터와 사용자 정보 출력
    console.log('Title:', title);
    console.log('Description:', description);
    console.log('Public:', isPublic);

    const board = this.boardRepository.create({ title, description, isPublic });
    await this.boardRepository.save(board);
    return board;
  }

  // 모든 게시판을 가져오는 메서드
  //http://localhost:4050/boards/
  async findAllBoards(): Promise<Board[]> {
    return this.boardRepository.find();
  }

  // ID를 사용하여 특정 게시판을 찾는 메서드
  //http://localhost:4050/boards/1
  async findOneBoard(id: number): Promise<Board> {
    console.log(`Finding board with id: ${id}`); // 전달된 ID 값 로깅
    const board = await this.boardRepository.findOneBy({ id });
    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }
    return board;
  }

  // 게시판을 업데이트하는 메서드
  async updateBoard(id: number, createBoardDto: CreateBoardDto): Promise<Board> {
    const { title, description, isPublic } = createBoardDto;
    const board = await this.boardRepository.findOneBy({ id });
    if (!board) {
      throw new Error('Board not found');
    }
    board.title = title;
    board.description = description;
    board.isPublic = isPublic;
    await this.boardRepository.save(board);
    return board;
  }

  // 게시판을 삭제하는 메서드
  async deleteBoard(id: number): Promise<void> {
    //await this.boardRepository.delete(id);
    const result = await this.boardRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }
  }
}
