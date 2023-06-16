import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class TrimPipe implements PipeTransform {
  // tslint:disable-next-line
  private isObj(obj: any): boolean {
    return typeof obj === 'object' && obj !== null;
  }

  // tslint:disable-next-line
  private trim(values: any) {
    Object.keys(values).forEach((key) => {
      if (key !== 'password') {
        if (this.isObj(values[key])) {
          values[key] = this.trim(values[key]);
        } else {
          if (typeof values[key] === 'string') {
            if (key !== 'userPass' && key !== 'reUserPass') {
              values[key] = values[key].trim();
            }
          }
        }
      }
    });
    return values;
  }

  // tslint:disable-next-line
  transform(values: any, metadata: ArgumentMetadata) {
    const { type } = metadata;
    if (this.isObj(values) && type === 'body') {
      return this.trim(values);
    }
    return values;
  }
}
