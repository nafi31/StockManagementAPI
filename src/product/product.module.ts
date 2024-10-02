import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';

import { ProductVariant } from 'src/productvariant/entities/productvariant.entity';
import { ProductvariantModule } from 'src/productvariant/productvariant.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([Product]), ProductvariantModule // Register the Product entity with TypeOrmModule
  ],
  controllers: [ProductController],
  providers: [ProductService],
  exports:[TypeOrmModule]
})
export class ProductModule {}
