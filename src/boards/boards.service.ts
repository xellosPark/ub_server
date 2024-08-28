// src/boards/boards.service.ts
import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';

@Injectable()
export class BoardsService {
  constructor(private readonly boardRepository: BoardRepository) {}

  // 모든 게시판을 가져오는 서비스 메서드
  async findAllBoards(): Promise<Board[]> {
    return this.boardRepository.findAllBoards();
  }

  // ID로 특정 게시판을 찾는 서비스 메서드
  async findBoardById(id: number): Promise<Board> {
    return this.boardRepository.findOneBoard(id);
  }

  // 새로운 게시판을 생성하는 서비스 메서드
  async createBoard(createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto);
  }

  // 게시판을 업데이트하는 서비스 메서드
  async updateBoard(id: number, createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.updateBoard(id, createBoardDto);
  }

  // 게시판을 삭제하는 서비스 메서드
  async deleteBoard(id: number): Promise<void> {
    await this.boardRepository.deleteBoard(id);
  }
}