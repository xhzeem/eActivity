import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from 'src/app/model/user.interface';

export interface UserData {
  items: User[];
  meta: Meta;
  links: Links;
}
export interface Meta {
  totalItems: number;
  itemCount: number;
  itemsPerPage: number;
  totalPages: number;
  currentPage: number;
}

export interface Links {
  first: string;
  previous: string;
  next: string;
  last: string;
}
@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  findOne(id: number): Observable<User> {
    return this.http.get('/api/user/' + id).pipe(map((user: User) => user));
  }

  updateOne(user: any): Observable<User> {
    return this.http.put('api/user/' + user.id, user);
  }
  // findAllNoParams(): Observable<User[]> {
  //   return this.http.get<User[]>('/api/user');
  // }

  findAll(page: number, size: number): Observable<UserData> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(size));

    return this.http.get<UserData>('/api/user', { params }).pipe(
      map((userData: UserData) => userData),
      catchError((err) => throwError(err))
    );
  }

  uploadProfileImage(formData: FormData): Observable<any> {
    return this.http.post<FormData>('/api/user/avatar', formData, {
      reportProgress: true,
      observe: 'events',
    });
  }

  paginateByName(
    page: number,
    size: number,
    username: string
  ): Observable<UserData> {
    let params = new HttpParams();

    params = params.append('page', String(page));
    params = params.append('limit', String(size));
    params = params.append('username', username);

    return this.http.get<UserData>('/api/user', { params }).pipe(
      map((userData: UserData) => userData),
      catchError((err) => throwError(err))
    );
  }
}
