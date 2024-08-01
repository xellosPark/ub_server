// src/auth/auth.entity.ts
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Auth {
  @PrimaryGeneratedColumn()
  id: number; // 자동 증가하는 ID 필드

  @Column()
  username: string; // 사용자 이름

  @Column()
  password: string; // 사용자 비밀번호
}