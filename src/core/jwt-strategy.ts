import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../auth/auth.service'; // Adjust the path as necessary

import { JwtPayload } from './Jservice';
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // Use a secure key, possibly from an environment variable
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUser(payload);
    return user; // This will be assigned to `request.user`
  }
}
