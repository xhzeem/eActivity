import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Observable } from 'rxjs';
import {
  EventEntriesPageable,
  EventEntry,
  Meta,
} from 'src/app/model/event-entry.interface';
import {
  AuthenticationService,
  JWT_NAME,
} from 'src/app/service/authentication.service';
import { EventService } from 'src/app/service/event/event.service';
import { of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { UserService } from 'src/app/service/user-service/user.service';
import { User } from 'src/app/model/user.interface';
import { WINDOW } from 'src/app/window-token';
export interface File {
  data: any;
  progress: number;
  inProgress: boolean;
}

@Component({
  selector: 'app-events',
  templateUrl: './events.component.html',
  styleUrls: ['./events.component.scss'],
})
export class EventsComponent implements OnInit {
  dataSourceTwo!: EventEntriesPageable;
  dataSource: Observable<EventEntriesPageable> = this.eventService.indexAll(
    1,
    10
  );

  token: any = localStorage.getItem(JWT_NAME);
  userId = this.parseJwt(this.token).user.id;

  initDataSource() {
    this.eventService
      .indexAll(1, 10)
      .pipe(
        map(
          (eventEntriesPageable: EventEntriesPageable) =>
            (this.dataSourceTwo = eventEntriesPageable)
        )
      )
      .subscribe();
  }
  origin = this.window.location.origin;

  constructor(
    private eventService: EventService,
    public authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    @Inject(WINDOW) private window: Window

  ) {}
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
  config = {
    toolbar: [['bold', 'italic', 'underline', 'strike']],
  };
  // new event
  @ViewChild('fileUpload', { static: false }) fileUpload!: ElementRef;

  file: File = {
    data: null,
    inProgress: false,
    progress: 0,
  };
  form!: FormGroup;
  isDisabled: boolean = false;
  ngOnInit(): void {
    this.form = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      eventTitle: [null, [Validators.required, Validators.maxLength(120)]],
      eventBody: [null, [Validators.required, Validators.maxLength(2000)]],
      eventDescription: [
        null,
        [Validators.required, Validators.maxLength(175)],
      ],
      dueDate: [null, [Validators.required]],
      eventPrice: [null, [Validators.pattern('^[0-9]*$')]],
      eventSeats: [
        { value: null, disabled: true },
        [Validators.required, Validators.pattern('^[0-9]*$')],
      ],
      eventImage: [null, [Validators.required]],
    });
    this.initDataSource();
  }
  countArray(cA: any): number {
    return JSON.parse(cA).length;
  }
  post() {
    this.eventService.post(this.form.getRawValue()).subscribe();
    window.location.reload();
  }

  onClick() {
    const fileInput = this.fileUpload.nativeElement;
    fileInput.click();
    fileInput.onchange = () => {
      this.file = {
        data: fileInput.files[0],
        inProgress: false,
        progress: 0,
      };
      this.fileUpload.nativeElement.value = '';
      this.uploadFile();
    };
  }

  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.file.data);
    this.file.inProgress = true;
    this.eventService
      .uploadImage(formData)
      .pipe(
        map((event) => {
          switch (event.type) {
            case HttpEventType.UploadProgress:
              this.file.progress = Math.round(
                (event.loaded * 100) / event.total
              );
              break;
            case HttpEventType.Response:
              return event;
          }
        }),
        catchError((error: HttpErrorResponse) => {
          this.file.inProgress = false;
          return of('Upload failed');
        })
      )
      .subscribe((event: any) => {
        if (typeof event === 'object') {
          this.form.patchValue({ eventImage: event.body.filename });
        }
      });
  }
  deletePost(id: number | undefined) {
    this.eventService.deleteOne(id).subscribe();
    window.location.reload();
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
}
