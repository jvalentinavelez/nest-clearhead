import { Injectable } from '@nestjs/common';
import { ActivitiesService } from './../activities/activities.service';

@Injectable()
export class SeedService {
  constructor(private readonly activiesService: ActivitiesService) {}

  async runSeed() {
    await this.insertNewProducts();
    return 'SEED Executed';
  }

  private async insertNewProducts() {
    this.activiesService.deleteAllActivities();
    return true;
  }
}
