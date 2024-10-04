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
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // PostgreSQL
      host: 'ep-flat-rice-a24s94zy.eu-central-1.aws.neon.tech', // Hostname
      port: 5432, // Default PostgreSQL port
      username: 'StockManagement_owner', // Username
      password: 'Q7vujbcNh8kC', // Password
      database: 'StockManagement', // Database name
      entities: [join(__dirname, '**', '*.entity{.ts,.js}')],
      synchronize: false, // Use false in production
      ssl: {
        rejectUnauthorized: false, // Allows self-signed certificates; configure as needed
      },
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
