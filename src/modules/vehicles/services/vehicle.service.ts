import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseService } from '../../../bases/BaseService';
import { Repository } from 'typeorm';
import { VehicleEntity } from '../entities/Vehicle.entity';

@Injectable()
export class VehicleService extends BaseService<VehicleEntity> {
  constructor(
    @InjectRepository(VehicleEntity)
    public repo: Repository<VehicleEntity>,
  ) {
    super(repo);
  }
}
