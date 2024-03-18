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
import { Repository } from 'typeorm';
import { PaginationDto } from 'src/common/dtos/pagination.dto';
import { validate as isUUID } from 'uuid';
import { Activity, ActivityImage } from './entities';

@Injectable()
export class ActivitiesService {
  private readonly logger = new Logger('ProductsService');

  constructor(
    @InjectRepository(Activity)
    private readonly activityRepository: Repository<Activity>,
    @InjectRepository(ActivityImage)
    private readonly activityImageRepository: Repository<ActivityImage>,
  ) {}

  async create(createActivityDto: CreateActivityDto) {
    try {
      const { images = [], ...activityDetails } = createActivityDto;
      const activity = this.activityRepository.create({
        ...activityDetails,
        images: images.map((image) =>
          this.activityImageRepository.create({ url: image }),
        ),
      });
      await this.activityRepository.save(activity);
      return { ...activity, images };
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
      relations: {
        images: true,
      },
    });
    return activities.map(({ images, ...rest }) => ({
      ...rest,
      images: images.map((img) => img.url),
    }));
  }

  async findOne(term: string): Promise<Activity> {
    let activity: Activity;

    if (isUUID(term)) {
      activity = await this.activityRepository.findOneBy({ id: term });
    } else {
      const queryBuilder =
        this.activityRepository.createQueryBuilder('activity');
      activity = await queryBuilder
        .where(' UPPER(title)=:title or slug=:slug', {
          title: term.toUpperCase(),
          slug: term.toLowerCase(),
        })
        .leftJoinAndSelect('activity.images', 'activityImages')
        .getOne();
    }
    if (!activity) {
      throw new NotFoundException(`Activity with term ${term} not found`);
    }
    return activity;
  }

  async findOnePlain(term: string) {
    const { images = [], ...rest } = await this.findOne(term);
    return {
      ...rest,
      images: images.map((image) => image.url),
    };
  }

  async update(id: string, updateActivityDto: UpdateActivityDto) {
    const activity = await this.activityRepository.preload({
      id: id,
      ...updateActivityDto,
      images: [],
    });
    if (!activity)
      throw new NotFoundException(`Activitiy with id ${id} not found`);
    try {
      await this.activityRepository.save(activity);
      return activity;
    } catch (error) {
      this.handleDBExceptions(error);
    }
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
