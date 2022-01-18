import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  BlogEntriesPageable,
  BlogEntry,
} from 'src/app/model/blog-entry.interface';

@Injectable({
  providedIn: 'root',
})
export class BlogService {
  constructor(private http: HttpClient) {}

  indexAll(page: number, limit: number): Observable<BlogEntriesPageable> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(limit));

    return this.http.get<BlogEntriesPageable>('/api/blog', { params });
  }

  articlePost(blogEntry: BlogEntry): Observable<BlogEntry> {
    return this.http.post<BlogEntry>('/api/blog', blogEntry);
  }

  findOne(slug: string): Observable<BlogEntry> {
    return this.http.get<BlogEntry>('/api/blog/' + slug);
  }

  deleteOne(id: number | undefined): Observable<BlogEntry> {
    return this.http.delete<BlogEntry>('/api/blog/' + id);
  }
  uploadImage(formData: FormData): Observable<any> {
    return this.http.post<FormData>('/api/blog/image/upload', formData, {
      reportProgress: true,
      observe: 'events',
    });
  }
}
