import { Injectable } from '@nestjs/common';
import { ActivitiesService } from './../activities/activities.service';
import { initialData } from './data/seed-data';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../auth/entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Injectable()
export class SeedService {
  constructor(
    private readonly activiesService: ActivitiesService,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async runSeed() {
    await this.deleteTables();
    const adminUser = await this.insertUsers();

    await this.insertNewActivites(adminUser);

    return 'SEED Executed';
  }

  private async deleteTables() {
    await this.activiesService.deleteAllActivities();
    const queryBuilder = this.userRepository.createQueryBuilder();
    await queryBuilder.delete().where({}).execute();
  }

  private async insertUsers() {
    const seedUsers = initialData.users;
    const users: User[] = [];
    seedUsers.forEach((user) => {
      users.push(
        this.userRepository.create({
          ...user,
          password: bcrypt.hashSync(user.password, 10),
        }),
      );
    });
    const dbUsers = await this.userRepository.save(users);
    dbUsers.forEach((user) => {
      delete user.password;
    });

    console.log(dbUsers);
    return dbUsers[0];
  }

  private async insertNewActivites(user: User) {
    await this.activiesService.deleteAllActivities();
    const activities = initialData.activities;
    const insertPromises = [];
    activities.forEach((acitivity) => {
      insertPromises.push(this.activiesService.create(acitivity, user));
    });
    await Promise.all(insertPromises);
    return true;
  }
}
