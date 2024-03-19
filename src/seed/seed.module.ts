import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { ActivitiesModule } from 'src/activities/activities.module';
import { ActivitiesService } from 'src/activities/activities.service';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  imports: [ActivitiesModule],
})
export class SeedModule {}
