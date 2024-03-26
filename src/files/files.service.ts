import { BadRequestException, Injectable, Post } from '@nestjs/common';
import { existsSync } from 'fs';
import { join } from 'path';

@Injectable()
export class FilesService {
  getStaticActivityImage(imageName: string) {
    const path = join(__dirname, '../../static/activities', imageName);
    if (!existsSync(path))
      throw new BadRequestException(
        `No activity found with image ${imageName}`,
      );
    return path;
  }
}
