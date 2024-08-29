// src/boards/board.entity.ts
import { Auth } from 'src/auth/auth.entity';
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity,ManyToOne } from 'typeorm';

@Entity()
//BaseEntity와 같은 상위 클래스를 상속받지 않으면 생성일시, 수정일시, 생성자, 수정자와 같은 필드는 존재하지 않습니다.
export class Board extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number; // 게시판 ID

  @Column()
  title: string; // 게시판 제목

  @Column()
  description: string; // 게시판 설명

  @Column({ default: true })
  isPublic: boolean; // 공개 여부, 기본값은 true

  // User <- > boadr 연결 완료
  @ManyToOne(type => Auth, auth => auth.boards, { eager: false})
  auth: Auth;
}