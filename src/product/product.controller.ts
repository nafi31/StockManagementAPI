import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ProductService } from './product.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { SetMetadata } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/core/guards';
import { AuthGuard } from '@nestjs/passport';
@Controller('product')
@UseGuards(AuthGuard('jwt'), RolesGuard)

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @SetMetadata('roles', ['Admin'])
  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productService.create(createProductDto);
  }
  @SetMetadata('roles', ['Admin'])
  @Get()
  findAll() {
    return this.productService.findAll();
  }
  @SetMetadata('roles', ['Admin'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productService.findOne(+id);
  }
  @SetMetadata('roles', ['Admin'])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productService.update(+id, updateProductDto);
  }
  @SetMetadata('roles', ['Admin'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productService.remove(+id);
  }
}
