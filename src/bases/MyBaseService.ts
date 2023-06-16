import { isEmpty } from 'lodash';
import { DeepPartial, Repository } from 'typeorm';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';
import { ObjectId } from 'typeorm/driver/mongodb/typings';
import { Brackets } from 'typeorm/query-builder/Brackets';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { FindOptionsWhere } from 'typeorm/find-options/FindOptionsWhere';
import { conditionObj } from './Base.index';
import { FindManyOptions } from 'typeorm/find-options/FindManyOptions';

export class MyBaseService<Entity> {
  constructor(public repo: Repository<Entity>) {}

  findOne(id: number, relations?: string[]): Promise<Entity> {
    if (!id) {
      return null;
    }
    return this.repo.findOne({where: { id } as unknown as Entity, relations});
  }

  findAll(option?: FindManyOptions<Entity>): Promise<Entity[]> {
    return this.repo.find(option);
  }

  async findBy(condition: conditionObj): Promise<any> {
    const queryBuilder = this.repo
      .createQueryBuilder()
      .where(condition.where, condition.params);
    if (condition.select) queryBuilder.select(condition.select);
    if (condition.groupBy) queryBuilder.groupBy(condition.groupBy);
    if (condition.sort) {
      if (!condition.order) condition.order = 'ASC';
      queryBuilder.orderBy(condition.sort, condition.order);
    }
    if (condition.limit) queryBuilder.limit(condition.limit);
    if (condition.limit) queryBuilder.limit(condition.limit);
    if (condition.offset) queryBuilder.offset(condition.offset);
    if (condition.findOne) {
      if (condition.fieldName) {
        const result = await queryBuilder.getOne();
        return result?.[condition.fieldName];
      }
      if (condition.select) return queryBuilder.getRawOne();
      return queryBuilder.getOne();
    }
    if (condition.fieldName) {
      const result = await queryBuilder.getMany();
      return result.map((x) => x[condition.fieldName]);
    }
    if (condition.select) return queryBuilder.getRawMany();
    return queryBuilder.getMany();
  }

  countBy(condition: conditionObj): Promise<number> {
    return this.repo
      .createQueryBuilder()
      .where(condition.where, condition.params)
      .getCount();
  }

  async getFieldValue(
    conditions:
      | Brackets
      | string
      | ((qb: this) => string)
      | ObjectLiteral
      | ObjectLiteral[],
    fieldName: string,
    defaultValue?: string | number,
  ): Promise<string | number> {
    const obj = await this.repo
      .createQueryBuilder()
      .where(conditions)
      .select([fieldName])
      .execute();
    if (!isEmpty(obj) && obj[0][fieldName]) return obj[0][fieldName];
    return defaultValue;
  }

  async getListFieldValue(
    conditions:
      | Brackets
      | string
      | ((qb: this) => string)
      | ObjectLiteral
      | ObjectLiteral[],
    fieldName: string,
  ) {
    const obj = await this.repo
      .createQueryBuilder()
      .where(conditions)
      .select([fieldName])
      .execute();
    const result = [];
    if (!isEmpty(obj)) {
      obj.forEach((value: Entity) => result.push(value[fieldName]));
    }
    return result;
  }

  async insertBatch(dto: DeepPartial<Entity>[]) {
    const data = this.repo.create(dto) as DeepPartial<Entity>[];
    return this.repo.save(data);
  }

  async save(dto: DeepPartial<Entity>) {
    return this.repo.save(dto);
  }

  async updateBy(
    conditions:
      | Brackets
      | string
      | ((qb: this) => string)
      | ObjectLiteral
      | ObjectLiteral[],
    entities: QueryDeepPartialEntity<Entity>,
  ) {
    return this.repo
      .createQueryBuilder()
      .update(entities)
      .where(conditions)
      .execute();
  }

  async delete(
    conditions:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectId
      | ObjectId[]
      | FindOptionsWhere<Entity>,
  ) {
    return this.repo.delete(conditions);
  }

  async softDelete(
    conditions:
      | string
      | string[]
      | number
      | number[]
      | Date
      | Date[]
      | ObjectId
      | ObjectId[]
      | FindOptionsWhere<Entity>,
  ) {
    return this.repo.softDelete(conditions);
  }
}
