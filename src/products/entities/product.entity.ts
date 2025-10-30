import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Category } from "src/category/entities/category.entity";

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

  @Field(() => Category, { nullable: true })
  category?: Category | null; 

  @Field(() => String, { nullable: true })
  image?: string | null;

  @Field(() => String, { nullable: true })
  code?: string | null;

  @Field()
  createdAt: Date;

  @Field()
  updatedAt: Date;
}
