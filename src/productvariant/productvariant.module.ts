import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductvariantService } from './productvariant.service';
import { ProductvariantController } from './productvariant.controller';
import { ProductVariant } from './entities/productvariant.entity';
@Module({
  imports: [
    TypeOrmModule.forFeature([ProductVariant]), // Register the Product entity with TypeOrmModule
  ],
  controllers: [ProductvariantController],
  providers: [ProductvariantService],
  exports :[TypeOrmModule]
})
export class ProductvariantModule {}
