import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { detectMimeType } from 'nodemailer/lib/mime-funcs';
import slugify from 'slugify';
import { Repository } from 'typeorm';
import { formatPath, replacePath, urlToPath } from '../../helpers/file.helper';
import { FileEntity } from './File.entity';
import { BaseIdService } from '../../bases/BaseIdService';
import { CONSTANTS } from '../../configs/constants';

@Injectable()
export class FileService extends BaseIdService<FileEntity> {
  constructor(
    @InjectRepository(FileEntity)
    public repo: Repository<FileEntity>,
  ) {
    super(repo);
  }

  async getByUrls(urls: string[]) {
    return this.repo
      .createQueryBuilder()
      .where('file_url IN (:urls)', { urls: urls.map((x) => urlToPath(x)) })
      .getMany();
  }

  async insert(file: Express.Multer.File, isZip: boolean = false) {
    const f = await this.save({
      fileName: slugify(file.originalname),
      fileUrl: formatPath(file.path),
      fileSize: file.size,
      mimeType: detectMimeType(file.path),
    });
    if (!f) throw new InternalServerErrorException();
    return {
      id: f.id,
      name: f.fileName,
      url: CONSTANTS().API_URL + replacePath(file.path),
    };
  }

  async multiInsert(files: Express.Multer.File[]) {
    const baseImage = CONSTANTS().API_URL;
    const response = [];
    const fileInserts = [];
    files.forEach((file: Express.Multer.File) => {
      fileInserts.push({
        fileName: slugify(file.originalname),
        fileUrl: formatPath(file.path),
        fileSize: file.size,
        mimeType: detectMimeType(file.path),
      });
    });
    const fs = await this.insertBatch(fileInserts);
    if (!fs) throw new InternalServerErrorException();
    fs.forEach((f) => {
      response.push({
        id: f.id,
        name: f.fileName,
        url: baseImage + replacePath(f.fileUrl),
      });
    });
    return response;
  }

  async getUnusedFile() {
    return this.repo
      .createQueryBuilder('f')
      .withDeleted()
      .select('f.id as id, f.file_url as url')
      .leftJoin('user_files', 'uf', 'uf.file_id = f.id')
      .where('uf.id IS NULL')
      .andWhere('LOWER(f.mime_type) != :type', { type: 'directory' })
      .getRawMany();
  }

  async getByUserFiles(userFileIds: number[]) {
    return this.repo
      .createQueryBuilder('f')
      .select('f.id as id, f.file_url as fileUrl, uf.id as userFileId')
      .leftJoin('user_files', 'uf', 'uf.file_id = f.id')
      .where('uf.id IN (:userFileIds)', { userFileIds })
      .andWhere('LOWER(f.mime_type) = :type', { type: 'directory' })
      .getRawMany();
  }
}
