import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import {
  pageEnter,
  fadeIn,
  slideUp,
  bounceIn,
  scaleIn,
  float,
  buttonHover,
  shake,
} from '../shared/animations';

@Component({
  selector: 'app-super-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './super-admin-login.component.html',
  styleUrls: ['./super-admin-login.component.scss'],
  animations: [
    pageEnter,
    fadeIn,
    slideUp,
    bounceIn,
    scaleIn,
    float,
    buttonHover,
    shake,
  ],
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
  buttonState = 'normal'; // For button hover animation
  showErrorAnimation = false; // For shake animation

  constructor(private router: Router) {}

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  // Handle button hover for animation
  onButtonHover(state: string) {
    this.buttonState = state;
  }

  onLogin() {
    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = '';
    this.showErrorAnimation = false;

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
        this.showErrorAnimation = true; // Trigger shake animation
      }

      this.isLoading = false;
    }, 1500);
  }
}
