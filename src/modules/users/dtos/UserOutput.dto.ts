import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType('users')
export class UserOutputDto {
  @Field()
  id: number;

  @Field()
  userName: string;

  @Field()
  fullName: string;

  @Field()
  phoneNumber: string;

  @Field()
  roleId: number;
}
