// src/boards/boards.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [TypeOrmModule.forFeature([Board]), // Board 엔티티를 등록하여 리포지토리 사용 가능
  //유저에게 게시물 접근 권한 주기
  //1. 인증에 관한 모듈을 board 모듈에서 쓸 수 있어야 하기에 board module에서 인증 모듈 imports 해오기
  //(이렇게 되면 AuthModule에서 export 하는 어떠한 것이든 board Module에서 사용 가능하게 됩니다.)
  AuthModule
],
  controllers: [BoardsController],
  providers: [BoardRepository, BoardsService], // BoardRepository를 제공자로 추가
  exports: [BoardsService],
})
export class BoardsModule {}