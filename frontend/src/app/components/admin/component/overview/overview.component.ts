import { Component, OnInit } from '@angular/core';
import { map, switchMap, tap } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import {
  UserService,
  UserData,
} from 'src/app/service/user-service/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { BlogService } from 'src/app/service/blog/blog.service';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { Observable } from 'rxjs';
import {
  BlogEntriesPageable,
  BlogEntry,
} from 'src/app/model/blog-entry.interface';
import { User } from 'src/app/model/user.interface';
import { JWT_NAME } from 'src/app/service/authentication.service';
import { UserIsUserGuard } from 'src/app/guards/user-is-user.guard';


@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.scss'],
})
export class OverviewComponent implements OnInit {
  filterValue!: string;
  dataSource!: UserData;
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'role'];
  dataSourceBlog: Observable<BlogEntriesPageable> = this.blogService.indexAll(
    1,
    10
  );
  token: any = localStorage.getItem(JWT_NAME);
  userId = this.userIsUserGuard.parseJwt(this.token).user.id;
  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    public authService: AuthenticationService,
    private userIsUserGuard: UserIsUserGuard
  ) {}

  private userId$: Observable<number> = this.activatedRoute.params.pipe(
    map((params: Params) => parseInt(params['id']))
  );

  user$: Observable<User> = this.userId$.pipe(
    switchMap((userId: number) => this.userService.findOne(this.userId))
  );

  ngOnInit(): void {
    this.initDataSource();
  }
  initDataSource() {
    this.userService
      .findAll(1, 10)
      .pipe(map((userData: UserData) => (this.dataSource = userData)))
      .subscribe();
  }
  onPaginateChange(event: PageEvent) {
    let page = event.pageIndex;
    let size = event.pageSize;

    if (this.filterValue == null) {
      page = page + 1;
      this.userService
        .findAll(page, size)
        .pipe(map((userData: UserData) => (this.dataSource = userData)))
        .subscribe();
    } else {
      this.userService
        .paginateByName(page, size, this.filterValue)
        .pipe(map((userData: UserData) => (this.dataSource = userData)))
        .subscribe();
    }
  }
  findByName(username: string) {
    console.log(username);
    this.userService
      .paginateByName(0, 10, username)
      .pipe(map((userData: UserData) => (this.dataSource = userData)))
      .subscribe();
  }

  navigateToProfile(id: string) {
    this.router.navigate(['/user/' + id], { relativeTo: this.activatedRoute });
  }
  deleteBlog(id: number | undefined) {
    this.blogService.deleteOne(id).subscribe();
    window.location.reload();
  }

  logout() {
    this.authService.logout()
    this.router.navigate(['/'])
  }
}
