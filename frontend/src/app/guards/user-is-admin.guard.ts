import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { JWT_NAME } from '../service/authentication.service';


@Injectable({
  providedIn: 'root'
})
export class UserIsAdminGuard implements CanActivate {
  constructor(private _router: Router){}

  canActivate(route: ActivatedRouteSnapshot) {
    const token: any = localStorage.getItem(JWT_NAME);
    const role: string = this.parseJwt(token).user.role
    if(role !== "admin"){
      console.log("Forbidden")
      this._router.navigate(['/']);
      return false;
    }else {
      console.log("successful")
      return true;
    }
  }

  parseJwt(token: any) {
    var base64Url = token.split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    var jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map(function (c) {
          return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
        })
        .join('')
    );
    return JSON.parse(jsonPayload);
  }
}
