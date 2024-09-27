import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
@Injectable()
export class ProductService {
  
  constructor( 
    @InjectRepository(Product)
    private readonly productRepository : Repository<Product>,

  ){}
  async create(createProductDto: CreateProductDto) : Promise<Product>{

    const product = await this.productRepository.create(createProductDto);
    await this.productRepository.save(product);
    return product;

  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async findOne(id: number) :Promise<Product> {
    let singleProduct = this.productRepository.findOne({where: {id}})
    if(!singleProduct){
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return await singleProduct;
  }

  async update(id: number, updateProductDto: UpdateProductDto): Promise<Product> {
    // Preload the existing product data
    const newProduct = await this.productRepository.preload({
      id,
      ...updateProductDto,
    });
  
    // Check if the product exists
    if (!newProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  
    // If stock amount is updated, handle it (optional)
    if (updateProductDto.productInStock) {
      const existingProduct = await this.productRepository.findOne({ where: { id } });
      if (existingProduct) {

        existingProduct.productInStock = newProduct.productInStock;
      }
    }
  
    // Save the updated product to the database
    return await this.productRepository.save(newProduct);
  }
  

  async remove(id: number): Promise<void> {
    const result = await this.productRepository.delete(id); // No need for `+id`, it's already a number
  
    if (result.affected === 0) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }
  
    
  }

