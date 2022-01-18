import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  IPaginationOptions,
  paginate,
  Pagination,
} from 'nestjs-typeorm-paginate';
import { from, Observable } from 'rxjs';
import { User } from 'src/user/models/user.interface';
import { UserService } from 'src/user/service/user.service';
import { Repository } from 'typeorm';
import { EventEntryEntity } from '../model/event-entry.entity';
import { EventEntry } from '../model/event-entry.interface';
import { switchMap, map, tap } from 'rxjs/operators';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(EventEntryEntity)
    private readonly eventRepository: Repository<EventEntryEntity>,
    private userService: UserService,
  ) {}

  create(user: User, eventEntry: EventEntry): Observable<EventEntry> {
    eventEntry.author = user;
    return from(this.eventRepository.save(eventEntry));
  }

  paginateAll(options: IPaginationOptions): Observable<Pagination<EventEntry>> {
    return from(
      paginate<EventEntry>(this.eventRepository, options, {
        relations: ['author'],
        order: { id: 'DESC' },
      }),
    ).pipe(map((eventEntry: Pagination<EventEntry>) => eventEntry));
  }

  findAll(): Observable<EventEntry[]> {
    return from(
      this.eventRepository.find({
        relations: ['author'],
        order: { id: 'DESC' },
      }),
    );
  }

  findOne(id: number): Observable<EventEntry> {
    return from(
      this.eventRepository.findOne({ id }, { relations: ['author'] }),
    );
  }

  updateOne(id: number, eventEntry: EventEntry): Observable<EventEntry> {
    return from(this.eventRepository.update(id, eventEntry)).pipe(
      switchMap(() => this.findOne(id)),
    );
  }
  deleteOne(id: number): Observable<any> {
    return from(this.eventRepository.delete(id));
  }
}
