import { Observable } from 'rxjs';
import { EventService } from '../service/event.service';
import { Image } from '../model/event-image.controller';
import { EventEntry } from '../model/event-entry.interface';
export declare const storage: {
    storage: any;
};
export declare class EventController {
    private eventService;
    constructor(eventService: EventService);
    create(eventEntry: EventEntry, req: any): Observable<EventEntry>;
    index(page?: number, limit?: number): Observable<import("nestjs-typeorm-paginate").Pagination<EventEntry, import("nestjs-typeorm-paginate").IPaginationMeta>>;
    findOne(id: number): Observable<EventEntry>;
    updateOne(id: number, eventEntry: EventEntry): Observable<EventEntry>;
    deleteOne(id: number): Observable<any>;
    uploadFile(file: any, req: any): Observable<Image>;
    findImage(imagename: any, res: any): Observable<Object>;
}
