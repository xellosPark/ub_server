// src/boards/boards.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Board } from './board.entity';
import { BoardRepository } from './board.repository';
import { BoardsService } from './boards.service';
import { BoardsController } from './boards.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  controllers: [BoardsController],
  providers: [BoardRepository, BoardsService], // BoardRepository를 제공자로 추가
  exports: [BoardsService],
})
export class BoardsModule {}