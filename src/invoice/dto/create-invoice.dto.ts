import { IsNotEmpty, IsNumber, IsInt,IsDateString, Min, IsString, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInvoiceDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'Client Id for the order',
    required: true,
  })
  clientId: number;

  

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: 'The product id for the order',
    required: true,
  })
  productId: number;



  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    description: 'Amount in Kilogram',
    required: true,
  })
  amountInKg: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    description: 'Price per Bag',
    required: true,
  })
  pricePerItem: number;

  @IsNotEmpty()
  @IsNumber()
  @Min(1)
  @ApiProperty({
    description: 'Total Price',
    required: true,
  })
  totalPrice: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty({
    description: 'Additional remarks',
    required: true,
  })
  remark: string;

  
}