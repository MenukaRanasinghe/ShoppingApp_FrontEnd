import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  loginForm: FormGroup;
  loginError: string = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.formBuilder.group({
      usernameOrEmail: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const usernameOrEmail = this.loginForm.get('usernameOrEmail')!.value;
      const password = this.loginForm.get('password')!.value;

      const loginData = { usernameOrEmail: usernameOrEmail, password: password };

      this.authService.login(loginData).subscribe(
        (response: any) => {
          window.alert('Login successful!');
          console.log('Login successful');

         
          this.router.navigate(['/userhome']);
        },
        (error) => {
          console.error('Login failed', error);
          this.loginError = 'Invalid username/email or password';
        }
      );
    } else {
      console.log('Invalid form');
    }
  }

  login(): void {
    const loggedInUser = { username: 'example', email: 'example@email.com', fullname: 'John Doe', phone: '123456789', address: '123 Main St' };

    this.authService.setLoggedInUser(loggedInUser);

  }
}
