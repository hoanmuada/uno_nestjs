import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { VehicleEntity } from './entities/Vehicle.entity';
import { VehicleService } from './services/vehicle.service';
import { VehiclesResolver } from './resolvers/vehicles.resolver';

@Module({
  imports: [TypeOrmModule.forFeature([VehicleEntity])],
  providers: [VehicleService, VehiclesResolver],
})
export class VehicleModule {}
