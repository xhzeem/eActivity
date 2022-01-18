import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { UserService } from 'src/app/service/user-service/user.service';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { User } from 'src/app/model/user.interface';
import { PostEntry } from 'src/app/model/post-entry.interface';
import { PostService } from 'src/app/service/post/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.scss']
})
export class EditPostComponent implements OnInit {
  form!: FormGroup;
  constructor(
    private formbuilder: FormBuilder,
    private authService: AuthenticationService,
    private postService: PostService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.form = this.formbuilder.group({
      id: [{ value: null, disabled: true }, [Validators.required]],
      postBody: [null, [Validators.required]],
      postLikes: [null, [Validators.required]],
      postImage!: [null],
    });
    this.authService
      .getUserId()
      .pipe(
        switchMap((id: number) =>
          this.postService.findOne(id).pipe(
            tap((post: PostEntry) => {
              this.form.patchValue({
                id: post.id,
                postBody: post.postBody,
                postLikes: post.postLikes,
                postImage: post.postImage
              });
            })
          )
        )
      )
      .subscribe();
  }
  update() {
    this.postService.updateOne(this.form.getRawValue()).subscribe();
    // this.router.navigateByUrl('/update-profile');
  }
}
