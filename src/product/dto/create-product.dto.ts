import { IsNotEmpty, IsPhoneNumber, IsString, IsArray, IsOptional, IsNumber } from 'class-validator';
export class CreateProductDto {

@IsNotEmpty()
@IsString()
productName : string;

@IsNumber()
@IsNotEmpty()
productInStock : number;


}
