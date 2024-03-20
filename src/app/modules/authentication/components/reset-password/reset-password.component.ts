import { ChangeDetectorRef, Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss'
})
export class ResetPasswordComponent {
  resetPasswordForm!: FormGroup;
  showOtpFields: boolean = false; 
  passwordsDoNotMatch: boolean = false;
  constructor(private formBuilder: FormBuilder, private cdr: ChangeDetectorRef ) { }

  ngOnInit(): void {
    this.resetPasswordForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      otp: ['',[Validators.required,]],
      newPassword: ['',[Validators.required,]],
      confirmPassword: ['',[Validators.required,]]
    });
  }

  checkPasswordsMatch() {
    const newPassword = this.resetPasswordForm.get('newPassword')?.value;
    const confirmPassword = this.resetPasswordForm.get('confirmPassword')?.value;
    if (newPassword !== confirmPassword) {
      this.resetPasswordForm.get('confirmPassword')?.setErrors({ passwordsDoNotMatch: true });
  } else {
      this.resetPasswordForm.get('confirmPassword')?.setErrors(null);
  }
    
}
  onSubmit() {
    if (this.resetPasswordForm.valid) {
      console.log( this.resetPasswordForm.value.email);
    } else {
    }
  }

  toggleOtpFields() {
    if (this.showOtpFields) {
    } else {
     
      this.showOtpFields = true;
    }
  }
  trimWhitespace(controlName: string) {
    const control = this.resetPasswordForm.get(controlName);
    if (control && control.value && typeof control.value === 'string') {
      const trimmedValue = control.value.trim();
      control.setValue(trimmedValue);
    }
  }
}
