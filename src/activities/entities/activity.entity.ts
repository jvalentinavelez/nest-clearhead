import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ActivityImage } from './';
import { User } from '../../auth/entities/user.entity';

@Entity({ name: 'activities' })
export class Activity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('text', {
    unique: true,
  })
  title: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'text',
    nullable: true,
  })
  type: string;

  @Column('text', {
    unique: true,
  })
  slug: string;

  @Column('text', {
    array: true,
    default: [],
  })
  tags: string[];

  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.title;
    }

    this.slug = this.slug
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }

  //images
  @OneToMany(() => ActivityImage, (activityImage) => activityImage.activity, {
    cascade: true,
    eager: true,
  })
  images?: ActivityImage[];

  @ManyToOne(() => User, (user) => user.activity, { eager: true })
  user: User;

  @BeforeUpdate()
  CheckSlugUpdate() {
    this.slug = this.slug
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replaceAll(' ', '_')
      .replaceAll("'", '');
  }
}
