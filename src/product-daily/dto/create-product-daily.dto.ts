import { IsNotEmpty, IsNumber, IsInt, IsDate, Min } from 'class-validator';
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



//    @IsNotEmpty()
//    @IsNumber()
//    @Min(1)
//    shiftManagerId: number;
@ApiProperty({
    description:'Date of creation',
    required:true
})
    @IsNotEmpty()
    @IsInt()  // Expecting a timestamp (number)
    @Min(0)   // Ensure date is valid
    date: number;
}
