import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  SetMetadata,
} from '@nestjs/common';
import { OrderService } from './order.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { RolesGuard } from 'src/core/guards';
import { AuthGuard } from '@nestjs/passport';

@Controller('order')
@UseGuards(AuthGuard('jwt'), RolesGuard) // Apply guards globally for the entire controller
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @SetMetadata('roles', ['Admin'])
  @Post()
  create(@Body() createOrderDto: CreateOrderDto) {
    return this.orderService.create(createOrderDto);
  }

  @SetMetadata('roles', ['Admin'])
  @Get()
  findAll() {
    return this.orderService.findAll();
  }

  @SetMetadata('roles', ['Admin'])
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.orderService.findOne(+id);
  }

  @SetMetadata('roles', ['Admin'])
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateOrderDto: UpdateOrderDto) {
    return this.orderService.update(+id, updateOrderDto);
  }

  @SetMetadata('roles', ['Admin'])
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.orderService.remove(+id);
  }
}
