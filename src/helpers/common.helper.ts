import { round, startsWith } from 'lodash';

export const formatRange = (range: number | undefined | null) =>
  !!range && range > 0 ? round(range, 1) : 0;

export const formatPrice = (price: number) =>
  price >= 1000000000
    ? (price / 1000000000).toFixed(2) + ' tỷ'
    : Intl.NumberFormat().format(price);

export const formatIntNumber = (x: number) =>
  x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ',');

export const percentCalculate = (numerator: number, denominator: number) =>
  denominator > 0 ? round((numerator / denominator) * 100, 2) : 0;

export const getPhoneAndPrefix = (phoneNumber: string) => {
  let prefix = '';
  const index = phoneNumber.indexOf('.');
  if (index > 0) {
    prefix = phoneNumber.substring(0, index);
    phoneNumber = phoneNumber.substring(index + 1);
  }
  if (!phoneNumber.startsWith('0')) phoneNumber = '0' + phoneNumber;
  return { phoneNumber, prefix };
};

export const formatPhoneNumber = (phoneNumber: string, dialCode: string) => {
  if (startsWith(phoneNumber, '0')) phoneNumber = phoneNumber.substring(1);
  if (startsWith(dialCode, '+')) dialCode = dialCode.substring(1);
  return dialCode + phoneNumber;
};

export const formatPrivateString = (str: string) => {
  if (!str) return str;
  const start = str.substring(0, 1);
  const end = str.substring(str.length - 1, str.length);
  let result = start;
  for (let i = 0; i < str.length - 2; i++) {
    result += '*';
  }
  result += end;
  return result;
};
