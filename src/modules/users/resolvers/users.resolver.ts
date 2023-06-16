import { Args, Query, Resolver } from '@nestjs/graphql';
import { Inject } from '@nestjs/common';
import { UserEntity } from '../entities/User.entity';
import { UserService } from '../services/user.service';
import { AuthPayload } from '../dtos/AuthPayload.dto';
import { AuthUser } from '../../../common/directives/auth.decorator';
import { CreateUserInputDto } from '../dtos/CreateUserInput.dto';
import { UserOutputDto } from '../dtos/UserOutput.dto';
import { UpdateUserInputDto } from '../dtos/UpdateUserInput.dto';

@Resolver()
export class UsersResolver {
  constructor(@Inject(UserService) private userService: UserService) {}

  @Query(() => AuthPayload)
  async login(
    @Args('phoneNumber') phoneNumber: string,
    @Args('password') password: string,
  ): Promise<AuthPayload> {
    return await this.userService.login(phoneNumber, password);
  }

  @Query((returns) => UserOutputDto)
  async customer(
    @AuthUser() user: UserEntity,
    @Args('id') id: number,
  ): Promise<UserEntity> {
    return await this.userService.findOne(id);
  }

  @Query((returns) => [UserOutputDto])
  async customers(@AuthUser() user: UserEntity): Promise<UserEntity[]> {
    console.log(await this.userService.findAll());
    return await this.userService.findAll();
  }

  @Query(() => UserOutputDto)
  async createCustomer(
    @Args('input') input: CreateUserInputDto,
  ): Promise<UserEntity> {
    input.userPass = await this.userService.genPassword(input.userPass);
    const result = await this.userService.save(input);
    return result;
  }

  @Query(() => Boolean)
  async updateCustomer(
    @Args('input') input: UpdateUserInputDto,
    @Args('id') id: number,
  ): Promise<boolean> {
    if (input.userPass)
      input.userPass = await this.userService.genPassword(input.userPass);
    const result = await this.userService.save({ ...input, id });
    return !!result;
  }
}
