import { UserEntity } from 'src/user/models/user.entity';
import {
  BeforeUpdate,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity('event_entry')
export class EventEntryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  eventTitle: string;
  @Column()
  eventBody: string;
  @Column()
  eventDescription: string;
  @Column({ nullable: true })
  dueDate: string;

  @Column('date', { default: () => 'CURRENT_DATE::text::date' })
  creationDate: Date;

  @Column('date', { default: () => 'CURRENT_DATE::text::date' })
  updatedDate: Date;

  @BeforeUpdate()
  updateTimestamp() {
    this.updatedDate = new Date();
  }

  @Column({ default: 0 })
  eventLikes: number;

  @Column({ nullable: true, default: 'default.png' })
  eventImage: string;

  @ManyToOne((type) => UserEntity, (user) => user.eventEntries)
  author: UserEntity;
}
