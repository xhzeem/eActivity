import { UserEntity } from 'src/user/models/user.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('blog_entry')
export class BlogEntryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  articleTitle: string;

  @Column()
  slug: string;

  @Column({ default: '' })
  articleDescription: string;

  @Column({ default: '' })
  articleBody: string;

  @Column('date', { default: () => 'CURRENT_DATE::text::date' })
  creationDate: Date;

  @Column('date', { default: () => 'CURRENT_DATE::text::date' })
  updatedDate: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedDate = new Date();
  }

  @Column({ default: 0 })
  articleLikes: number;

  @Column({ nullable: true })
  headerImage: string;

  @Column({ nullable: true })
  articlePublishDate: Date;

  @Column({ nullable: true })
  isPublished: boolean;

  @ManyToOne(type => UserEntity, user => user.blogEntries)
  author: UserEntity;
}
