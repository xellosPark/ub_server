// src/auth/auth.controller.ts
import { Controller, Get, Post, Param, Body, Delete } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Auth } from './auth.entity';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/signup')
  async createUser(@Body() createUserDto: { username: string, password: string }): Promise<Auth> {
    console.log('Received createUser request with data:', createUserDto);
  
    const { username, password } = createUserDto;
    console.log('Extracted username:', username);
    console.log('Extracted password:', password);
    
    return this.authService.createUser(createUserDto.username, createUserDto.password);
  }

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
}
