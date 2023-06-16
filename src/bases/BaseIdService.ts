import { BaseIdEntity } from './BaseId.entity';
import { MyBaseService } from './MyBaseService';

export class BaseIdService<
  Entity extends BaseIdEntity,
> extends MyBaseService<Entity> {}
