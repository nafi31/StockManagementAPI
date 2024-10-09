import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { User } from 'src/users/entities/user.entity';
import { PassportModule } from '@nestjs/passport';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from '../core/jwt-strategy';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'), // Use ConfigService to get the secret
        expiresIn: '1d',
      }),
      inject: [ConfigService],
    }),
    PassportModule,
    HttpModule,
    ConfigModule.forRoot(),
  ],
  controllers: [AuthController], // Remove JwtStrategy from controllers
  providers: [AuthService, JwtStrategy], // Include JwtStrategy here
})
export class AuthModule {}
