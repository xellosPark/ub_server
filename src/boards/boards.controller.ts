// src/boards/boards.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';

@Controller('boards')
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  @Get()
  async findAllBoards() {
    return this.boardsService.findAllBoards();
  }

  @Get(':id')
  async findBoardById(@Param('id') id: number) {
    return this.boardsService.findBoardById(id);
  }

  @Post()
  // @UsePipes(ValidationPipe)는 NestJS에서 데이터를 유효성 검사하고 변환하는 데 사용되는
  // 파이프를 적용하는 데코레이터입니다. ValidationPipe는 특히 DTO(Data Transfer Object)
  // 클래스와 함께 사용되어, 클라이언트에서 전송된 데이터가 예상한 형식과 규칙을 따르는지 검증하는
  // 데 도움을 줍니다.
  @UsePipes(ValidationPipe) // 유효성 검사 파이프 추가
  async createBoard(@Body() createBoardDto: CreateBoardDto) {
    const { title, description, isPublic } = createBoardDto;
    return this.boardsService.createBoard(title, description, isPublic);
  }

  @Patch(':id')
  async updateBoard(@Param('id') id: number, @Body() createBoardDto: CreateBoardDto) {
    const { title, description, isPublic } = createBoardDto;
    return this.boardsService.updateBoard(id, title, description, isPublic);
  }

  @Delete(':id')
  async deleteBoard(@Param('id') id: number) {
    return this.boardsService.deleteBoard(id);
  }
}