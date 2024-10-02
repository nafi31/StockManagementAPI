import { IsString, isNotEmpty } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateClientDto {

    @IsString()
    @IsString()
    @ApiProperty({
        description:'Clients name',
        required:true
    })
    clientName: string;
}
