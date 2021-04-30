import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs/operators';

import { AuthenticationService } from '@core/services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authenticationService: AuthenticationService) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      userName: [null, [Validators.email, Validators.required]],
      password: [null, [Validators.required]]
    });
  }

  submitForm(): void {

    this.validateLoginForm();
    if (this.loginForm.invalid) {
      return;
    }

    const { userName: username, password } = this.loginForm.controls;

    this.authenticationService.login(username.value, password.value)
      .pipe(take(1))
      .subscribe(
        (res: any) => {
          this.router.navigateByUrl('/dashboard');
        }, err => {
          console.log('authenticaton error', err.error);
        }
      );
  }

  validateLoginForm(): void {
    for (const i in this.loginForm.controls) {
      if (this.loginForm.controls.hasOwnProperty(i)) {
        this.loginForm.controls[i].markAsDirty();
        this.loginForm.controls[i].updateValueAndValidity();
      }
    }
  }

}
