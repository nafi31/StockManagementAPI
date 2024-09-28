import { Injectable ,NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDailyDto } from './dto/create-product-daily.dto';
import { UpdateProductDailyDto } from './dto/update-product-daily.dto';
import { ProductDaily } from './entities/product-daily.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductDailyService {

  constructor(
    @InjectRepository(ProductDaily)

    private readonly productdailyRepo: Repository<ProductDaily>

  ){}
  async create(createProductDailyDto: CreateProductDailyDto):Promise<ProductDaily> {
    const productDailyNew  = await this.productdailyRepo.create(createProductDailyDto);
    return await this.productdailyRepo.save(productDailyNew)

  }

  async findAll() : Promise<ProductDaily[]>{
    const allProductMade = await this.productdailyRepo.find();
    if(!allProductMade){
      throw new NotFoundException("There are no products made");
    }
    return allProductMade;
  }


  async findOne(id: number):Promise<ProductDaily> {
    const clientSerarch = await this.productdailyRepo.findOne({where :{id}})
    if(!clientSerarch){
      throw new NotFoundException(`There are no Clients with id ${id}`);
    }
    return clientSerarch;
    
  }
  // async findOneByDate(date?: number): Promise<ProductDaily> {
  //   const productDaily = await this.productdailyRepo.findOne({
  //     where: [
  //       { date },
  //     ],
  //   });

  //   if (!productDaily) {
  //     throw new NotFoundException('No product found for the given client or date');
  //   }

  //   return productDaily;
  // }



  async remove(id: number) : Promise<void> {
    const prodOfTheDay = await this.productdailyRepo.findOne({where :{id}});
    if(!prodOfTheDay){
      throw new NotFoundException("There are no products made");
    }
    await this.productdailyRepo.delete(id)
  }
}
