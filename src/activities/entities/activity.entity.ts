import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ActivityImage } from './';

@Entity()
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
