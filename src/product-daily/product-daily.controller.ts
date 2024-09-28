import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductDailyService } from './product-daily.service';
import { CreateProductDailyDto } from './dto/create-product-daily.dto';
import { UpdateProductDailyDto } from './dto/update-product-daily.dto';

@Controller('product-daily')
export class ProductDailyController {
  constructor(private readonly productDailyService: ProductDailyService) {}

  @Post()
  create(@Body() createProductDailyDto: CreateProductDailyDto) {
    return this.productDailyService.create(createProductDailyDto);
  }

  @Get()
  findAll() {
    return this.productDailyService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productDailyService.findOne(+id);
  }

  

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productDailyService.remove(+id);
  }
}
