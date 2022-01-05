import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  PostEntriesPageable,
  PostEntry,
} from 'src/app/model/post-entry.interface';

@Injectable({
  providedIn: 'root',
})
export class PostService {
  constructor(private http: HttpClient) {}

  indexAll(page: number, limit: number): Observable<PostEntriesPageable> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http.get<PostEntriesPageable>('/api/post', { params });
  }

  findAll(): Observable<PostEntry[]> {
    return this.http.get<PostEntry[]>('/api/post');
  }
  post(postEntry: PostEntry): Observable<PostEntry> {
    return this.http.post<PostEntry>('/api/post', postEntry);
  }

  findOne(id: number): Observable<PostEntry> {
    return this.http.get<PostEntry>('/api/post/' + id);
  }

  deleteOne(id: number | undefined): Observable<PostEntry> {
    return this.http.delete<PostEntry>('/api/post/' + id);
  }
  uploadImage(formData: FormData): Observable<any> {
    return this.http.post<FormData>('/api/post/image/upload', formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
