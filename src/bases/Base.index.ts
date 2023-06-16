import { Brackets } from 'typeorm/query-builder/Brackets';
import { ObjectLiteral } from 'typeorm/common/ObjectLiteral';

export interface conditionObj {
  where:
    | Brackets
    | string
    | ((qb: this) => string)
    | ObjectLiteral
    | ObjectLiteral[];
  findOne?: boolean;
  fieldName?: string;
  params?: ObjectLiteral;
  select?: string[];
  groupBy?: string;
  sort?: string;
  order?: 'ASC' | 'DESC';
  limit?: number;
  offset?: number;
}
