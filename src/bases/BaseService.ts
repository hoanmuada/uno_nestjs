import { BaseEntity } from './Base.entity';
import { MyBaseService } from './MyBaseService';

export class BaseService<
  Entity extends BaseEntity,
> extends MyBaseService<Entity> {}
