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
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { DisqusModule } from 'ngx-disqus';
import { MatSelectModule } from '@angular/material/select';
import {
  SocialLoginModule,
  SocialAuthServiceConfig,
  FacebookLoginProvider,
} from 'angularx-social-login';
import { GoogleLoginProvider } from 'angularx-social-login';
import { CountUpModule } from 'ngx-countup';
import { MatTabsModule } from '@angular/material/tabs';
import { ChartsModule } from 'ng2-charts';

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
import { MatSortModule } from '@angular/material/sort';
import { SortingPipe } from './pipes/sorting.pipe';
import { AboutComponent } from './components/about/about.component';
import { PurifyPipe } from './pipes/purify.pipe';
import { EventsComponent } from './components/events/events/events.component';
import { EventPageComponent } from './components/events/event-page/event-page.component';
import { EditPostComponent } from './components/home/edit-post/edit-post.component';
import { EditEventComponent } from './components/events/edit-event/edit-event.component';
import { WINDOW_PROVIDERS } from './window-token';

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
    EventsComponent,
    EventPageComponent,
    EditPostComponent,
    EditEventComponent,
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
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    DisqusModule.forRoot('utmeactivity'),
    MatSelectModule,
    MatProgressSpinnerModule,
    SocialLoginModule,
    CountUpModule,
    MatTabsModule,
    ChartsModule,
  ],
  providers: [
    WINDOW_PROVIDERS,
    AuthenticationService,
    JwtHelperService,
    { provide: JWT_OPTIONS, useValue: JWT_OPTIONS },
    { provide: HTTP_INTERCEPTORS, useClass: JwtInterceptor, multi: true },
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '990681280542-da8oi9478hhl8jnjobpumil5pf9844av.apps.googleusercontent.com'
            ),
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('645816083503894'),
          },
        ],
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
