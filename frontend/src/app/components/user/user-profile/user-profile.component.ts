import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { User } from 'src/app/model/user.interface';
import { UserService } from 'src/app/service/user-service/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  AuthenticationService,
  JWT_NAME,
} from 'src/app/service/authentication.service';
import { UserIsUserGuard } from 'src/app/guards/user-is-user.guard';
import {
  PostEntriesPageable,
  PostEntry,
} from 'src/app/model/post-entry.interface';
import { PostService } from 'src/app/service/post/post.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  doggie = '../../../assets/img/dog.jfif';
  date = new Date();
  constructor(
    private activatedRoute: ActivatedRoute,
    private userService: UserService,
    private userIsUserGuard: UserIsUserGuard,
    private postService: PostService,
    public authService: AuthenticationService,
    private router: Router
  ) {}

  private userId$: Observable<number> = this.activatedRoute.params.pipe(
    map((params: Params) => parseInt(params['id']))
  );

  user$: Observable<User> = this.userId$.pipe(
    switchMap((userId: number) => this.userService.findOne(userId))
  );
  dataSource: Observable<PostEntry[]> = this.postService.findAll();

  ngOnInit(): void {}

  editable() {
    const token: any = localStorage.getItem(JWT_NAME);
    const userId = this.userIsUserGuard.parseJwt(token).user.id;
    const profileId = location.href.split('user/')[1];

    if (profileId == userId) {
      return true;
    } else {
      return false;
    }
  }
  logout() {
    this.authService.logout();
    this.router.navigate(['/']);
  }
  editPorfile: boolean = true;
}
