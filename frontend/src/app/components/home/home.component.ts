import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, Inject, OnInit, ViewChild } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import * as AOS from 'aos';
import { Observable, of } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import {
  PostEntriesPageable,
  PostEntry,
} from 'src/app/model/post-entry.interface';
import { User } from 'src/app/model/user.interface';
import { PostService } from 'src/app/service/post/post.service';
import { UserService } from 'src/app/service/user-service/user.service';
import { JWT_NAME } from 'src/app/service/authentication.service';
import { WINDOW } from 'src/app/window-token';

export interface File {
  data: any;
  progress: number;
  inProgress: boolean;
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  @ViewChild('fileUpload', { static: false }) fileUpload!: ElementRef;
  file: File = {
    data: null,
    inProgress: false,
    progress: 0,
  };
  form!: FormGroup;
  token: any = localStorage.getItem(JWT_NAME);
  userId = this.parseJwt(this.token).user.id;

  // dataSource: Observable<PostEntriesPageable> = this.postService.indexAll(1, 10);
  dataSource: Observable<PostEntriesPageable> = this.postService.indexAll(
    1,
    10
  );

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
  origin = this.window.location.origin;

  constructor(
    private formBuilder: FormBuilder,
    private postService: PostService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    @Inject(WINDOW) private window: Window

  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [{ value: null, disabled: true }],
      postBody: [null, [Validators.required, Validators.maxLength(1000)]],
      postImage: [null],
    });
    AOS.init();
  }

  isSuccess = false;
  post() {
    this.postService.post(this.form.getRawValue()).subscribe((res) => {
      this.form.reset();
      this.isSuccess = true;
    });
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
    this.postService
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
          this.form.patchValue({ postImage: event.body.filename });
        }
      });
  }

  deletePost(id: number | undefined) {
    this.postService.deleteOne(id).subscribe();
    window.location.reload();
  }
}
