import { IsNotEmpty, IsString, IsNumber,IsOptional, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateProductDto {
    @IsNotEmpty()
    @IsOptional()
    @IsNumber()
    @ApiProperty({
        description:'The variants id',
        required:true
    })
    variantId: number;  // To associate the product with a product variant
    
 
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @ApiProperty({
        description:'Total Amount in stock',
        required:true
    })
    productInStock: number; // Can be auto-calculated based on productMade or product sold  


    
}
