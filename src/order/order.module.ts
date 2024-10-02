import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from 'src/product/entities/product.entity';
import { ProductModule } from 'src/product/product.module';
import { ClientModule } from 'src/client/client.module';
import { Order } from './entities/order.entity';
import { Client } from 'src/client/entities/client.entity';
@Module({
  imports:[
    TypeOrmModule.forFeature([Order, Product, Client]),ProductModule,ClientModule
  ],
  controllers: [OrderController],
  providers: [OrderService],
  exports:[TypeOrmModule]
})
export class OrderModule {}
