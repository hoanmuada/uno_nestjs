import { CONSTANTS } from '../configs/constants';
import { existsSync, mkdirSync, PathLike } from 'fs';
import { includes, some } from 'lodash';

export const CONTROLLER_PREFIX = 'file';
export const UPLOAD_DIR = 'uploads';
export const IMAGE_PATH = 'images';
export const FILE_PATH = 'files';
export const ZIP_PATH = 'zips';
export const VIDEO_PATH = 'videos';
export const FOLDER_ZIP_PATH = 'uploads/zips/folderZip/';
export const METADATA_IMAGE_PATH = 'uploads/images/metadata/';
export interface FolderTree {
  id: number;
  fileUrl: string;
  folderJson: string;
  userFileId: number;
}

export const replacePath = (filePath: string) => {
  filePath = filePath.replace(/\\/g, '/');
  return filePath.replace(`${UPLOAD_DIR}/`, `${CONTROLLER_PREFIX}/`);
};

export const replaceImageUrl = (url: string) =>
  url.replace(CONSTANTS().API_URL + CONTROLLER_PREFIX + '/' + IMAGE_PATH, '');

export const defaultImageUrl = (fileName = 'unknown_avatar.jpg') =>
  CONSTANTS().API_URL +
  CONTROLLER_PREFIX +
  '/' +
  IMAGE_PATH +
  '/default/' +
  fileName;

export const fullImageUrl = (
  imageUrl: string,
  fileName = 'unknown_avatar.jpg',
) => {
  if (!imageUrl) return defaultImageUrl(fileName);
  else {
    imageUrl = imageUrl.replace(/\\/g, '/');
    if (!some(['http://', 'https://'], (el) => includes(imageUrl, el))) {
      return (
        CONSTANTS().API_URL +
        CONTROLLER_PREFIX +
        '/' +
        IMAGE_PATH +
        imageUrl.replace(`${UPLOAD_DIR}/${IMAGE_PATH}`, '')
      );
    }
  }
  return imageUrl;
};

export const fullUrl = (url: string) =>
  some(['http://', 'https://'], (el) => includes(url, el))
    ? url
    : CONSTANTS().API_URL + replacePath(url);

export const urlToPath = (url: string) =>
  url
    .replace(CONSTANTS().API_URL, '')
    .replace(`${CONTROLLER_PREFIX}/`, `${UPLOAD_DIR}/`);

export const mkdir = (path: PathLike) => {
  if (!existsSync(path)) mkdirSync(path);
};

export const formatPath = (path: string) => path.replace(/\\/g, '/');
