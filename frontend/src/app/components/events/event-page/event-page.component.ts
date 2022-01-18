import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { EventEntry } from 'src/app/model/event-entry.interface';
import { User } from 'src/app/model/user.interface';
import { AuthenticationService, JWT_NAME } from 'src/app/service/authentication.service';
import { EventService } from 'src/app/service/event/event.service';
import { UserService } from 'src/app/service/user-service/user.service';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss'],
})
export class EventPageComponent implements OnInit {
  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    public authService: AuthenticationService,

  ) {}
  token: any = localStorage.getItem(JWT_NAME);
  userId = this.parseJwt(this.token).user.id;
  private userId$: Observable<number> = this.activatedRoute.params.pipe(
    map((params: Params) => parseInt(params['id']))
  );

  user$: Observable<User> = this.userId$.pipe(
    switchMap((userId: number) => this.userService.findOne(this.userId))
  );
  parseJwt(token: any) {
    if (this.token !== null) {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(
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

  eventEntry$: Observable<EventEntry> = this.activatedRoute.params.pipe(
    switchMap((params: Params) => {
      const id: number = params['id'];
      return this.eventService
        .findOne(id)
        .pipe(map((eventEntry: EventEntry) => eventEntry));
    })
  );
  ngOnInit(): void {}
  
  deletePost(id: number | undefined) {
    this.eventService.deleteOne(id).subscribe();
    this.router.navigate(['/events'])
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
