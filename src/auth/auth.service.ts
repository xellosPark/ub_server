// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { Auth } from './auth.entity';

@Injectable()
export class AuthService {
  constructor(private readonly authRepository: AuthRepository) {}

  // 새로운 사용자 생성
  async createUser(username: string, password: string): Promise<Auth> {
    return this.authRepository.createUser(username, password);
  }

  // 모든 사용자 가져오기
  async findAllUsers(): Promise<Auth[]> {
    return this.authRepository.findAllUsers();
  }

  // ID로 사용자 찾기
  async findUserById(id: number): Promise<Auth> {
    return this.authRepository.findUserById(id);
  }

  // 사용자 삭제
  async deleteUser(id: number): Promise<void> {
    await this.authRepository.deleteUser(id);
  }
}
