import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Activity } from './';

@Entity({ name: 'activity_images' })
export class ActivityImage {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('text')
  url: string;

  @ManyToOne(() => Activity, (activity) => activity.images, {
    onDelete: 'CASCADE',
  })
  activity: Activity;
}
