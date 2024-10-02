import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateProductvariantDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description:'Variant Name',
        required:true
    })
    variantName: string;

}
