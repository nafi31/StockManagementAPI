import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ShiftmanagerService } from './shiftmanager.service';
import { CreateShiftmanagerDto } from './dto/create-shiftmanager.dto';
import { UpdateShiftmanagerDto } from './dto/update-shiftmanager.dto';

@Controller('shiftmanager')
export class ShiftmanagerController {
  constructor(private readonly shiftmanagerService: ShiftmanagerService) {}

  @Post()
  create(@Body() createShiftmanagerDto: CreateShiftmanagerDto) {
    return this.shiftmanagerService.create(createShiftmanagerDto);
  }

  @Get()
  findAll() {
    return this.shiftmanagerService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.shiftmanagerService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateShiftmanagerDto: UpdateShiftmanagerDto) {
    return this.shiftmanagerService.update(+id, updateShiftmanagerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.shiftmanagerService.remove(+id);
  }
}
