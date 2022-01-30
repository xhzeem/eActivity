import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogComponent } from './components/blog/blog.component';
import { ContactComponent } from './components/contact/contact.component';
import { EditProfileComponent } from './components/user/edit-profile/edit-profile.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { UsersComponent } from './components/user/users/users.component';
import { UserIsUserGuard } from './guards/user-is-user.guard';
import { LandingComponent } from './components/landing/landing.component';
import { HomeComponent } from './components/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { BlogCreateComponent } from './components/blog/blog-create/blog-create.component';
import { BlogArticleComponent } from './components/blog/blog-article/blog-article.component';
import { UserIsAdminGuard } from './guards/user-is-admin.guard';
import { AboutComponent } from './components/about/about.component';
import { EventsComponent } from './components/events/events/events.component';
import { EventPageComponent } from './components/events/event-page/event-page.component';
import { EditPostComponent } from './components/home/edit-post/edit-post.component';
import { EditEventComponent } from './components/events/edit-event/edit-event.component';

const routes: Routes = [
  {
    path: '',
    component: LandingComponent,
  },
  {
    path: 'feed',
    component: HomeComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'events',
    component: EventsComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'events/:id',
    component: EventPageComponent,
  },
  {
    path: 'blog',
    component: BlogComponent,
  },
  {
    path: 'info',
    component: AboutComponent,
  },
  {
    path: 'new-article',
    component: BlogCreateComponent,
    canActivate: [AuthGuard, UserIsAdminGuard],
  },
  {
    path: 'article/:slug',
    component: BlogArticleComponent,
  },
  {
    path: 'article/:id',
    component: BlogArticleComponent,
  },
  {
    path: 'contact',
    component: ContactComponent,
  },
  {
    path: 'admin',
    loadChildren: () =>
      import('../app/components/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AuthGuard, UserIsAdminGuard],
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'api/user',
    redirectTo: '/users',
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [UserIsAdminGuard],
  },
  {
    path: 'update-profile',
    component: EditProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'update-post/:id',
    component: EditPostComponent,
  },
  {
    path: 'update-event/:id',
    component: EditEventComponent,
  },
  {
    path: 'user/:id',
    component: UserProfileComponent,
    canActivate: [AuthGuard],
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard, UserIsUserGuard],
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
