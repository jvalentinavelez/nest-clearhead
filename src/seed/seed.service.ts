import { Injectable } from '@nestjs/common';
import { ActivitiesService } from './../activities/activities.service';
import { initialData } from './data/seed-data';

@Injectable()
export class SeedService {
  constructor(private readonly activiesService: ActivitiesService) {}

  async runSeed() {
    await this.insertNewActivites();

    const activities = initialData.activities;
    const insertPromises = [];

    activities.forEach((activity) => {
      insertPromises.push(this.activiesService.create(activity));
    });

    await Promise.all(insertPromises);

    return 'SEED Executed';
  }

  private async insertNewActivites() {
    this.activiesService.deleteAllActivities();
    return true;
  }
}
