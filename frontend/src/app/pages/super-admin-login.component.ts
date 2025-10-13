import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-super-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './super-admin-login.component.html',
  styleUrls: ['./super-admin-login.component.scss'],
})
export class SuperAdminLoginComponent {
  loginData = {
    username: '',
    password: '',
  };

  showPassword = false;
  rememberMe = false;
  isLoading = false;
  hasError = false;
  errorMessage = '';

  constructor(private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  onLogin() {
    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = '';

    // Simulate authentication delay
    setTimeout(() => {
      // Demo credentials for Super Admin (Dr. Abiy)
      if (
        this.loginData.username === 'dr.abiy' &&
        this.loginData.password === 'admin123'
      ) {
        // Successful login
        console.log('Super Admin login successful');
        this.router.navigate(['/super-admin']);
      } else {
        // Failed login
        this.hasError = true;
        this.errorMessage = 'Invalid username or password. Please try again.';
        this.loginData.password = ''; // Clear password field
      }

      this.isLoading = false;
    }, 1500);
  }
}
