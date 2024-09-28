import { IsNotEmpty, IsString, IsNumber,IsOptional, Min } from 'class-validator';

export class CreateProductDto {
    @IsNotEmpty()
    @IsOptional()
    @IsNumber()
    variantId: number;  // To associate the product with a product variant
    
    @IsNotEmpty()
    @IsNumber()
    productMade: number;  
    
    
    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    productInStock: number; // Can be auto-calculated based on productMade or product sold  


    
}
