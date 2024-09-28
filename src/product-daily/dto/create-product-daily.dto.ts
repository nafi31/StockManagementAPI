import { IsNotEmpty, IsNumber, IsInt, IsDate, Min } from 'class-validator';

export class CreateProductDailyDto {
  
    @IsNotEmpty()
    @IsNumber()
    
    productId: number;  


    @IsNotEmpty()
    @IsNumber()
    @Min(0)  // Ensure daily amount can't be negative
    amountDaily: number;    


    @IsNotEmpty()
    @IsNumber()
    @Min(0)  // Ensure stock can't be negative
    totalInStock: number;

//    @IsNotEmpty()
//    @IsNumber()
//    @Min(1)
//    shiftManagerId: number;

    @IsNotEmpty()
    @IsInt()  // Expecting a timestamp (number)
    @Min(0)   // Ensure date is valid
    date: number;
}
