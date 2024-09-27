import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { Product } from './entities/product.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([Product]), // Register the Product entity with TypeOrmModule
  ],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
