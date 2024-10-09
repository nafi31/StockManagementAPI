import { Controller, Get, Post, Body, Patch, Param, Delete,Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { loginDto } from './dto/login-dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { RegisterDto } from './dto/register';
import { get } from 'http';
import { JwtPayload } from 'src/core/Jservice';
import { UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { SetMetadata } from '@nestjs/common';
import { RolesGuard } from 'src/core/guards';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  Register(@Body() createUser: RegisterDto) {
    return this.authService.create(createUser);
  }

  @Post('login')
  Login(@Body() loginDto) {
    
    return this.authService.login(loginDto.phoneNumber,loginDto.password);
  }
  @UseGuards(AuthGuard('jwt'),RolesGuard)
  @SetMetadata('roles',['Admin'])
  @Get('user')
  async getUser(@Request() req) {
    const user: JwtPayload = req.user; // Access the user object from the request
    return await this.authService.validateUser(user); 
  }
}