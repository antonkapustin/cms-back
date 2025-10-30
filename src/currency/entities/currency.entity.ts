import { ObjectType, Field } from '@nestjs/graphql';

@ObjectType()
export class Currency {
  @Field()
  code: string;

  @Field()
  currency: string;

  @Field()
  number: string;

  @Field()
  digits: number;

  @Field(() => [String])
  countries: string[];
}
