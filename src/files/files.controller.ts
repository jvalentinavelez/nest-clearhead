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
  Res,
} from '@nestjs/common';
import { FilesService } from './files.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
// import { fileNamer } from './helpers/fileNamer.helper';
import { fileNamer, fileFilter } from './helpers/index';
import { Response } from 'express';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @Get('activity/:imageName')
  findActivityImage(
    @Res() res: Response,
    @Param('imageName') imageName: string,
  ) {
    const path = this.filesService.getStaticActivityImage(imageName);
    res.sendFile(path);
  }

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

    const secureUrl = `${file.filename}`;

    return {
      secureUrl,
    };
  }
}
