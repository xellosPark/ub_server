import { Controller, Get, Post, Param, Body, Req, Delete, ValidationPipe, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './auth.entity';
import { CreateAuthDto } from './dto/create-auth.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body(ValidationPipe) createAuthDto: CreateAuthDto): Promise<void> {
    // console.log('Received createUser request with data:', createAuthDto);
  
    // const { username, password } = createAuthDto;
    // console.log('Extracted username:', username);
    // console.log('Extracted password:', password);
    
    return this.authService.createUser(createAuthDto);
  }

  @Post('/signin')
  async signIn(@Body() createAuthDto: CreateAuthDto): Promise<{ accessToken: string; refreshToken: string }> {
      return this.authService.signIn(createAuthDto);
  }

    // 여기에 refresh-token 엔드포인트를 추가
  // @Post('refresh-token')
  // async refreshToken(@Body('refreshToken') refreshToken: string): Promise<{ accessToken: string }> {
  //   return this.authService.refreshToken(refreshToken);
  // }

  @Get()
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

  @Post('/test')
  @UseGuards(AuthGuard()) // 'jwt'는 Passport 전략의 이름을 나타냅니다.
  test(@Req() req) {
      console.log('req', req); // 인증된 사용자의 정보를 출력
  //    console.log('req', req.user); // 인증된 사용자의 정보를 출력
  }
}