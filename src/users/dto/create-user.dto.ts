import { IsString,IsPhoneNumber } from "class-validator";
export class CreateUserDto {
    @IsPhoneNumber(null,{message:"Invalid phone number"})
    phoneNumber: number;

    @IsString()
    password:string;

    @IsString()
    role  : string;
}
