import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';

@ObjectType()
export class Category {
  @Field(() => Int)
  categoryId: number;

  @Field(() => String)
  name: string;

  @Field(() => [Product])
  products: Product[];
}
