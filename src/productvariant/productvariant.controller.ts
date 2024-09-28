import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductvariantService } from './productvariant.service';
import { CreateProductvariantDto } from './dto/create-productvariant.dto';
import { UpdateProductvariantDto } from './dto/update-productvariant.dto';

@Controller('productvariant')
export class ProductvariantController {
  constructor(private readonly productvariantService: ProductvariantService) {}

  @Post()
  create(@Body() createProductvariantDto: CreateProductvariantDto) {
    return this.productvariantService.create(createProductvariantDto);
  }

  @Get()
  findAll() {
    return this.productvariantService.findAllVariants();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productvariantService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body("variantName") variantName: string) {
    return this.productvariantService.update(+id, variantName);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productvariantService.remove(+id);
  }
}
