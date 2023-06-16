import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Res,
  UploadedFile,
  UploadedFiles,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { multerConfig, multerOptions } from '../../configs/multer.conf';
import { FileService } from './file.service';
import { AuthUser } from '../../common/directives/auth.decorator';
import { UserEntity } from '../users/entities/User.entity';
import { TrueFalse } from '../../types/common.enum';

@Controller('file')
export class FileController {
  constructor(private readonly fileService: FileService) {}

  @Post('/upload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async upload(@UploadedFile() file: Express.Multer.File) {
    const retVal = await this.fileService.insert(file);
    return retVal;
  }

  @Post('/privateUpload')
  @UseInterceptors(FileInterceptor('file', multerOptions))
  async privateUpload(
    @AuthUser() user: UserEntity,
    @UploadedFile() file: Express.Multer.File,
    @Body() body,
  ) {
    const isZip =
      +body['isZipFolder'] === TrueFalse.TRUE &&
      file.mimetype === 'application/zip';
    const retVal = await this.fileService.insert(file, isZip);
    return retVal;
  }

  @Post('/uploads')
  @UseInterceptors(FilesInterceptor('files', 20, multerOptions))
  async uploads(@UploadedFiles() files: Express.Multer.File[]) {
    const response = await this.fileService.multiInsert(files);
    return response;
  }

  @Post('/privateUploads')
  @UseInterceptors(FilesInterceptor('files', 20, multerOptions))
  async privateUploads(
    @AuthUser() user: UserEntity,
    @UploadedFiles() files: Express.Multer.File[],
  ) {
    const response = await this.fileService.multiInsert(files);
    return response;
  }

  @Get('/:filePath/:date/:fileName')
  seeUploadedFile(
    @Param('filePath') filePath,
    @Param('date') date,
    @Param('fileName') fileName,
    @Res() res,
  ) {
    return res.sendFile(fileName, {
      root: multerConfig.dest + '/' + filePath + '/' + date,
    });
  }
}
