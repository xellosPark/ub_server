// src/auth/auth.entity.ts
import { Board } from "src/boards/board.entity";
import { Entity, PrimaryGeneratedColumn, Column, Unique, BaseEntity, OneToMany } from 'typeorm';

@Entity()
@Unique(['username']) // 이름을 이미 사용 되는 유져 이름을 사용하러 한다면 에러 
//BaseEntity와 같은 상위 클래스를 상속받지 않으면 생성일시, 수정일시, 생성자, 수정자와 같은 필드는 존재하지 않습니다.
export class Auth extends BaseEntity{
  @PrimaryGeneratedColumn()
  id: number; // 자동 증가하는 ID 필드

  @Column()
  username: string; // 사용자 이름

  @Column()
  password: string; // 사용자 비밀번호

  //OneToMany Relationship:(일대다 관계:)
  //User ────▶ 게시글1
  //User ────▶ 게시글2
  //User ────▶ 게시글3

  // Board => Board.user (Board 데이터 가져오기),
  // {eager: true} => true이면 User데이터 가져올때 게시물도 같이 가져오기
  // {eager: false} => false이면 User데이터 가져올때 User정보가만 사용
  // 2. inverseSide (board에서 유저로 접근하려면 board.user로 접근해야함)
  @OneToMany(type => Board, Board => Board.auth, {eager: true})
  boards: Board[]; // 1명이 여러 Data 가져올수 있어 배열로 선언
}