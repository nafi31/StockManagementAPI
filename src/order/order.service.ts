import { Injectable ,NotFoundException,BadRequestException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Client } from 'src/client/entities/client.entity';
import { Connection } from 'typeorm';
@Injectable()
export class OrderService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepo: Repository<Order>,
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>,
    private readonly connection: Connection, // For transactions
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    const { clientId, productId, amountInBag, priceInTotal, paid } = createOrderDto;

    return this.connection.transaction(async (manager) => {
      const product = await manager.findOne(Product, { where: { id: productId } });
      if (!product) {
        throw new NotFoundException(`No product with id ${productId} found`);
      }

      // Check if there is enough stock
      if (product.productInStock < amountInBag) {
        throw new BadRequestException(`Not enough stock for product with id ${productId}`);
      }

      const client = await manager.findOne(Client, { where: { id: clientId } });
      if (!client) {
        throw new NotFoundException(`No client with id ${clientId} found`);
      }

      // Update product stock
      product.productInStock -= Number(amountInBag);

      // If the order isn't paid, add the price to the client's debt
      if (!paid) {
        client.debtAmount += Number(priceInTotal);
      }

      await manager.save(Product, product);
      await manager.save(Client, client);

      // Create and save the new order
      const order = manager.create(Order, {
        ...createOrderDto,
        date: new Date(),
        product,
        client,
      });

      return await manager.save(Order, order);
    });
  }





  async findAll() : Promise<Order[]>{
    const allOrder = await this.orderRepo.find({relations: ['client', 'product'],})

    if(!allOrder){
      throw new NotFoundException("There are no orders")
    }
    return allOrder
    
  }

  async findOne(id) : Promise<Order>{
    const allOrder = await this.orderRepo.findOne({where:{id},relations: ['client', 'product']})

    if(!allOrder){
      throw new NotFoundException(`There is no order with id ${id}`)
    }
    //console.log("Raw Date:", allOrder.date);
    return {
      ...allOrder,
      //date : allOrder.date.toISOString()// Convert to ISO string if needed
    };
    
  }

  async update(id: number, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const order = await this.orderRepo.findOne({ where: { id } });
  
    if (!order) {
      throw new NotFoundException(`There is no order with id ${id}`);
    }
  
    if (updateOrderDto.productId) {
      const product = await this.productRepo.findOne({ where: { id: updateOrderDto.productId } });
      if (!product) {
        throw new NotFoundException(`No product with id ${updateOrderDto.productId} found`);
      }
      order.product = product;
    }
  
    if (updateOrderDto.clientId) {
      const client = await this.clientRepo.findOne({ where: { id: updateOrderDto.clientId } });
      if (!client) {
        throw new NotFoundException(`No client with id ${updateOrderDto.clientId} found`);
      }
      order.client = client;
    }
  
    
    Object.assign(order, updateOrderDto);
  
    return this.orderRepo.save(order);
  }

  async remove(id: number):Promise<void> {
    const res = await this.orderRepo.delete(id)
    if(res.affected==0){
      throw new NotFoundException(`There is no order with id ${id}`)
    }
  }
}
