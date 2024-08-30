import { Controller, Get, Post, Param, Body, /*Req,*/ Delete, ValidationPipe, UseGuards, Headers, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './auth.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  async createUser(@Body(ValidationPipe) createAuthDto: CreateAuthDto): Promise<void> {
    // console.log('Received createUser request with data:', createAuthDto);
  
    const { username, password } = createAuthDto;
    console.log('Extracted username:', username);
    console.log('Extracted password:', password);
    
    return this.authService.createUser(createAuthDto);
  }

  @Post('signin')
  async signIn(@Body() createAuthDto: CreateAuthDto): Promise<{ accessToken: string; refreshToken: string }> {
      return this.authService.signIn(createAuthDto);
  }

  // 여기에 refresh-token 엔드포인트를 추가
  // @Post('refresh-token')
  // async refreshToken(@Body('refreshToken') refreshToken: string): Promise<{ accessToken: string }> {
  //    console.log('Received refreshToken:', refreshToken); // 콘솔 로그 추가
  //    return this.authService.refreshToken(refreshToken);
  // }

  @Post('refresh-token')
  async refreshToken(@Headers('authorization') authHeader: string): Promise<{ accessToken: string }> {
    // 1. Authorization 헤더가 있는지 확인
    console.log('헤더가 있는지 확인:', authHeader);
      if (!authHeader) {
      throw new BadRequestException('Authorization header is missing');
    }

    // 2. Bearer 토큰 형식이 맞는지 확인
    if (!authHeader.startsWith('Bearer ')) {
      console.log('Invalid Authorization Header Format:', authHeader);
      throw new BadRequestException('Invalid authorization header format');
    }

    // 3. Bearer 문자열을 제거하고 JWT만 추출
    const refreshToken = authHeader.replace('Bearer ', '').trim();
    console.log('Extracted JWT (refreshToken):', refreshToken);

    // 4. JWT를 사용해 새로운 액세스 토큰을 발급
    return this.authService.refreshToken(refreshToken);
  }

  @Get()
  //@UseGuards(AuthGuard('jwt')) // 여기에 'jwt' Passport 전략을 사용하여 토큰이 있는지 확인합니다.
  async findAllUsers(): Promise<Auth[]> {
    return this.authService.findAllUsers();
  }

  @Get(':id')
  async findUserById(@Param('id') id: number): Promise<Auth> {
    return this.authService.findUserById(id);
  }

  @Delete(':id')
  async deleteUser(@Param('id') id: number): Promise<void> {
    return this.authService.deleteUser(id);
  }

  // ** 요청안에 유저 정보(유저 객처)가 들어가게 하는 방법
  // validate 메소드에서 return 값을 user 객체로 주었습니다. 그래서 요청 값안에 user 객처가 들어있으면 하는데
  // 현재 요청을 보낼때는 user 객체가 없습니다. 어떠한 방식으로 가질수있을나요 
  // UseGuards 안에  @nestjs/passport에서 가져온 AuthGuard()를 이용하면 요청한에 유저 정보를 넣어줄수 있습니다.
  // Guards 가드는 인즈 미들웨어입니다. 지정된 경로로 통과할 수 있는 사람과 허용되지 않는 사람을 서버에 알려줍니다.

  // @Post('/test')
  // @UseGuards(AuthGuard()) // 'jwt'는 Passport 전략의 이름을 나타냅니다. // Use 정보를 가져올수 있다.
  // test(@Req() req) { // async validate(payload: any) { 값으로 리턴을 받는다.
  //   //console.log('req', req);    // 인증된 사용자의 정보를 출력
  //   console.log('req', req.user); // 인증된 사용자의 정보를 출력
  // }

  @Post('/test')
  @UseGuards(AuthGuard()) // 'jwt'는 Passport 전략의 이름을 나타냅니다. // Use 정보를 가져올수 있다.
  test(@GetUser() user: Auth) {
    console.log('user', user);
  }
}