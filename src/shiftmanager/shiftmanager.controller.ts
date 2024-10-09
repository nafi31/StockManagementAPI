import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShiftmanagerService } from './shiftmanager.service';
import { CreateShiftmanagerDto } from './dto/create-shiftmanager.dto';
import { UpdateShiftmanagerDto } from './dto/update-shiftmanager.dto';
import { SetMetadata } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/core/guards';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('shiftmanager')
export class ShiftmanagerController {
  constructor(private readonly shiftmanagerService: ShiftmanagerService) {}
  @SetMetadata('roles', ['Admin'])
  @Post()
  create(@Body() createShiftmanagerDto: CreateShiftmanagerDto) {
    return this.shiftmanagerService.create(createShiftmanagerDto);
  }


  @SetMetadata('roles', ['Admin'])
  @Get()
  findAll() {
    return this.shiftmanagerService.findAll();
  }


  @SetMetadata('roles', ['Admin'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shiftmanagerService.findOne(+id);
  }


  @SetMetadata('roles', ['Admin'])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShiftmanagerDto: UpdateShiftmanagerDto) {
    return this.shiftmanagerService.update(+id, updateShiftmanagerDto);
  }


  @SetMetadata('roles', ['Admin'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shiftmanagerService.remove(+id);
  }
}
