import { Injectable } from '@angular/core';
import { ActivatedRoute, CanActivate, Router, ParamMap } from '@angular/router';

import { AuthenticationService } from '../service/authentication.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthenticationService, private router: Router) {}
  canActivate(): boolean {
    if (!this.auth.isAuthenticated()) {
      this.router.navigate(['login']);
      return false;
    }
    return true;
  }
}
