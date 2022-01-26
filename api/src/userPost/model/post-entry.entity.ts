import { UserEntity } from 'src/user/models/user.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('post_entry')
export class PostEntryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  postBody: string;

  @Column('date', { default: () => 'CURRENT_DATE::text::date' })
  creationDate: Date;

  @Column('date', { default: () => 'CURRENT_DATE::text::date' })
  updatedDate: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedDate = new Date();
  }

  @Column({ default: 0 })
  postLikes: number;

  @Column({ nullable: true })
  postImage: string;

  @Column({ nullable: true })
  postPublishDate: Date;

  @Column({ nullable: true })
  isPublished: boolean;

  @ManyToOne(type => UserEntity, user => user.postEntries)
  author: UserEntity;
  
  // @ManyToOne(type => UserEntity, user => user.blogEntries)
  // author: UserEntity;
}
