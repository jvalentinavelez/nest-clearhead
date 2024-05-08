import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity, ActivityImage } from './entities';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
  imports: [TypeOrmModule.forFeature([Activity, ActivityImage]), AuthModule],
  exports: [ActivitiesService, TypeOrmModule],
})
export class ActivitiesModule {}
