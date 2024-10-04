import { IsNotEmpty, IsString, IsNumber,IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateProductDto {
    @IsNotEmpty()
    @IsString()
    @ApiProperty({
        description:'The Products Name',
        required:true
    })
    productName: string;
 
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @ApiProperty({
        description:'Total Amount in stock',
        required:true
    })
    productInStock: number; // Can be auto-calculated based on productMade or product sold  


    
}
