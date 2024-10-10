import {
  Injectable,
  UnauthorizedException,
  ConflictException,
} from '@nestjs/common';
import { RegisterDto } from './dto/register';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtPayload } from 'src/core/Jservice';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private readonly userRepo: Repository<User>,
    private readonly jwtService: JwtService,
  ) {}

  async findUserById(jwtPayload: JwtPayload): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { id: jwtPayload.id } });
  }

  async validateUser(payload: JwtPayload): Promise<User | undefined> {
    return this.userRepo.findOne({ where: { id: payload.id } });
  }

  async create(createUser: RegisterDto) {
    const { phoneNumber, password, role } = createUser;

    const existingUser = await this.userRepo.findOne({ where: { phoneNumber } });
    if (existingUser) {
      throw new ConflictException('Phone number already exists');
    }


    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepo.create({
      phoneNumber,
      password: hashedPassword,
      role,
    });

    return this.userRepo.save(newUser);
  }

  async login(phoneNumber: number, password: string) {
    
    const usr = await this.userRepo.findOne({ where: { phoneNumber } });

    if (!usr) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, usr.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      id: usr.id,
      phoneNumber: usr.phoneNumber,
      role: usr.role,
    };

    const token = await this.jwtService.sign(payload, {
      expiresIn: '60d',
    });

    return { phoneNumber: usr.phoneNumber, access_token: token };
  }
}
