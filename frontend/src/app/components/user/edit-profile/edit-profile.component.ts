import { HttpErrorResponse, HttpEventType } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/model/user.interface';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user-service/user.service';
import { Router } from '@angular/router';


export interface File {
  data: any;
  progress: number;
  inProgress: boolean;
}


@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})


export class EditProfileComponent implements OnInit {
  form!: FormGroup;


  @ViewChild('fileUpload', { static: false }) fileUpload!: ElementRef;


  file: File = {
    data: null,
    inProgress: false,
    progress: 0,
  };


  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthenticationService,
    private userService: UserService,
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      id: [{ value: null, disabled: true }, [Validators.required]],
      name: [null, [Validators.required]],
      username: [null, [Validators.required]],
      bio: [null, [Validators.required]],
      avatar!: [null],
    });
    this.authService
      .getUserId()
      .pipe(
        switchMap((id: number) =>
          this.userService.findOne(id).pipe(
            tap((user: User) => {
              this.form.patchValue({
                id: user.id,
                name: user.name,
                username: user.username,
                avatar: user.avatar,
                bio: user.bio
              });
            })
          )
        )
      )
      .subscribe();
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
      window.location.reload();
    };
  }
  uploadFile() {
    const formData = new FormData();
    formData.append('file', this.file.data);
    this.file.inProgress = true;
    this.userService
      .uploadProfileImage(formData)
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
        if (typeof (event) === 'object') {
          this.form.patchValue({ avatar: event.body.avatar });
        }
      });
  }
  update() {
    this.userService.updateOne(this.form.getRawValue()).subscribe();
    this.router.navigateByUrl('/profile');
  }
}
