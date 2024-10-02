import { Injectable ,NotFoundException} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateProductDailyDto } from './dto/create-product-daily.dto';
import { UpdateProductDailyDto } from './dto/update-product-daily.dto';
import { ProductDaily } from './entities/product-daily.entity';
import { Repository } from 'typeorm';
import { Product } from 'src/product/entities/product.entity';
@Injectable()
export class ProductDailyService {

  constructor(
    @InjectRepository(ProductDaily)

    private readonly productdailyRepo: Repository<ProductDaily>,
    @InjectRepository(Product)

    private readonly productRepository : Repository<Product>
  ){}
  async create(createProductDailyDto: CreateProductDailyDto):Promise<ProductDaily> {
    const {productId,amountDaily} = createProductDailyDto
    const productDailyNew  = await this.productdailyRepo.create(createProductDailyDto);
    const product = await this.productRepository.findOne({ where: { id: productId } });

        if (!product) {
            throw new Error('Product not found');
        }

        // Update the productInStock by adding amountDaily
        product.productInStock += amountDaily;

        // Save the updated product
        await this.productRepository.save(product);

        
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
    const prodOfTheDay = await this.productdailyRepo.delete(id)
    if(prodOfTheDay.affected==0){
      throw new NotFoundException(`There are no products made with id ${id}`);
    }
    
  }
}
