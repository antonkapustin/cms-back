import { Field, InputType, Int } from '@nestjs/graphql';
@InputType()
export class UpdateProductInput {
  @Field(() => Int)
  id: number;

  @Field(() => String, { nullable: true })
  title?: string;

  @Field(() => String, { nullable: true })
  description?: string;

  @Field(() => String, { nullable: true })
  code?: string;

  @Field(() => Int, { nullable: true })
  price?: number;

  @Field(() => String, { nullable: true })
  categoryName?: string;

  @Field(() => String, { nullable: true })
  image?: string;
}
