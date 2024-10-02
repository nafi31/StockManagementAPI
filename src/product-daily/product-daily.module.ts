import { Module } from '@nestjs/common';
import { ProductDailyService } from './product-daily.service';
import { ProductDailyController } from './product-daily.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductDaily } from './entities/product-daily.entity';
import { Product } from 'src/product/entities/product.entity';
import { ProductModule } from 'src/product/product.module';
import { Shiftmanager } from 'src/shiftmanager/entities/shiftmanager.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([ProductDaily,Shiftmanager]),ProductModule // Register the Product entity with TypeOrmModule
  ],
  controllers: [ProductDailyController],
  providers: [ProductDailyService],
})
export class ProductDailyModule {}
