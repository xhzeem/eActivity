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
    path: 'user/:id',
    component: UserProfileComponent,
  },
  {
    path: 'profile',
    component: UserProfileComponent,
    canActivate: [UserIsUserGuard],
  },
  { path: '**', redirectTo: '/' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
