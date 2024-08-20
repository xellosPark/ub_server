// src/auth/auth.entity.ts
import { Entity, PrimaryGeneratedColumn, Column, Unique, BaseEntity } from 'typeorm';

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
}