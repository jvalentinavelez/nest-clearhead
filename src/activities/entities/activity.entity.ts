import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('text', {
    unique: true,
  })
  slug: string;

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
}
