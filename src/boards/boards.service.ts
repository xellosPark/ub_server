// src/boards/boards.service.ts
import { Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { Board } from './board.entity';
import { CreateBoardDto } from './dto/create-board.dto';
import { Auth } from 'src/auth/auth.entity';

@Injectable()

export class BoardsService {
  constructor(private readonly boardRepository: BoardRepository) {}

  // // 모든 게시판을 가져오는 서비스 메서드
  async findAllBoards(): Promise<Board[]> {
    return this.boardRepository.findAllBoards();
  }

  // 모든 게시판을 가져오는 이후에 해당 아이디만 가져오기
  async findAllBoardsID(auth:Auth): Promise<Board[]> {
    return this.boardRepository.findAllBoardsID(auth);
  }

  // ID로 특정 게시판을 찾는 서비스 메서드
  async findBoardById(id: number): Promise<Board> {
    return this.boardRepository.findOneBoard(id);
  }

  // ID로 특정 모든데이터 가져오기
  async findBoardByIdAll(id: number): Promise<Board[]> {
    return this.boardRepository.findOneBoardAll(id);
  }

  // 새로운 게시판을 생성하는 서비스 메서드
  async createBoard(createBoardDto: CreateBoardDto, auth:Auth): Promise<Board> {
    return this.boardRepository.createBoard(createBoardDto,auth);
  }

  // 게시판을 업데이트하는 서비스 메서드
  async updateBoard(id: number, createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardRepository.updateBoard(id, createBoardDto);
  }

  // 게시판을 삭제하는 서비스 메서드
  async deleteBoard(id: number): Promise<void> {
    await this.boardRepository.deleteBoard(id);
  }

  // 해당 유저에게 게시판을 삭제하는 서비스 메서드
  async deleteBoardtoAuth(id: number, auth:Auth): Promise<void> {
    await this.boardRepository.deleteBoardtoAuth(id,auth);
  }

}