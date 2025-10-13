import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-sub-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sub-admin-login.component.html',
  styleUrls: ['./sub-admin-login.component.scss'],
  encapsulation: ViewEncapsulation.None, // This ensures styles are not encapsulated
})
export class SubAdminLoginComponent {
  loginData = {
    staffId: '',
    password: '',
    shift: '',
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
      // Demo credentials for Sub Admin (Staff members)
      const validStaffIds = ['staff001', 'nurse001', 'admin001'];
      const validPassword = 'staff123';

      if (
        validStaffIds.includes(this.loginData.staffId) &&
        this.loginData.password === validPassword &&
        this.loginData.shift
      ) {
        // Successful login
        console.log('Sub Admin login successful');
        // Store current shift info for the session
        sessionStorage.setItem('currentShift', this.loginData.shift);
        sessionStorage.setItem('staffId', this.loginData.staffId);
        this.router.navigate(['/sub-admin']);
      } else if (!this.loginData.shift) {
        // Missing shift selection
        this.hasError = true;
        this.errorMessage = 'Please select your current shift.';
      } else {
        // Failed login
        this.hasError = true;
        this.errorMessage =
          'Invalid staff ID or password. Please contact administration.';
        this.loginData.password = ''; // Clear password field
      }

      this.isLoading = false;
    }, 1500);
  }
}
