import { Component, Inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';
import { ToastService } from '../../../../services/toast.service';
import { DOCUMENT } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup
  submitted: boolean = false;
  showLoader: boolean = false;
  showForm: boolean = false;
  constructor(@Inject(DOCUMENT) private document: Document,
    private fb: FormBuilder, private apiService: ApiService, private router: Router, private tostr: ToastService
  ) {
  }

  ngOnInit() {
    if (localStorage.getItem('accessToken')) this.router.navigate(['/attribute']);
    else {
      this.showForm = true;
      this.loginForm = this.fb.group({
        userName: ['johndoe@gs1.org', Validators.required],
        password: ['John Doe', Validators.required],
      });
    }
  }

  get f() { return this.loginForm.controls; }

  login() {
    const payload = {
      email: this.loginForm?.value?.userName?.trim(),
      username: this.loginForm?.value?.password?.trim()
    };
    this.submitted = true;
    if (payload.email && payload.username) {
      this.showLoader = true;
      this.apiService.post(environment?.authApiUrl + '/login', payload).subscribe((data: any) => {
        if (data?.token) {
          localStorage.setItem('accessToken', data?.token);
          if (data?.refreshToken) localStorage.setItem('refreshToken', data?.refreshToken);
          this.router.navigate(['/attribute']);
        }
        this.showLoader = false;
      }, err => {
        this.showLoader = false;
        if (err?.status === 403) this.tostr.showWarning('Invalid user');
      });
    }
    // if (this.loginForm.valid) {
    //   this.showLoader = true;

    //   console.log(this.loginForm.value);

    // }
    // if (this.loginForm.invalid) {
    //   return;
    // }
    // console.log('Login successful!');
  }
}
