// register.component.ts

import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { CustomerService } from '../customer.service';  // Update the path
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  signupForm: FormGroup;
  signupError: string = '';

  constructor(private formBuilder: FormBuilder, private customerService: CustomerService, private router: Router) {
    this.signupForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      full_name: ['', Validators.required],
      phone: ['', [Validators.required, this.phoneFormatValidator]],
      address: ['', Validators.required],
      username: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  phoneFormatValidator(control: AbstractControl): { [key: string]: boolean } | null {
  
    const phonePattern = /^\d{10}$/;
    if (!phonePattern.test(control.value)) {
      return { 'invalidPhoneFormat': true };
    }
    return null;
  }

  onSubmit() {
    if (this.signupForm.valid) {
      const formData = this.signupForm.value;

      formData.phone = +formData.phone;

    if (formData.phone > 2147483647) {
     
      formData.phone = 2147483647;
    }

      this.customerService.addCustomer(formData).subscribe(
        (response) => {
          console.log('Registration successful:', response);
          window.alert('Registration successful!');

         
          this.router.navigate(['/login']);
        },
        (error) => {
          console.error('Registration failed:', error);
          this.signupError = 'Registration failed. Please try again.';
         
        }
      );
    } else {
      this.signupError = 'Please fill in all the required fields and ensure your password is at least 8 characters long.';
    }
  }
}
