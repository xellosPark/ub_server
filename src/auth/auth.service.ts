// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { AuthRepository } from './auth.repository';
import { Auth } from './auth.entity';
import { CreateAuthDto } from './dto/create-auth.dto';


@Injectable()
export class AuthService {
  constructor(
    private readonly authRepository: AuthRepository,
  ) {}

  // 새로운 사용자 생성
  async createUser(createAuthDto: CreateAuthDto): Promise<void> {
    return this.authRepository.createUser(createAuthDto);
  }

   // Login 확인
  async signIn(createAuthDto: CreateAuthDto): Promise<{ accessToken: string; refreshToken: string }> {
    return this.authRepository.signIn(createAuthDto);
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

  // 리프레시 토큰으로 액세스 토큰 재발급
  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    return this.authRepository.refreshToken(refreshToken);
  }
}
