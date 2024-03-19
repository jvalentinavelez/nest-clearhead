import { Injectable } from '@nestjs/common';
import { ActivitiesService } from './../activities/activities.service';

@Injectable()
export class SeedService {
  constructor(private readonly activiesService: ActivitiesService) {}

  async runSeed() {
    await this.insertNewActivites();
    return 'SEED Executed';
  }

  private async insertNewActivites() {
    this.activiesService.deleteAllActivities();
    return true;
  }
}
