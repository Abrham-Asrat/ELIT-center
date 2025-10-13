import { Component, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './login-modal.component.html',
  styleUrls: ['./login-modal.component.scss'],
})
export class LoginModalComponent {
  @Output() loginSuccess = new EventEmitter<{role: string, user: any}>();
  @Output() modalClosed = new EventEmitter<void>();

  isModalOpen = false;
  selectedRole: 'super-admin' | 'sub-admin' | null = null;
  showPassword = false;
  rememberMe = false;
  isLoading = false;
  hasError = false;
  errorMessage = '';

  loginData = {
    username: '',
    password: '',
    shift: ''
  };

  constructor(private router: Router) {}

  openModal(role?: 'super-admin' | 'sub-admin') {
    this.isModalOpen = true;
    if (role) {
      this.selectedRole = role;
    }
    document.body.classList.add('modal-open');
  }

  closeModal() {
    this.isModalOpen = false;
    this.selectedRole = null;
    this.resetForm();
    document.body.classList.remove('modal-open');
    this.modalClosed.emit();
  }

  selectRole(role: 'super-admin' | 'sub-admin') {
    this.selectedRole = role;
    this.resetForm();
  }

  backToRoleSelection() {
    this.selectedRole = null;
    this.resetForm();
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  resetForm() {
    this.loginData = {
      username: '',
      password: '',
      shift: ''
    };
    this.hasError = false;
    this.errorMessage = '';
    this.showPassword = false;
    this.isLoading = false;
  }

  onLogin() {
    this.isLoading = true;
    this.hasError = false;
    this.errorMessage = '';

    // Simulate authentication delay
    setTimeout(() => {
      let isValidLogin = false;
      let userData = null;

      if (this.selectedRole === 'super-admin') {
        // Super Admin validation
        if (this.loginData.username === 'dr.abiy' && this.loginData.password === 'admin123') {
          isValidLogin = true;
          userData = {
            username: 'dr.abiy',
            name: 'Dr. Abiy Teshome',
            role: 'super-admin',
            permissions: ['all']
          };
        } else {
          this.errorMessage = 'Invalid username or password for Super Admin access.';
        }
      } else if (this.selectedRole === 'sub-admin') {
        // Sub Admin validation
        const validStaffIds = ['staff001', 'nurse001', 'admin001'];
        const validPassword = 'staff123';

        if (validStaffIds.includes(this.loginData.username) && 
            this.loginData.password === validPassword && 
            this.loginData.shift) {
          isValidLogin = true;
          userData = {
            staffId: this.loginData.username,
            name: this.getStaffName(this.loginData.username),
            role: 'sub-admin',
            shift: this.loginData.shift,
            permissions: ['appointments', 'patients', 'tasks']
          };
          // Store shift info for the session
          sessionStorage.setItem('currentShift', this.loginData.shift);
          sessionStorage.setItem('staffId', this.loginData.username);
        } else if (!this.loginData.shift) {
          this.errorMessage = 'Please select your current shift.';
        } else {
          this.errorMessage = 'Invalid staff ID or password. Please contact administration.';
        }
      }

      if (isValidLogin && userData) {
        // Store user data in session
        sessionStorage.setItem('currentUser', JSON.stringify(userData));
        
        // Emit success event
        this.loginSuccess.emit({ role: this.selectedRole!, user: userData });
        
        // Navigate to appropriate dashboard
        if (this.selectedRole === 'super-admin') {
          this.router.navigate(['/super-admin']);
        } else {
          this.router.navigate(['/sub-admin']);
        }
        
        // Close modal
        this.closeModal();
      } else {
        this.hasError = true;
        if (this.selectedRole === 'super-admin') {
          this.loginData.password = ''; // Clear password on error
        } else {
          this.loginData.password = ''; // Clear password on error
        }
      }
      
      this.isLoading = false;
    }, 1500);
  }

  private getStaffName(staffId: string): string {
    const staffNames: { [key: string]: string } = {
      'staff001': 'Almaz Tadesse',
      'nurse001': 'Meron Girma', 
      'admin001': 'Dawit Bekele'
    };
    return staffNames[staffId] || 'Staff Member';
  }
}