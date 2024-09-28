import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { join } from 'path';
import { ProductvariantModule } from './productvariant/productvariant.module';
import { ProductDailyModule } from './product-daily/product-daily.module';
import { ClientModule } from './client/client.module';
@Module({
  imports: [TypeOrmModule.forRoot({ type: 'sqlite',
    database: join(__dirname, 'database.db'), // Path to your SQLite database file
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, }),
    
    ProductModule,
    
    ProductvariantModule,
    
    ProductDailyModule,
    
    ClientModule],
    
  controllers: [AppController],
  providers: [AppService],
})

export class AppModule {

}
