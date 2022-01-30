import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
  AbstractControl,
  ValidationErrors,
} from '@angular/forms';
import { Router } from '@angular/router';
import { map } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/service/authentication.service';
import * as AOS from 'aos';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(
    private authService: AuthenticationService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    AOS.init();
    this.registerForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      role: ['', [Validators.required]],
      username: ['', [Validators.required]],
      email: [
        '',
        [
          Validators.required,
          Validators.pattern(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          ),
        ],
      ],
      password: [
        '',
        [
          Validators.required,
          Validators.minLength(8),
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])/
          ),
        ],
      ],
    });
  }
  hide = true;
  onSubmit() {
    if (this.registerForm.invalid) {
      return;
    }
    this.authService
      .register(this.registerForm.value)
      .pipe(
        map((user) =>
          setTimeout(() => {
            this.router.navigate(['login']);
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
  get email(): FormControl {
    return this.registerForm.get('email') as FormControl;
  }
  get name(): FormControl {
    return this.registerForm.get('name') as FormControl;
  }
  get username(): FormControl {
    return this.registerForm.get('username') as FormControl;
  }
  get password(): FormControl {
    return this.registerForm.get('password') as FormControl;
  }
  get role(): FormControl {
    return this.registerForm.get('role') as FormControl;
  }
  isLoading = false;
  public error: any;
  public sucess = 'Welcome Abroad';

  fetchingData() {
    this.isLoading = true;
  }
}
