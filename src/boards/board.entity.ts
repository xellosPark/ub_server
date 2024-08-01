// src/boards/board.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Board {
  @PrimaryGeneratedColumn()
  id: number; // 게시판 ID

  @Column()
  title: string; // 게시판 제목

  @Column()
  description: string; // 게시판 설명

  @Column({ default: true })
  isPublic: boolean; // 공개 여부, 기본값은 true
}