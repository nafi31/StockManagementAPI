import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDailyDto } from './create-product-daily.dto';

export class UpdateProductDailyDto extends PartialType(CreateProductDailyDto) {}
