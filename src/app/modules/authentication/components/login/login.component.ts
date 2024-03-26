import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../../services/api.service';
import { environment } from '../../../../../environments/environment';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup
  submitted: boolean = false;

  constructor(
    private fb: FormBuilder, private apiService: ApiService,private router:Router
  ) { }

  ngOnInit() {
    this.loginForm = this.fb.group({
      userName: ['', Validators.required],
      password: ['', Validators.required],
    })
  }

  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;

    this.apiService.post(environment?.apiUrl+ '/login',this.loginForm.value).subscribe((data: any) => {
      let accessToken = data?.accessToken;
      let refreshToken = data?.refreshToken;

      localStorage.setItem('accessToken', JSON.stringify(accessToken));
      localStorage.setItem('refreshToken', JSON.stringify(refreshToken));
      this.router.navigate(['/attribute'])
    
    })
    if (this.loginForm.valid) {
      console.log(this.loginForm.value);

    }
    if (this.loginForm.invalid) {
      return;
    }
    console.log('Login successful!');
  }
}
