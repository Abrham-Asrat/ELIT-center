import {
  Component,
  HostListener,
  ElementRef,
  AfterViewInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../services/language.service';
import { slideUp, fadeIn, staggerCards } from '../shared/animations';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
  animations: [slideUp, fadeIn, staggerCards],
})
export class FooterComponent implements AfterViewInit {
  currentYear = new Date().getFullYear();
  isFooterVisible = false;

  contactData = {
    name: '',
    email: '',
    phone: '',
    message: '',
  };

  testimonialData = {
    name: '',
    email: '',
    rating: '',

    testimonial: '',
    allowPublish: false,
  };

  constructor(
    public languageService: LanguageService,
    private el: ElementRef
  ) {}

  ngAfterViewInit() {
    // Check if footer is already in view on page load
    setTimeout(() => {
      this.checkFooterVisibility();
    }, 100);
    
    // Also check after a longer delay to ensure proper detection
    setTimeout(() => {
      this.checkFooterVisibility();
    }, 1000);
    
    // Fallback: make footer visible after 3 seconds if not already visible
    setTimeout(() => {
      if (!this.isFooterVisible) {
        this.isFooterVisible = true;
      }
    }, 3000);
  }

  @HostListener('window:scroll', ['$event'])
  onWindowScroll() {
    this.checkFooterVisibility();
  }

  checkFooterVisibility() {
    if (!this.isFooterVisible && this.el.nativeElement) {
      const footer = this.el.nativeElement;
      const footerPosition = footer.getBoundingClientRect().top;
      const windowHeight = window.innerHeight;

      // Trigger animation when footer is in view or about to come into view
      // Changed from 0.5 to 0.9 to trigger when footer is closer to being visible
      if (footerPosition < windowHeight * 0.9) {
        this.isFooterVisible = true;
      }
      
      // Also trigger if footer is already visible (negative position means it's above viewport)
      if (footerPosition < windowHeight) {
        this.isFooterVisible = true;
      }
    }
  }

  onContactSubmit() {
    if (
      this.contactData.name &&
      this.contactData.email &&
      this.contactData.phone &&
      this.contactData.message
    ) {
      // Handle form submission here
      console.log('Contact form submitted:', this.contactData);

      // Show success message
      alert('Thank you for your message! We will contact you soon.');

      // Reset form
      this.contactData = {
        name: '',
        email: '',
        phone: '',
        message: '',
      };
    }
  }

  onTestimonialSubmit() {
    if (
      this.testimonialData.name &&
      this.testimonialData.rating &&
      this.testimonialData.testimonial
    ) {
      // Handle testimonial submission here
      console.log('Testimonial submitted:', this.testimonialData);

      // Show success message
      alert(
        'Thank you for sharing your experience! Your testimonial helps others make informed decisions.'
      );

      // Reset form
      this.testimonialData = {
        name: '',
        email: '',
        rating: '',
        testimonial: '',
        allowPublish: false,
      };
    }
  }
}