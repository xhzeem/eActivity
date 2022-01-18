import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  EventEntriesPageable,
  EventEntry,
} from 'src/app/model/event-entry.interface';

@Injectable({
  providedIn: 'root',
})
export class EventService {
  constructor(private http: HttpClient) {}

  indexAll(page: number, limit: number): Observable<EventEntriesPageable> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http.get<EventEntriesPageable>('/api/event', { params });
  }

  findAll(): Observable<EventEntry[]> {
    return this.http.get<EventEntry[]>('/api/event');
  }
  post(eventEntry: EventEntry): Observable<EventEntry> {
    return this.http.post<EventEntry>('/api/event', eventEntry);
  }

  findOne(id: number): Observable<EventEntry> {
    return this.http.get<EventEntry>('/api/event/' + id);
  }

  deleteOne(id: number | undefined): Observable<EventEntry> {
    return this.http.delete<EventEntry>('/api/event/' + id);
  }
  uploadImage(formData: FormData): Observable<any> {
    return this.http.post<FormData>('/api/event/image/upload', formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
