// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Auth } from './auth.entity';
import { AuthRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt'; // JwtStrategy 추가
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Module({
  imports: [
    TypeOrmModule.forFeature([Auth]), // TypeORM을 사용해 Auth 엔티티를 연결
    PassportModule.register({ defaultStrategy: 'jwt' }), // JWT 기본 전략 설정 // Passport 모듈 추가
    JwtModule.register({
      secret: process.env.JWT_SECRET || jwtConfig.secret, // JWT 서명에 사용될 비밀 키 (환경 변수로 설정 권장)
      signOptions: {
        expiresIn: jwtConfig.expiresIn, // Access Token 유효 기간 설정 (짧은 시간)2m 2분 1h 1시간
      },
    }),
  ],
  controllers: [AuthController],
  //jwtstrategy를 이 Auth 모듈에서 사용할수있게 등록
  providers: [AuthService, AuthRepository, JwtStrategy],
  //JwtStrategy, PassportModule를 다른 모듈에서 사용할수 있게 등록
  exports: [JwtStrategy, PassportModule],
})
export class AuthModule {}
