import { Module } from '@nestjs/common';
import { ClientService } from './client.service';
import { ClientController } from './client.controller';
import { Client } from './entities/client.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
@Module({
  imports: [
    TypeOrmModule.forFeature([Client]), // Register the Product entity with TypeOrmModule
  ],
  controllers: [ClientController],
  providers: [ClientService],
  exports:[ClientModule]
})
export class ClientModule {}
