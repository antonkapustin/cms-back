import { ObjectType, Field, Int } from '@nestjs/graphql';
import { Product } from 'src/products/entities/product.entity';

@ObjectType()
export class Store {
  @Field(() => Int)
  id: number;

  @Field(() => String)
  name: string;

  @Field(() => String)
  currency: string;

  @Field(() => Boolean)
  isActive: boolean;

  @Field(() => [Product])
  products?: Product[];
}
