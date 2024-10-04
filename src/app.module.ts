import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { join } from 'path';

import { ProductDailyModule } from './product-daily/product-daily.module';
import { ClientModule } from './client/client.module';
import { ShiftmanagerModule } from './shiftmanager/shiftmanager.module';
import { OrderModule } from './order/order.module';

@Module({
  imports: [TypeOrmModule.forRoot({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: '',
    database: 'StockManagement',
    entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
    synchronize: false, // Set to 'false' in production
  }),
    
    ProductModule,
    
    
    
    ProductDailyModule,
    
    ClientModule,
    
    ShiftmanagerModule,
    
    OrderModule],
    
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {

}
