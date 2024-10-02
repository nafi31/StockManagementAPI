import { ApiProperty } from "@nestjs/swagger";
import { isString, IsString } from "class-validator";

export class CreateShiftmanagerDto {
    @IsString()
    @ApiProperty({
        description:'Shift Manager Name',
        required:true
    })
    shiftManager:string;
}
