import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
// import { fileNamer } from './helpers/fileNamer.helper';
import { fileNamer, fileFilter } from './helpers/index';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Post('activity')
  @UseInterceptors(
    FileInterceptor('file', {
      fileFilter: fileFilter,
      // limits: { fileSize: 200 },
      storage: diskStorage({
        destination: './static/activities',
        filename: fileNamer,
      }),
    }),
  )
  uploadActivityImage(@UploadedFile() file: Express.Multer.File) {
    console.log({ fileInController: file });
    if (!file) {
      throw new BadRequestException('Make sure that the file is an image');
    }
    return {
      fileName: file.originalname,
    };
  }
}
