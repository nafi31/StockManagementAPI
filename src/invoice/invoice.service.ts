import { Injectable, NotFoundException, UseGuards } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { UpdateInvoiceDto } from './dto/update-invoice.dto';
import { Invoice } from './entities/invoice.entity';
import { Product } from 'src/product/entities/product.entity';
import { Client } from 'src/client/entities/client.entity';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from 'src/core/guards';
@UseGuards(AuthGuard('jwt'),RolesGuard)
@Injectable()
export class InvoiceService {
  constructor(
    @InjectRepository(Invoice)
    private readonly invoiceRepo: Repository<Invoice>,

    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,

    @InjectRepository(Client)
    private readonly clientRepo: Repository<Client>

  ){}
  async create(createInvoiceDto: CreateInvoiceDto): Promise<Invoice> {
    const { productId, clientId, pricePerItem, amountInKg, totalPrice, remark } = createInvoiceDto;

    const product = await this.productRepo.findOne({ where: { id: productId } });
    if (!product) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
    }

    const client = await this.clientRepo.findOne({ where: { id: clientId } });
    if (!client) {
        throw new NotFoundException(`Client with ID ${clientId} not found`);
    }

    const invoice = this.invoiceRepo.create({
        product,   // Make sure you assign the entire product object
        client,    // Make sure you assign the entire client object
        pricePerItem,
        amountInKg,
        totalPrice,
        remark,
        date: new Date(),
    });

    return this.invoiceRepo.save(invoice);
}



async findAll(): Promise<Invoice[]> {
  const inv = await this.invoiceRepo.find({ relations: ['client', 'product'] });
  if (inv.length === 0) {
      throw new NotFoundException("No result found");
  }
  return inv;
}

async findOne(id: number): Promise<Invoice> {
  const inv = await this.invoiceRepo.findOne({ where: { id }, relations: ['client', 'product'] });
  if (!inv) {
      throw new NotFoundException(`No result with id ${id} found`);
  }
  return inv;
}


  async update(id: number, updateInvoiceDto: UpdateInvoiceDto) : Promise<Invoice> {
    const inv = await this.invoiceRepo.preload({
      id,
      ...updateInvoiceDto,
    })
    if (!inv) {
      throw new NotFoundException(`Invoice with ID ${id} not found`);
  }
    return await this.invoiceRepo.save(inv)
    
  }

  async remove(id: number) {
  const inv = await this.invoiceRepo.delete(id)
  if(inv.affected == 0){
    throw new NotFoundException(`No invoice with id${id} found`)
  }
  }
}
