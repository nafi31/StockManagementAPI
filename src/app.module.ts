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
import { ConfigModule } from '@nestjs/config';
@Module({
  imports: [
      TypeOrmModule.forRoot({
        type: 'postgres',
        host: 'ep-frosty-cherry-a2yqz63g.eu-central-1.aws.neon.tech',
        port: 5432,
        username: 'Stock_owner',
        password: 'r3OARtkISzn6',
        database: 'Stock',
        ssl: { rejectUnauthorized: false },
        entities: [__dirname + '/**/*.entity{.ts,.js}'], // Include your entities here
        synchronize: true, // Only for development
      }),
    
    ProductModule,
    ProductDailyModule,
    ClientModule,
    ShiftmanagerModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
