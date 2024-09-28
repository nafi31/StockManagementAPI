import { Injectable,NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductvariantDto } from './dto/create-productvariant.dto';
import { UpdateProductvariantDto } from './dto/update-productvariant.dto';
import { ProductVariant } from './entities/productvariant.entity';
import { privateDecrypt } from 'crypto';
@Injectable()
export class ProductvariantService {

    constructor(
      @InjectRepository(ProductVariant)
      private readonly variantRepository : Repository<ProductVariant>
    ){}

  async create(createProductvariantDto: CreateProductvariantDto): Promise<ProductVariant> {
    const variant = await this.variantRepository.create(createProductvariantDto)
    return await this.variantRepository.save(variant) ;
  }

  async findAllVariants(): Promise<ProductVariant[]> {
    return await this.variantRepository.find();
  }

  async findOne(id: number) : Promise<ProductVariant> {
    let res = this.variantRepository.findOne({where:{id}})
    if(!res){
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return await res;
  }

  async update(id: number, variantName:string) :Promise<ProductVariant>{
    const variant = await this.variantRepository.preload({
      id,
      variantName
    })
    if(!variant){
      throw new NotFoundException(`Variant with Id ${id} Not found`)
    }
    if(variantName){
      const variantChange =await this.variantRepository.findOne({where :{id}})
      if(variantChange){
        variantChange.variantName = await variantName;
      }
      
    }
    
    
    return await this.variantRepository.save(variant);
  }

  async remove(id: number): Promise<void>{
    const variant = this.variantRepository.findOne({where : {id}})
    if(!variant){
      throw new NotFoundException(`Variant with Id ${id} Not found`)
    }
    await this.variantRepository.delete(id);
  }
}
