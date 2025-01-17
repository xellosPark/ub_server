
// 해당 코드에서 import { Repository } from 'typeorm'; 및 import { User } from './user.entity';가 중요한 이유는 JwtStrategy가 NestJS와 TypeORM을 사용하여 JWT 토큰에 포함된 사용자 정보를 검증하기 위해 데이터베이스와 상호작용해야 하기 때문입니다.

// 전체 코드 로직 설명
// 1. JWT 전략(JwtStrategy) 설정
// NestJS에서 JWT 전략은 PassportStrategy를 확장하여 구현됩니다. 이 전략은 passport-jwt 라이브러리를 사용하여 JWT 토큰을 검증하고 사용자 정보를 확인합니다.

// 2. TypeORM을 사용한 사용자 데이터베이스 조회
// 해당 전략에서는 JWT의 페이로드에 포함된 사용자 정보를 바탕으로 데이터베이스에서 사용자를 조회합니다. 여기서 TypeORM 리포지토리가 필요합니다.
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Auth } from './auth.entity'
import { Repository } from 'typeorm';
import * as config from 'config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {   //Strategy passport-jwt 사용하기 위해 jwt 전력 사용해서 사용
  constructor( 
    @InjectRepository(Auth)
     //Repository<User>: TypeORM에서 리포지토리는 데이터베이스에서 특정 엔티티(여기서는 User)와 관련된 데이터 작업을 수행합니다.
    //즉, 데이터베이스의 users 테이블에 대한 CRUD 작업(생성, 조회, 수정, 삭제)을 관리합니다.
    private userRepository: Repository<Auth>, // User 엔티티에 대한 TypeORM 리포지토리 주입
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Authorization Bearer Token 헤더에서 JWT 추출 (어디서 가져올지)
      //ignoreExpiration: false, // 토큰의 유효기간을 무시하지 않음
      //secretOrKey: 'Secret1234', // JWT 서명 비밀 키 (auth.module.ts와 일치해야 함)
      secretOrKey: process.env.JWT_SECRET || config.get('jwt.secret')
    });
  }

  // JWT 토큰의 페이로드를 검증하는 메서드
  async validate(payload: any) {
    const { username } = payload;
    // 사용자 이름으로 사용자 찾기
    const user = await this.userRepository.findOne({ where: { username } });

    if (!user) {
      // 사용자가 없으면 UnauthorizedException 예외 발생
      throw new UnauthorizedException('사용자를 찾을 수 없습니다.');
    }
    // 사용자 객체를 요청 객체에 첨부
    return user;
  }
}

// 코드 흐름:
// JWT 토큰으로부터 페이로드 추출:

// jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken()는 요청 헤더에서 JWT 토큰을 추출합니다.
// 토큰 검증:

// secretOrKey: 'Secret1234'를 사용해 JWT 토큰이 서명된 비밀 키로 유효성을 검사합니다.
// 사용자 검증:

// validate(payload: any) 메서드는 토큰의 페이로드를 기반으로 사용자를 검증합니다. 이 메서드는 실제로 인증된 사용자 정보를 반환하거나, 인증에 실패한 경우 예외를 던집니다.
// 데이터베이스에서 사용자 조회:

// const user = await this.userRepository.findOne({ where: { username } });는 TypeORM 리포지토리를 사용해 데이터베이스에서 사용자를 조회합니다. 만약 해당 사용자가 없다면, UnauthorizedException이 발생합니다.
// 사용자 반환:

// 유효한 사용자가 발견되면 해당 사용자 객체를 반환하여, 요청에서 인증된 사용자 정보로 사용됩니다.
// 정리:
// Repository<User>는 데이터베이스에서 사용자 정보를 조회하기 위해 사용됩니다.
// User 엔티티는 데이터베이스와 직접 매핑된 객체로, 사용자 데이터가 정의되어 있습니다.
// 이 코드 구조는 JWT 토큰의 페이로드를 검증하고, 데이터베이스에서 해당 사용자를 확인하는 데 필수적입니다.