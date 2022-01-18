import { IPaginationOptions, Pagination } from 'nestjs-typeorm-paginate';
import { Observable } from 'rxjs';
import { User } from 'src/user/models/user.interface';
import { UserService } from 'src/user/service/user.service';
import { Repository } from 'typeorm';
import { EventEntryEntity } from '../model/event-entry.entity';
import { EventEntry } from '../model/event-entry.interface';
export declare class EventService {
    private readonly eventRepository;
    private userService;
    constructor(eventRepository: Repository<EventEntryEntity>, userService: UserService);
    create(user: User, eventEntry: EventEntry): Observable<EventEntry>;
    paginateAll(options: IPaginationOptions): Observable<Pagination<EventEntry>>;
    findAll(): Observable<EventEntry[]>;
    findOne(id: number): Observable<EventEntry>;
    updateOne(id: number, eventEntry: EventEntry): Observable<EventEntry>;
    deleteOne(id: number): Observable<any>;
}
