import { Component, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { LanguageService } from '../services/language.service';
import { LoginModalComponent } from './login-modal.component';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, RouterModule, LoginModalComponent],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  @ViewChild(LoginModalComponent) loginModal!: LoginModalComponent;

  isMenuOpen = false;
  isLanguageDropdownOpen = false;

  constructor(
    public languageService: LanguageService,
    private router: Router
  ) {}

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  toggleLanguageDropdown() {
    this.isLanguageDropdownOpen = !this.isLanguageDropdownOpen;
  }

  changeLanguage(lang: string) {
    this.languageService.changeLanguage(lang);
    this.isLanguageDropdownOpen = false;
  }

  // Method to handle navigation clicks
  onNavigationClick() {
    // Close mobile menu if open
    this.isMenuOpen = false;
  }

  // Method to open admin login modal
  openAdminLogin() {
    this.isMenuOpen = false; // Close mobile menu
    this.loginModal.openModal(); // Open login modal without pre-selecting role
  }

  onLoginSuccess(event: { role: string; user: any }) {
    console.log('Login successful from header:', event);
    // Additional logic can be added here if needed
  }

  onModalClosed() {
    console.log('Login modal closed from header');
  }
}
