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
      throw new UnauthorizedException('Invalid phoneNumber');
    }
  
    // Log the entered password and the stored hashed password for debugging purposes
    console.log("Entered Password:", password);
    console.log("Stored Hash:", usr.password);
  
    // Compare the entered plain password with the stored hash using bcrypt.compare
    const isPasswordValid = await bcrypt.compare(password, usr.password);
    
    // Log the result of bcrypt.compare to see if the password is valid
    console.log("Is Password Valid?", isPasswordValid);
  
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }
  
    const payload = {
      id: usr.id,
      phoneNumber: usr.phoneNumber,
      role: usr.role,
    };
  
    const token =  this.jwtService.sign(payload, {
      expiresIn: '60d',
    });
  
    return { phoneNumber: usr.phoneNumber, access_token: token };
  }
  
}
