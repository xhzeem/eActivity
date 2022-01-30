import { Component, Inject, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap, tap } from 'rxjs/operators';
import { EventEntry } from 'src/app/model/event-entry.interface';
import { User } from 'src/app/model/user.interface';
import {
  AuthenticationService,
  JWT_NAME,
} from 'src/app/service/authentication.service';
import { EventService } from 'src/app/service/event/event.service';
import {
  UserData,
  UserService,
} from 'src/app/service/user-service/user.service';
import { WINDOW } from 'src/app/window-token';

@Component({
  selector: 'app-event-page',
  templateUrl: './event-page.component.html',
  styleUrls: ['./event-page.component.scss'],
})
export class EventPageComponent implements OnInit {
  counter: number = 0;
  count(): number {
    return ++this.counter;
  }
  // count(e: any, i: any): number {
  //   if (this.checkEnrolled(e, i)) {
  //     this.counter++;
  //   }
  //   return this.counter;
  // }
  falser(): boolean {
    return false;
  }
  origin = this.window.location.origin;

  constructor(
    private eventService: EventService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private formbuilder: FormBuilder,
    private userService: UserService,
    public authService: AuthenticationService,
    @Inject(WINDOW) private window: Window

  ) {}
  token: any = localStorage.getItem(JWT_NAME);
  userId = this.parseJwt(this.token).user.id;
  private userId$: Observable<number> = this.activatedRoute.params.pipe(
    map((params: Params) => parseInt(params['id']))
  );

  dataSourceTwo: Observable<UserData> = this.userService.findAll(1, 99);

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

  deletePost(id: number | undefined) {
    this.eventService.deleteOne(id).subscribe();
    this.router.navigate(['/events']);
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }

  isEnrolled(enrollStr: any, userId: any): boolean {
    const list = JSON.parse(enrollStr);
    return list.includes(userId);
  }

  form!: FormGroup;
  eventId: any = location.href.split('events/')[1];

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      eventEnrolles: [null, [Validators.required]],
    });
    this.eventService
      .findOne(Number(this.eventId))
      .pipe(
        tap((event: EventEntry) => {
          this.form.patchValue({
            id: event.id,
            eventEnrolles: event.eventEnrolles,
          });
        })
      )
      .subscribe();
  }

  // changeValue(enrollStr: any, userId: any) {
  //   const list = JSON.parse(enrollStr);
  //   if (!list.includes(userId)) {
  //     list.push(userId);
  //     const newEnrolles = '[' + list.toString() + ']';
  //     (document.getElementById('enrollesInput') as HTMLInputElement).value =
  //       newEnrolles;
  //   }
  // }
  changeValue(enrollStr: any, userId: any) {
    const list = JSON.parse(enrollStr);
    if (!list.includes(userId)) {
      list.push(userId);
      const newEnrolles = '[' + list.toString() + ']';
      // (document.getElementById('enrollesInput') as HTMLInputElement).value =
      //   newEnrolles;
      const newData: any = { eventEnrolles: newEnrolles };
      const xhttp = new XMLHttpRequest();
      xhttp.open('PUT', 'api/event/' + this.eventId, true);
      xhttp.setRequestHeader('Content-Type', 'application/json');
      xhttp.onload = function () {
        window.location.reload();
      };
      xhttp.send(JSON.stringify(newData));
    }
  }
  // getUserEnrolled(userId: number) {
  //   const xhttp = new XMLHttpRequest();
  //   xhttp.open('GET', 'api/user/' + userId, true);
  //   xhttp.setRequestHeader('Content-Type', 'application/json');
  //   xhttp.send();
  // }

  countArray(cA: any): number {
    return JSON.parse(cA).length;
  }
  checkEnrolled(enrollStr: any, userId: any) {
    const list = JSON.parse(enrollStr);
    if (!list.includes(userId)) {
      return false;
    }
    return userId;
  }
  update() {
    this.eventService.updateOne(this.form.getRawValue()).subscribe();
  }
  exp = 'chevron-down';
  expand() {
    if (this.exp === 'chevron-down') {
      this.exp = 'chevron-up';
    } else {
      this.exp = 'chevron-down';
    }
  }
}
