import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { multerConfig } from '../../configs/multer.conf';
import { FileController } from './file.controller';
import { FileEntity } from './File.entity';
import { FileService } from './file.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FileEntity]),
    MulterModule.register({
      dest: multerConfig.dest,
    }),
  ],
  controllers: [FileController],
  providers: [FileService],
  exports: [FileService],
})
export class FileModule {}
