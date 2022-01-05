import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { LottieModule } from 'ngx-lottie';
import player from 'lottie-web';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TextFieldModule } from '@angular/cdk/text-field';
import { MatButtonModule } from '@angular/material/button';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MatToolbarModule } from '@angular/material/toolbar';
import { AuthenticationService } from './service/authentication.service';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { FormsModule } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { JwtHelperService, JWT_OPTIONS } from '@auth0/angular-jwt';
import { JwtInterceptor } from './interceptors/jwt.interceptor';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { EditorModule } from '@tinymce/tinymce-angular';
import { QuillModule } from 'ngx-quill';

// components
import { AppComponent } from './app.component';
import { NavComponent } from './components/nav/nav.component';
import { HomeComponent } from './components/home/home.component';
import { BlogComponent } from './components/blog/blog.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { OverviewComponent } from './components/admin/component/overview/overview.component';
import { UsersComponent } from './components/user/users/users.component';
import { FooterComponent } from './components/footer/footer.component';
import { UserProfileComponent } from './components/user/user-profile/user-profile.component';
import { EditProfileComponent } from './components/user/edit-profile/edit-profile.component';
import { LandingComponent } from './components/landing/landing.component';
import { BlogCreateComponent } from './components/blog/blog-create/blog-create.component';
import { BlogArticleComponent } from './components/blog/blog-article/blog-article.component';
import {MatSortModule} from '@angular/material/sort';
import { SortingPipe } from './pipes/sorting.pipe';
import { AboutComponent } from './components/about/about.component';
import { PurifyPipe } from './pipes/purify.pipe';

export function playerFactory() {
  return player;
}

@NgModule({
  declarations: [
    AppComponent,
    NavComponent,
    HomeComponent,
    BlogComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    OverviewComponent,
    UsersComponent,
    FooterComponent,
    UserProfileComponent,
    EditProfileComponent,
    LandingComponent,
    BlogCreateComponent,
    BlogArticleComponent,
    SortingPipe,
    AboutComponent,
    PurifyPipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    LottieModule.forRoot({ player: playerFactory }),
    MatInputModule,
    BrowserAnimationsModule,
    TextFieldModule,
    MatButtonModule,
    HttpClientModule,
    MatToolbarModule,
    MatIconModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    FormsModule,
    MatProgressBarModule,
    EditorModule,
    QuillModule.forRoot(),
    MatSortModule
  ],
  providers: [
    AuthenticationService,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
