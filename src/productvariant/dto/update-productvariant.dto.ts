import { PartialType } from '@nestjs/mapped-types';
import { CreateProductvariantDto } from './create-productvariant.dto';

export class UpdateProductvariantDto extends PartialType(CreateProductvariantDto) {}
