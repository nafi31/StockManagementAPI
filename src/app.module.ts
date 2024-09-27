import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { join } from 'path';
@Module({
  imports: [ProductModule,TypeOrmModule.forRoot({ type: 'sqlite',
    database: join(__dirname, 'database.sqlite'), // Path to your SQLite database file
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
    synchronize: true, })],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
