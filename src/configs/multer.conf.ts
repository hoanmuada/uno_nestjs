import { HttpException, HttpStatus } from '@nestjs/common';
import { Request } from 'express';
import { formatCurrentDateTime, FORMAT_DATE } from '../helpers/date.helper';
import {
  FILE_PATH,
  IMAGE_PATH,
  mkdir,
  UPLOAD_DIR,
  VIDEO_PATH,
  ZIP_PATH,
} from '../helpers/file.helper';
import { randomAlphabet } from '../helpers/string.helper';
import { diskStorage } from 'multer';
import slugify from 'slugify';
import { APP_CONSTANTS } from './constants';

type FileFilterCallback = (error: Error | null, cont: boolean) => void;
type DestinationCallback = (error: Error | null, destination: string) => void;
type FileNameCallback = (error: Error | null, filename: string) => void;

export const multerConfig = {
  dest: './' + UPLOAD_DIR,
  fileSize:
    APP_CONSTANTS.UPLOAD_MAXIMUM_SIZE *
    APP_CONSTANTS.KB_TO_B *
    APP_CONSTANTS.KB_TO_B,
};

export const multerOptions = {
  limits: {
    fileSize: multerConfig.fileSize,
  },
  fileFilter: (
    _req: Request,
    file: Express.Multer.File,
    cb: FileFilterCallback,
  ) => {
    try {
      if (
        file.mimetype.match(
          /\/(jpg|jpeg|png|gif|webp|bmp|heic|pdf|doc|docx|xls|xlsx|zip|mp4|mov|wmv|avi|flv|mkv|webm)$/,
        )
      ) {
        cb(null, true);
      } else {
        cb(
          new HttpException('validation.INVALID_FILE', HttpStatus.BAD_REQUEST),
          false,
        );
      }
    } catch (e) {
      cb(new HttpException(e, HttpStatus.BAD_REQUEST), false);
    }
  },
  storage: diskStorage({
    destination: (
      req: Request,
      file: Express.Multer.File,
      cb: DestinationCallback,
    ) => {
      let uploadPath = multerConfig.dest;
      mkdir(uploadPath);
      let subPath = '/' + IMAGE_PATH;
      if (file.mimetype.match(/\/(pdf|doc|docx|xls|xlsx)$/)) {
        subPath = '/' + FILE_PATH;
      }
      if (file.mimetype.match(/\/(zip)$/)) {
        subPath = '/' + ZIP_PATH;
      }
      if (file.mimetype.match(/\/(mp4|mov|wmv|avi|flv|mkv|webm)$/)) {
        subPath = '/' + VIDEO_PATH;
      }
      uploadPath += subPath;
      //uploadPath += '/' + String(req.user ? req.user['id'] : 0);
      mkdir(uploadPath);
      uploadPath += '/' + formatCurrentDateTime(FORMAT_DATE.DB_DATE);
      mkdir(uploadPath);
      cb(null, uploadPath);
    },
    filename: (
      _req: Request,
      file: Express.Multer.File,
      cb: FileNameCallback,
    ) => {
      cb(null, `${randomAlphabet(3)}_${slugify(file.originalname)}`);
    },
  }),
};
