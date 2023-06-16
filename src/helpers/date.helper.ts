import { addHours, format, isValid, parse } from 'date-fns';
import { replace } from 'lodash';

export enum FORMAT_DATE {
  DB_DATE_TIME = 'yyyy-MM-dd HH:mm:ss',
  DB_DATE = 'yyyy-MM-dd',
  DB_DATE_MINUTE = 'yyy-MM-dd HH:mm',
  SHOW_DATE_TIME = 'dd/MM/yyyy HH:mm:ss',
  SHOW_DATE_MINUTE = 'dd/MM/yyyy HH:mm',
  SHOW_MINUTE_DATE = 'HH:mm dd/MM/yyyy',
  SHOW_ONLY_DATE = 'dd/MM/yyyy',
  SHOW_ONLY_YEAR = 'yyyy',
  SHOW_ONLY_MINUTE = 'HH:mm',
}

export const formatCurrentDateTime = (formatDate: FORMAT_DATE) =>
  format(new Date(), formatDate);

export const formatDateTimeStr = (
  beginDate: string,
  beginFormat: FORMAT_DATE,
  endFormat: FORMAT_DATE,
) =>
  beginDate && isValid(new Date(beginDate))
    ? format(parse(beginDate, beginFormat, new Date()), endFormat)
    : '';

export const formatDateTime = (date: Date, formatDate: FORMAT_DATE) =>
  isValid(date) ? format(date, formatDate) : '';

export const replaceStringToDate = (date: string) =>
  replace(date, 'T00:00:00.000Z', '');

export const stringToDate = (date: string, format: FORMAT_DATE) =>
  parse(date, format, new Date());

export const formatByTimeZone = (date: string | Date, utc: number) =>
  addHours(new Date(date), utc);

export const formatDBTimeByTimeZone = (
  date: string | Date,
  utc: number,
  formatDate: FORMAT_DATE,
) => formatDateTime(formatByTimeZone(date, utc), formatDate);
