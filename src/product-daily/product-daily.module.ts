import { Module } from '@nestjs/common';
import { ProductDailyService } from './product-daily.service';
import { ProductDailyController } from './product-daily.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDaily } from './entities/product-daily.entity';
import { Product } from 'src/product/entities/product.entity';
import { ProductModule } from 'src/product/product.module';
@Module({
  imports: [
    TypeOrmModule.forFeature([ProductDaily]),ProductModule // Register the Product entity with TypeOrmModule
  ],
  controllers: [ProductDailyController],
  providers: [ProductDailyService],
})
export class ProductDailyModule {}
