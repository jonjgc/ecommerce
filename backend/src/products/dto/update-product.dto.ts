import { PartialType } from '@nestjs/mapped-types';
import { QueryProductDto } from './query-product.dto';

export class UpdateProductDto extends PartialType(QueryProductDto) {}
