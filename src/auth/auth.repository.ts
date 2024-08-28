// src/auth/auth.repository.ts
import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Auth } from './auth.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthRepository {
  private authRepository: Repository<Auth>;

  constructor(
    private readonly dataSource: DataSource,
    private readonly jwtService: JwtService, // JwtService 주입
  ) {
    this.authRepository = this.dataSource.getRepository(Auth);
  }

  // 사용자 생성 메서드
  async createUser(createAuthDto: CreateAuthDto): Promise<void> {
    const { username, password } = createAuthDto;

    //console.log('AuthRepository username:', username);
    //console.log('AuthRepository password:', password);

    //const user = this.authRepository.create({ username, password });

     // 생성된 사용자 객체를 로그로 출력
    //console.log('Created user:', user);

    // bcrypt 이용하여 비밀번호 숨기기
    // 솔트
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = this.authRepository.create({ username, password: hashedPassword });

    try {
      await this.authRepository.save(user);
    } catch (error) {
      console.log('Error:', error);
       // MySQL의 중복 키 오류를 처리
       //  if (error.code === '23505') { // 23505는 중복 키 오류를 나타냄 [postgres]에서 사용 예제
      if (error.code === 'ER_DUP_ENTRY') {
        throw new ConflictException('이미 존재하는 사용자 이름입니다.'); // ConflictException 발생
      } else {
        throw new InternalServerErrorException(); // 다른 오류 발생 시 InternalServerErrorException 발생
      }
    }
  }

   // Login 확인 로그인 확인 및 JWT 토큰 생성
  async signIn(createAuthDto: CreateAuthDto): Promise<{ accessToken: string; refreshToken: string }> {
    
    const { username, password } = createAuthDto;
    // 입력받은 사용자 이름과 비밀번호를 콘솔에 출력
    // console.log('signIn username0:', username);
    // console.log('signIn password0:', password);

    const user = await this.authRepository.findOne({ where: { username } });
    // 콘솔 로그 추가
    console.log('Attempting login for user:', username);

    if (user && (await bcrypt.compare(password, user.password))) {
      // 유저 토큰 생성 ( Secret + Payload )

      //const Payload = { username };
      // const accessToken = await this.jwtService.sign(Payload);

      // 콘솔 로그 추가
      //console.log('accessToken login for user:', accessToken);

      //return { accessToken };
      //return 'login success'

      // 유저 토큰 생성 (Access Token과 Refresh Token)
      const payload = { username: user.username, sub: user.id };
      const accessToken  = this.jwtService.sign(payload, { expiresIn: '2m'  }); // Access Token 생성 (2분 유효)
      const refreshToken = this.jwtService.sign(payload, { expiresIn: '5m'  }); // Refresh Token 생성 (3시간 유효)

      // 콘솔 로그 추가
      console.log('Access  Token:', accessToken);
      console.log('Refresh Token:', refreshToken);

      return {
        accessToken: accessToken,
        refreshToken: refreshToken,
      };

    } else {
        throw new UnauthorizedException('Login failed');
    }
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

  // 리프레시 토큰으로 액세스 토큰 재발급
  async refreshToken(refreshToken: string): Promise<{ accessToken: string }> {
    try {
      // 리프레시 토큰 검증
      console.log('Verifying Refresh Token:', refreshToken);
      const payload = this.jwtService.verify(refreshToken, { secret: 'Secret1234' }); // 리프레시 토큰 검증
      console.log('Verified Payload:', payload);

      // 사용자 조회
      const user = await this.authRepository.findOne({ where: { username: payload.username } });
      console.log('Found User:', user);

      if (!user) {
        console.log('User not found, throwing UnauthorizedException');
        throw new UnauthorizedException('Invalid refresh token');
      }

       // 새로운 액세스 토큰 발급
      const newAccessToken = this.jwtService.sign(
        { username: user.username, sub: user.id },
        { secret: 'Secret1234', expiresIn: '2m' }, // 새로운 액세스 토큰 발급
      );

      return { accessToken: newAccessToken };
    } catch (error) {
      // 검증 실패 시 로그와 예외 처리
      console.log('Failed to verify refresh token:', error.message);
      throw new UnauthorizedException('Invalid refresh token');
    }
  }
}
