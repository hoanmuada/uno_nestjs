import { randomBytes } from 'crypto';
import { isEmpty, upperFirst } from 'lodash';
import { customAlphabet } from 'nanoid';

export const randomString = (len: number) => randomBytes(len).toString('hex');

export const randomAlphabet = (len: number) => {
  const nanoid = customAlphabet('abcdefghijklmnopqrstuvwz', len);
  return nanoid();
};

export const randomNumber = (len: number) => {
  const nanoid = customAlphabet('0123456789', len);
  return nanoid();
};

export const formatStringData = (
  body: {},
  toSentenceCase: string[] = [],
  toTitleCase: string[] = [],
) => {
  if (!isEmpty(toSentenceCase)) {
    toSentenceCase.forEach((x) => {
      if (body[x]) {
        body[x] = upperFirst(body[x].toString());
      }
    });
  }
  if (!isEmpty(toTitleCase)) {
    toTitleCase.forEach((x) => {
      if (body[x]) {
        let arr = body[x].toString().split(' ');
        arr = arr.map((_x) => {
          return upperFirst(_x.toString());
        });
        body[x] = arr.join(' ');
      }
    });
  }
  return body;
};
