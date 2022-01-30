import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';
import {
  SocialAuthService,
  SocialUser,
  FacebookLoginProvider,
  GoogleLoginProvider,
} from 'angularx-social-login';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  socialUser!: SocialUser;
  isLoggedin!: boolean;
  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private formBuilder: FormBuilder,
    private _location: Location,
    private socialAuthService: SocialAuthService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        Validators.email,
        Validators.minLength(3),
      ]),
      password: new FormControl(null, [
        Validators.required,
        Validators.minLength(8),
      ]),
    });
    this.socialAuthService.authState.subscribe((user) => {
      this.socialUser = user;
      this.isLoggedin = user != null;
      console.log(this.socialUser);
    });
  }

  loginWithGoogle(): void {
    this.socialAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }
  loginWithFacebook(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
  }

  hide = true;
  public error: any;
  public sucess = 'Logged in successfully';
  onSubmit() {
    this.error = null;
    if (this.loginForm.invalid) {
      return;
    }
    this.loginForm.value.email = this.loginForm.value.email.toLowerCase();
    this.authService
      .login(this.loginForm.value)
      .pipe(
        map((token) =>
          setTimeout(() => {
            this._location.back();
          }, 2000)
        )
      )
      .subscribe(
        (success) => {
          this.error = this.sucess;
        },
        (error) => {
          this.error = error.error.error;
        }
      );
  }
  isLoading = false;

  fetchingData() {
    this.isLoading = true;
  }
}
