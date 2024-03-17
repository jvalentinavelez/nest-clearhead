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
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';

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
  async findAll(paginatioDto: PaginationDto) {
    const { limit = 10, offset = 0 } = paginatioDto;
    const activities = await this.activityRepository.find({
      take: limit,
      skip: offset,
      //TODO: relaciones
    });
    return activities;
  }

  async findOne(term: string): Promise<Activity> {
    let activity: Activity;

    if (isUUID(term)) {
      activity = await this.activityRepository.findOneBy({ id: term });
    } else {
      activity = await this.activityRepository.findOneBy({ slug: term });
    }
    if (!activity) {
      throw new NotFoundException(`Activity with term ${term} not found`);
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
