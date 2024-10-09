import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientService } from './client.service';
import { CreateClientDto } from './dto/create-client.dto';
import { UpdateClientDto } from './dto/update-client.dto';
import { SetMetadata } from '@nestjs/common';
import { UseGuards } from '@nestjs/common';
import { RolesGuard } from 'src/core/guards';
import { AuthGuard } from '@nestjs/passport';

@UseGuards(AuthGuard('jwt'), RolesGuard)
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}
  @SetMetadata('roles', ['Admin'])
  @Post()
  create(@Body() createClientDto: CreateClientDto) {
    return this.clientService.create(createClientDto);
  }


  @SetMetadata('roles', ['Admin'])
  @Get()
  findAll() {
    return this.clientService.findAll();
  }

  @SetMetadata('roles', ['Admin'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientService.findOne(+id);
  }

  @SetMetadata('roles', ['Admin'])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientDto: UpdateClientDto) {
    return this.clientService.update(+id, updateClientDto);
  }

  @SetMetadata('roles', ['Admin'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientService.remove(+id);
  }
}
