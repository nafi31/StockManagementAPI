import { Injectable ,NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { Product } from 'src/product/entities/product.entity';
import { Client } from 'src/client/entities/client.entity';
@Injectable()
export class OrderService {
    constructor(
      @InjectRepository(Order)
      private readonly orderRepo: Repository<Order>,
  
      @InjectRepository(Product)
      private readonly productRepo: Repository<Product>,
  
      @InjectRepository(Client)
      private readonly clientRepo: Repository<Client>,
    ) {}
  
    async create(createOrderDto: CreateOrderDto): Promise<Order> {
      const { clientId, productId, amountInBag } = createOrderDto;
    
      const product = await this.productRepo.findOne({ where: { id: productId } });
      if (!product) {
        throw new NotFoundException(`No product with id ${productId} found`);
      }
    
      const client = await this.clientRepo.findOne({ where: { id: clientId } });
      if (!client) {
        throw new NotFoundException(`No client with id ${clientId} found`);
      }
    
      product.productInStock -= amountInBag;
      await this.productRepo.save(product);
    
      const order = this.orderRepo.create({
        ...createOrderDto,
        date: new Date(createOrderDto.date),
        product,  
        client,   
      });
    
      return await this.orderRepo.save(order);
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
