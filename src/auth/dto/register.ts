import { IsString,IsPhoneNumber, IsInt } from "class-validator";
export class RegisterDto {
    @IsInt()
    phoneNumber: number;

    @IsString()
    password:string;

    @IsString()
    role  : string;
}
