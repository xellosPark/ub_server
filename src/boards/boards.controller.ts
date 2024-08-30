// src/boards/boards.controller.ts
import { Controller, Get, Post, Body, Patch, Param, Delete, UsePipes, ValidationPipe,UseGuards } from '@nestjs/common';
import { BoardsService } from './boards.service';
import { CreateBoardDto } from './dto/create-board.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { Auth } from 'src/auth/auth.entity';
import { Board } from './board.entity';
//import { v1 as uuid } from 'uuid';

@Controller('boards')
@UseGuards(AuthGuard()) //미들웨어 작동
export class BoardsController {
  constructor(private readonly boardsService: BoardsService) {}

  // 전체 받아 오기
  @Get('/')
  async findAllBoards() {
    return this.boardsService.findAllBoards();
  }
  
  // query auth id 이용하여 받아오는 방식
  // @Get('/')
  // async findAllBoardsID(@GetUser() auth:Auth) {
  //   return this.boardsService.findAllBoardsID(auth);
  // }

  // @Get('/')
  // async findAllBoards(@Query('id') id?: number) {
  //   if (id) {
  //     return this.boardsService.findBoardById(id);
  //   }
  //   return this.boardsService.findAllBoards();
  // }

  // @Get(':id')
  // async findBoardById(@Param('id') id: number) {
  //   return this.boardsService.findBoardById(id);
  // }

  @Get('/:id')
  async findBoardByIdAll(@Param('id') id: number) {
    return this.boardsService.findBoardByIdAll(id);
  }

  @Post()
  // @UsePipes(ValidationPipe)는 NestJS에서 데이터를 유효성 검사하고 변환하는 데 사용되는
  // 파이프를 적용하는 데코레이터입니다. ValidationPipe는 특히 DTO(Data Transfer Object)
  // 클래스와 함께 사용되어, 클라이언트에서 전송된 데이터가 예상한 형식과 규칙을 따르는지 검증하는
  // 데 도움을 줍니다.
  @UsePipes(ValidationPipe) // 유효성 검사 파이프 추가
  async createBoard(@Body() createBoardDto: CreateBoardDto,
  @GetUser() auth:Auth): Promise <Board> {
    //const { title, description, isPublic } = createBoardDto;

    // 게시물 ID를 위한 유니크한 UUID(버전 1) 생성
    //게시물 ID는 어떻게 처리하나요?
    //ID는 모든 게시물에 유니크 해야합니다. 그래서 만약 데이터베이스에 데이터를 넣어줄 때는 데이터베이스가 알아서 유니크한 값을 줍니다.
    //하지만 현재는 데이터베이스를 안쓰기 때문에 임의로 유니크한 값을 줘야합니다. 
    //이 때 여러 방법을 쓸 수 있지만 uuid 모듈을 이용해서 유니크한 값을 주겠습니다.
    //uuid 모듈 사용하기 위해서 
    //npm install uuid --save 를 이용해서 설치해줍니다.
    //그 후에 uuid 모듈을 사용하기 원하는 곳에서 import 해줍니다.
    //const id = uuid();

    //return this.boardsService.createBoard(title, description, isPublic);
    return this.boardsService.createBoard(createBoardDto, auth);

  }

  @Patch(':id')
  async updateBoard(@Param('id') id: number, @Body() createBoardDto: CreateBoardDto) {
    //const { title, description, isPublic } = createBoardDto;
    return this.boardsService.updateBoard(id, createBoardDto);
  }

  @Delete(':id')
  async deleteBoard(@Param('id') id: number) {
    return this.boardsService.deleteBoard(id);
  }
}