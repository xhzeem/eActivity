import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { BlogEntry } from 'src/app/model/blog-entry.interface';
import { BlogService } from 'src/app/service/blog/blog.service';
import { Title } from '@angular/platform-browser';
import { WINDOW } from 'src/app/window-token';

@Component({
  selector: 'app-blog-article',
  templateUrl: './blog-article.component.html',
  styleUrls: ['./blog-article.component.scss'],
})
export class BlogArticleComponent implements OnInit {
  blogEntry$: Observable<BlogEntry> = this.activatedRoute.params.pipe(
    switchMap((params: Params) => {
      const blogSlug: string = params['slug'];
      return this.blogService
        .findOne(blogSlug)
        .pipe(map((blogEntry: BlogEntry) => blogEntry));
    })
  );
  origin = this.window.location.origin;

  constructor(
    private activatedRoute: ActivatedRoute,
    private blogService: BlogService,
    @Inject(WINDOW) private window: Window

    // private titleService: Title
  ) {
    // this.titleService.setTitle(this.activatedRoute.snapshot.data['title']);
  }

  ngOnInit(): void {}
}
