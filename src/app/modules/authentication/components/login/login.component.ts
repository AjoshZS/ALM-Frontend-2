import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  loginForm!: FormGroup
  submitted:boolean = false;

  constructor(
    private fb: FormBuilder,
  ) { }

  ngOnInit(){
    this.loginForm = this.fb.group({
      userName:['', Validators.required],
      password:['', Validators.required],
    })
  }
  
  get f() { return this.loginForm.controls; }

  login() {
    this.submitted = true;
    if(this.loginForm.valid){
      console.log(this.loginForm.value);
      
    }
    if (this.loginForm.invalid) {
      return;
    }
    console.log('Login successful!');
  }
}
