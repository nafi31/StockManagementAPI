import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
export class CreateProductvariantDto {
    @IsNotEmpty()
    @IsString()
    variantName: string;

}
