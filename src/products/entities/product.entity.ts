import { Field, Int, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Category {
  @Field(() => Int)
  categoryId: number;

  @Field()
  name: string;

  @Field(() => [Product], { nullable: true })
  products?: Product[] | null;
}

@ObjectType()
export class Product {
  @Field(() => Int)
  id: number;

  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => Int)
  price: number;

  @Field(() => Int, { nullable: true })
  sales?: number | null;

  @Field(() => Int, { nullable: true })
  rating?: number | null;

  @Field(() => Int, { nullable: true })
  categoryId?: number | null;

  @Field(() => String, { nullable: true })
  image?: string | null;

  @Field(() => String, { nullable: true })
  code?: string | null;

  @Field()
  currency: string;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
