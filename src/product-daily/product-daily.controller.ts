import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductDailyService } from './product-daily.service';
import { CreateProductDailyDto } from './dto/create-product-daily.dto';
import { UpdateProductDailyDto } from './dto/update-product-daily.dto';
import { SetMetadata } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/core/guards';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('product-daily')
export class ProductDailyController {
  constructor(private readonly productDailyService: ProductDailyService) {}
  @SetMetadata('roles', ['Admin'])
  @Post()
  create(@Body() createProductDailyDto: CreateProductDailyDto) {
    return this.productDailyService.create(createProductDailyDto);
  }


  @SetMetadata('roles', ['Admin'])
  @Get()
  findAll() {
    return this.productDailyService.findAll();
  }


@SetMetadata('roles', ['Admin'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productDailyService.findOne(+id);
  }

  
@SetMetadata('roles', ['Admin'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productDailyService.remove(+id);
  }
}
