import { Component, OnInit } from '@angular/core';
import {
  UserData,
  UserService,
} from 'src/app/service/user-service/user.service';
import { map } from 'rxjs/operators';
import { PageEvent } from '@angular/material/paginator';
import { Router, ActivatedRoute } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from 'src/app/model/user.interface';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit {
  filterValue!: string;
  dataSource!: UserData;
  pageEvent!: PageEvent;
  displayedColumns: string[] = ['id', 'name', 'username', 'email', 'role'];

  constructor(
    private userService: UserService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

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

  navigateToProfile(id: string) {
    this.router.navigate(['/user/' + id], { relativeTo: this.activatedRoute });
  }
}
