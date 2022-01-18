import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import * as AOS from 'aos';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { BlogEntriesPageable } from 'src/app/model/blog-entry.interface';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { BlogService } from 'src/app/service/blog/blog.service';
@Component({
  selector: 'app-blog',
  templateUrl: './blog.component.html',
  styleUrls: ['./blog.component.scss'],
})
export class BlogComponent implements OnInit {
  doggie = '../../../assets/img/dog.jfif';

  dataSource: Observable<BlogEntriesPageable> = this.blogService.indexAll(1, 10);

  constructor(
    private blogService: BlogService,
    public authService: AuthenticationService
  ) {}

  ngOnInit(): void {
    AOS.init();
  }
  status = false;
  changeHeart() {
    this.status = !this.status;
  }
}
