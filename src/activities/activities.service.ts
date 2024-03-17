import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
  NotFoundException,
} from '@nestjs/common';
import { CreateActivityDto } from './dto/create-activity.dto';
import { UpdateActivityDto } from './dto/update-activity.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Activity } from './entities/activity.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ActivitiesService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
  ) {}

  async create(createActivityDto: CreateActivityDto) {
    try {
      const activity = this.activityRepository.create(createActivityDto);
      await this.activityRepository.save(activity);
      return activity;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  //TODO: Paginar
  async findAll() {
    try {
      const activities = await this.activityRepository.find({});
      return activities;
    } catch (error) {
      this.handleDBExceptions(error);
    }
  }

  async findOne(id: string): Promise<Activity> {
    const activity = await this.activityRepository.findOneBy({ id });
    if (!activity) {
      throw new NotFoundException(`Activity with id ${id} not found`);
    }
    return activity;
  }

  update(id: number, updateActivityDto: UpdateActivityDto) {
    return `This action updates a #${id} activity`;
  }

  async remove(id: string) {
    const activity = await this.findOne(id);

    await this.activityRepository.remove(activity);
  }

  private handleDBExceptions(error: any) {
    if (error.code === '23505') {
      throw new BadRequestException(error.detail);
    }
    this.logger.error(error);
    throw new InternalServerErrorException(
      'Unexpected error, check server logs',
    );
  }
}
