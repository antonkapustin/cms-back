import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class CreateStoreInput {
  @Field(() => String)
  name: string;

  @Field(() => String)
  currency: string;
}
