import { IsString, IsInt } from 'class-validator';

export class loginDto {
  @IsInt()
  phoneNumber: number;

  @IsString()
  password: string;
}