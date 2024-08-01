// src/auth/auth.repository.ts
import { ConflictException, Injectable, InternalServerErrorException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Auth } from './auth.entity';

@Injectable()
export class AuthRepository {
  private authRepository: Repository<Auth>;

  constructor(private readonly dataSource: DataSource) {
    this.authRepository = this.dataSource.getRepository(Auth);
  }

  // 사용자 생성 메서드
  async createUser(username: string, password: string): Promise<Auth> {
    const user = this.authRepository.create({ username, password });
    try {
      await this.authRepository.save(user);
    } catch (error) {
      // 에러 코드가 23505인 경우, 중복된 사용자 이름으로 인한 충돌 발생
      if (error.code === '23505') {
        throw new ConflictException('이미 존재하는 사용자 이름입니다.'); // ConflictException 발생
      } else {
        throw new InternalServerErrorException(); // 다른 오류 발생 시 InternalServerErrorException 발생
      }
    }
    return user;
  }

  // 모든 사용자 가져오기 메서드
  async findAllUsers(): Promise<Auth[]> {
    return this.authRepository.find();
  }

  // ID로 사용자 찾기 메서드
  async findUserById(id: number): Promise<Auth> {
    return this.authRepository.findOneBy({ id });
  }

  // 사용자 삭제 메서드
  async deleteUser(id: number): Promise<void> {
    await this.authRepository.delete(id);
  }
}
