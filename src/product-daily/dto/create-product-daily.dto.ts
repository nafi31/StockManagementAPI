import { IsNotEmpty, IsNumber,IsDateString,IsInt, IsDate, Min } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class CreateProductDailyDto {
  
    @IsNotEmpty()
    @IsNumber()
    @ApiProperty({
        description:'The product id of which productDaily is made',
        required:true
    })
    productId: number;  


    @IsNotEmpty()
    @IsNumber()
    @Min(0)
    @ApiProperty({
        description:'Amount mande today',
        required:true
    })  // Ensure daily amount can't be negative
    amountDaily: number;    



   @IsNotEmpty()
   @IsNumber()
   @Min(1)
   @ApiProperty({
    description:'Shift managers id',
    required:true
})
   shiftManagerId: number;

@IsNotEmpty()
  @IsDateString()  // Expecting a timestamp (integer)
  @Min(0)   // Ensure date is valid
  @ApiProperty({
    description: 'Date of creation',
    required: true,
  })
  date: number;
}
