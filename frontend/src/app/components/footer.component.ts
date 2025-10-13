import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { LanguageService } from '../services/language.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss'],
})
export class FooterComponent {
  currentYear = new Date().getFullYear();

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

  constructor(public languageService: LanguageService) {}

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
      alert('Thank you for your message! We will contact you soon.')

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
