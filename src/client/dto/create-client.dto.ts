import { IsNumber, IsString, isNotEmpty,Min } from "class-validator";
import { ApiProperty } from "@nestjs/swagger";
export class CreateClientDto {

    
    @IsString()
    @ApiProperty({
        description:'Clients name',
        required:true
    })
    clientName: string;

    @IsNumber()
    @Min(0)
    @ApiProperty({
        description:'debt amount',
        required: true
    })
    debtAmount:number;

    @IsNumber()
    @ApiProperty({
        description:'debt amount',
        required: true
    })
    debtPaid:number;

}
