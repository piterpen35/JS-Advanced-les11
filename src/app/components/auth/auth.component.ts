import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  @Output() authToggle = new EventEmitter<void>();
  @Output() authorizeUser = new EventEmitter<object>();

  error = {
    boolean: false,
    msg: ''
  };
  login = true;
  loginForm: FormGroup;
  registerForm: FormGroup;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      login: new FormControl('', [Validators.required, Validators.pattern('[A-Za-z]{3,}')]),
      password: new FormControl('', [Validators.required])
    });

    this.registerForm = new FormGroup({
      firstName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]{2,20}')]),
      lastName: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]{2,20}')]),
      login: new FormControl('', [Validators.required, Validators.pattern('[a-zA-Z]{3,16}')]),
      password: new FormControl('', [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{6,30}')]),
      confirmPassword: new FormControl('',
        [Validators.required, Validators.pattern('(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])(?=\\S+$).{6,30}')]),
      email: new FormControl('', [Validators.required, Validators.email]),
      gender: new FormControl('', Validators.required),
    });

  }

  loginToggle(): void {
    this.login = !this.login;
    this.loginForm.reset();
    this.registerForm.reset();
    if (this.error.boolean) {
      this.errorToggle();
    }
  }

  errorToggle(msg = ''): void {
    if (msg !== '') {
      this.error.msg = msg;
    }
    this.error.boolean = !this.error.boolean;
  }

  tryLogin(): void {
    this.http.post('http://localhost:3000/api/auth/login', this.loginForm.value).subscribe(
      res => {
        if (res) {
          this.authorizeUser.emit(res);
          this.authToggle.emit();
        }
      },
      err => {
        this.errorToggle(err.error);
      }
    );
  }

  tryRegister(test: any): boolean {
    if (this.registerForm.invalid || this.registerForm.controls.password.value !== this.registerForm.controls.confirmPassword.value) {
      return false;
    }
    const value = this.registerForm.value;
    delete value.confirmPassword;

    this.http.post('http://localhost:3000/api/auth/register', value).subscribe(
      res => {
        if (res) {
          this.loginToggle();
        }
      },
      err => {
        this.errorToggle(err.error);
      }
    );
  }


}
