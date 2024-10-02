import { Module } from '@nestjs/common';
import { ShiftmanagerService } from './shiftmanager.service';
import { ShiftmanagerController } from './shiftmanager.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Shiftmanager } from './entities/shiftmanager.entity';
@Module({
  imports:[
    TypeOrmModule.forFeature([Shiftmanager])
  ],
  controllers: [ShiftmanagerController],
  providers: [ShiftmanagerService],
  exports:[TypeOrmModule]
})
export class ShiftmanagerModule {}
