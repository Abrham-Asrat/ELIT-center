import { Component, ViewEncapsulation } from '@angular/core';
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
  selector: 'app-sub-admin-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './sub-admin-login.component.html',
  styleUrls: ['./sub-admin-login.component.scss'],
  encapsulation: ViewEncapsulation.None, // This ensures styles are not encapsulated
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
export class SubAdminLoginComponent {
  loginData = {
    staffId: '',
    password: '',
 
    workType: '' // Added work type field
  };

  showPassword = false;
  rememberMe = false;
  isLoading = false;
  hasError = false;
  errorMessage = '';
  buttonState = 'normal'; // For button hover animation
  showErrorAnimation = false; // For shake animation

  // Work type options
  workTypes = [
    { value: 'reception', label: 'Reception' },
    { value: 'doctor', label: 'Doctor' },
    { value: 'surgeon', label: 'Surgeon' },
    { value: 'lab', label: 'Lab Technician' },
    { value: 'pharmacy', label: 'Pharmacist' },
    { value: 'employer', label: 'Employer' },
    { value: 'other', label: 'Other' }
  ];

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
      // Demo credentials for Sub Admin (Staff members)
      const validStaffIds = ['staff001', 'nurse001', 'admin001'];
      const validPassword = 'staff123';

      if (
        validStaffIds.includes(this.loginData.staffId) &&
        this.loginData.password === validPassword &&
     
        this.loginData.workType
      ) {
        // Successful login
        console.log('Sub Admin login successful');
        // Store current shift info and work type for the session
        
        sessionStorage.setItem('staffId', this.loginData.staffId);
        sessionStorage.setItem('workType', this.loginData.workType);
        this.router.navigate(['/sub-admin']);
      }  else if (!this.loginData.workType) {
        // Missing work type selection
        this.hasError = true;
        this.errorMessage = 'Please select your work type.';
        this.showErrorAnimation = true; // Trigger shake animation
      } else {
        // Failed login
        this.hasError = true;
        this.errorMessage =
          'Invalid staff ID or password. Please contact administration.';
        this.loginData.password = ''; // Clear password field
        this.showErrorAnimation = true; // Trigger shake animation
      }

      this.isLoading = false;
    }, 1500);
  }
}