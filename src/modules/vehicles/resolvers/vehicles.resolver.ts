import { Args, Query, Resolver } from '@nestjs/graphql';
import { HttpException, HttpStatus, Inject } from '@nestjs/common';
import { VehicleEntity } from '../entities/Vehicle.entity';
import { VehicleService } from '../services/vehicle.service';
import { AuthUser } from '../../../common/directives/auth.decorator';
import { CreateVehicleInputDto } from '../dtos/CreateVehicleInput.dto';
import { UpdateVehicleInputDto } from '../dtos/UpdateVehicleInput.dto';
import { UserEntity } from '../../users/entities/User.entity';
import { UserRole } from '../../users/types';
import { VehicleType } from '../types';

@Resolver()
export class VehiclesResolver {
  constructor(@Inject(VehicleService) private userService: VehicleService) {}

  @Query((returns) => VehicleEntity)
  async vehicle(
    @AuthUser() user: UserEntity,
    @Args('id') id: number,
  ): Promise<VehicleEntity> {
    return await this.userService.findOne(id, ['File']);
  }

  @Query((returns) => [VehicleEntity])
  async vehicles(@AuthUser() user: UserEntity): Promise<VehicleEntity[]> {
    return await this.userService.findAll({relations: ['File']});
  }

  @Query(() => VehicleEntity)
  async createVehicle(
    @AuthUser() user: UserEntity,
    @Args('input') input: CreateVehicleInputDto,
  ): Promise<VehicleEntity> {
    if (
      (user.roleId === UserRole.RIDER &&
        input.typeId !== VehicleType.MOTORBIKE) ||
      (user.roleId === UserRole.DRIVER && input.typeId !== VehicleType.CAR)
    ) {
      throw new HttpException(
        'You do not have permission.',
        HttpStatus.FORBIDDEN,
      );
    }
    const result = await this.userService.save(input);
    return result;
  }

  @Query(() => Boolean)
  async updateVehicle(
    @AuthUser() user: UserEntity,
    @Args('input') input: UpdateVehicleInputDto,
    @Args('id') id: number,
  ): Promise<boolean> {
    if (
      (user.roleId === UserRole.RIDER && input.typeId &&
        input.typeId !== VehicleType.MOTORBIKE) ||
      (user.roleId === UserRole.DRIVER && input.typeId && input.typeId !== VehicleType.CAR)
    ) {
      throw new HttpException(
        'You do not have permission.',
        HttpStatus.FORBIDDEN,
      );
    }
    const result = await this.userService.save({ ...input, id });
    return !!result;
  }
}
