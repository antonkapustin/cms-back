import { Field, InputType, Int } from '@nestjs/graphql';

@InputType({ isAbstract: true })
export class CreateProductInput {
  @Field()
  title: string;

  @Field(() => String, { nullable: true })
  description?: string | null;

  @Field(() => String, { nullable: true })
  code?: string | null;

  @Field(() => Int)
  price: number;

  @Field(() => String, { nullable: true })
  categoryName?: string | null;


  @Field(() => String, { nullable: true })
  image?: string | null;
}
