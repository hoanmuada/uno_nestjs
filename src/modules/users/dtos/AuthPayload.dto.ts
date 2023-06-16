import { Field, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class AuthPayload {
  @Field()
  id: number;

  @Field()
  userName: string;

  @Field()
  phoneNumber: string;

  @Field()
  fullName: string;

  @Field()
  roleId: number;

  @Field()
  accessToken: string;

  @Field()
  refreshToken: string;
}
