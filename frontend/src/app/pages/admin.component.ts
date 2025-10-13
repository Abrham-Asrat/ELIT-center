import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss'],
})
export class AdminComponent {
  isLoading = false;

  constructor(private router: Router) {}

  accessSuperAdmin() {
    console.log('Access Super Admin clicked');
    this.isLoading = true;

    // Navigate to Super Admin Login
    this.router.navigate(['/super-admin-login']).then(
      (success) => {
        console.log('Navigation successful:', success);
        // Reset loading state after navigation completes
        this.isLoading = false;
      },
      (error) => {
        console.error('Navigation failed:', error);
        // Reset loading state on error
        this.isLoading = false;
      }
    );
  }

  accessSubAdmin() {
    console.log('Access Sub Admin clicked');
    this.isLoading = true;

    // Navigate to Sub Admin Login
    this.router.navigate(['/sub-admin-login']).then(
      (success) => {
        console.log('Navigation successful:', success);
        // Reset loading state after navigation completes
        this.isLoading = false;
      },
      (error) => {
        console.error('Navigation failed:', error);
        // Reset loading state on error
        this.isLoading = false;
      }
    );
  }
}