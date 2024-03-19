import { Module } from '@nestjs/common';
import { ActivitiesService } from './activities.service';
import { ActivitiesController } from './activities.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Activity, ActivityImage } from './entities';

@Module({
  controllers: [ActivitiesController],
  providers: [ActivitiesService],
  imports: [TypeOrmModule.forFeature([Activity, ActivityImage])],
  exports: [ActivitiesService, TypeOrmModule],
})
export class ActivitiesModule {}
