import { IsNumber, IsOptional } from 'class-validator';

export class BaseSearchDto {
  @IsOptional()
  @IsNumber({}, { message: 'validation.INVALID_TYPE|field.DATA' })
  page: number;

  @IsOptional()
  @IsNumber({}, { message: 'validation.INVALID_TYPE|field.DATA' })
  limit: number;

  @IsOptional()
  searchText: string;
}
