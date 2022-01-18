import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from '../model/user.interface';

export interface LoginForm {
  email: string;
  password: string;
}

export const JWT_NAME = 'blog-token';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  constructor(private http: HttpClient, private jwtHelper: JwtHelperService) {}

  login(loginForm: LoginForm) {
    return this.http
      .post<any>('/api/user/login', {
        email: loginForm.email,
        password: loginForm.password,
      })
      .pipe(
        map((token) => {
          localStorage.setItem(JWT_NAME, token.access_token);
          return token;
        })
      );
  }

  register(user: User) {
    return this.http.post<any>('./api/user/', user).pipe(map((user) => user));
  }

  display() {
    return !!localStorage.getItem(JWT_NAME);
  }
  getRole() {
    return of(localStorage.getItem(JWT_NAME)).pipe(
      switchMap((jwt) =>
        of(this.jwtHelper.decodeToken(jwt || '')).pipe(
          map((jwt: any) => jwt.user.role)
        )
      )
    );
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem(JWT_NAME);
    return !this.jwtHelper.isTokenExpired(token || '');
  }
  // userIsUser(): Observable<any> {
  //   const token = localStorage.getItem(JWT_NAME);
  //   return of(token).pipe(
  //     switchMap((jwt) =>
  //       of(this.jwtHelper.decodeToken(jwt || '')).pipe(
  //         map((jwt: any) => {
  //           let hasPermission = false;

  //           if (jwt.user.id === jwt.user.id) {
  //             hasPermission = true;
  //           }

  //           return jwt && hasPermission;
  //         })
  //       )
  //     )
  //   );
  // }
  getUserId(): Observable<number> {
    return of(localStorage.getItem(JWT_NAME)).pipe(
      switchMap((jwt) =>
        of(this.jwtHelper.decodeToken(jwt || '')).pipe(
          map((jwt: any) => jwt.user.id)
        )
      )
    );
  }

  logout(){
    return localStorage.removeItem(JWT_NAME);
  }
}
