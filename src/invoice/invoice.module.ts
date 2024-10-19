import { Module } from '@nestjs/common';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Invoice } from './entities/invoice.entity';
import { ProductModule } from 'src/product/product.module';
import { ClientModule } from 'src/client/client.module';
import { Product } from 'src/product/entities/product.entity';
import { Client } from 'src/client/entities/client.entity';

@Module({
  imports:[
    TypeOrmModule.forFeature([Invoice,Product,Client]),ProductModule,ClientModule
  ],
  controllers: [InvoiceController],
  providers: [InvoiceService],
  exports:[TypeOrmModule]
})
export class InvoiceModule {}
