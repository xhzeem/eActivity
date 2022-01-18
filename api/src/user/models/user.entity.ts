import { BlogEntryEntity } from 'src/blog/model/blog-entry.entity';
import { EventEntryEntity } from 'src/events/model/event-entry.entity';
import {
  BeforeInsert,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { UserRole } from './user.interface';

@Entity()
export class UserEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  bio: string;

  @Column({ unique: true })
  username: string;

  @Column({ unique: true })
  email: string;

  @Column({ select: false })
  password: string;

  @Column({ type: 'enum', enum: UserRole})
  role: UserRole;

  @Column({ nullable: true, default: 'default.png' })
  avatar: string;

  @OneToMany(
    (type) => BlogEntryEntity,
    (blogEntryEntity) => blogEntryEntity.author,
  )
  blogEntries: BlogEntryEntity[];

  @OneToMany(
    (type) => EventEntryEntity,
    (eventEntryEntity) => eventEntryEntity.author,
  )
  eventEntries: EventEntryEntity[];

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }
}
