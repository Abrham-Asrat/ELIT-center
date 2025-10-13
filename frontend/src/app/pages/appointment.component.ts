import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import {
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { LanguageService } from '../services/language.service';
import {
  pageEnter,
  slideUp,
  slideInLeft,
  slideInRight,
  staggerCards,
  scaleIn,
  fadeIn,
  bounceIn,
  containerSlideIn,
  buttonHover,
} from '../shared/animations';

@Component({
  selector: 'app-appointment',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss'],
  animations: [
    pageEnter,
    slideUp,
    slideInLeft,
    slideInRight,
    staggerCards,
    scaleIn,
    fadeIn,
    bounceIn,
    containerSlideIn,
    buttonHover,
  ],
})
export class AppointmentComponent {
  appointmentForm: FormGroup;
  isSubmitted = false;
  isLoading = false;

  services = [
    'General ENT Consultation',
    'Hearing Test',
    'Sinus Treatment',
    'Throat Examination',
    'Allergy Testing',
    'Sleep Apnea Evaluation',
    'Pediatric ENT',
    'Surgical Consultation',
    'Follow-up Visit',
  ];

  timeSlots = [
    '8:00 AM',
    '8:30 AM',
    '9:00 AM',
    '9:30 AM',
    '10:00 AM',
    '10:30 AM',
    '11:00 AM',
    '11:30 AM',
    '1:00 PM',
    '1:30 PM',
    '2:00 PM',
    '2:30 PM',
    '3:00 PM',
    '3:30 PM',
    '4:00 PM',
    '4:30 PM',
    '5:00 PM',
    '5:30 PM',
  ];

  reasons = [
    'Routine Check-up',
    'Hearing Problems',
    'Sinus Issues',
    'Throat Pain',
    'Ear Pain',
    'Dizziness/Balance Issues',
    'Allergy Symptoms',
    'Sleep Problems',
    'Voice Changes',
    'Other',
  ];

  constructor(
    private fb: FormBuilder,
    public languageService: LanguageService
  ) {
    this.appointmentForm = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      phone: [
        '',
        [Validators.required, Validators.pattern(/^\(\d{3}\) \d{3}-\d{4}$/)],
      ],
      dateOfBirth: ['', Validators.required],
      preferredDate: ['', Validators.required],
      preferredTime: ['', Validators.required],
      serviceType: ['', Validators.required],
      reason: ['', Validators.required],
      symptoms: [''],
      previousPatient: [false],
      insurance: [''],
      emergencyContact: [''],
      emergencyPhone: [''],
      notes: [''],
    });
  }

  formatPhoneNumber(event: any) {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length >= 6) {
      value = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(
        6,
        10
      )}`;
    } else if (value.length >= 3) {
      value = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    }
    this.appointmentForm.patchValue({ phone: value });
  }

  getMinDate(): string {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split('T')[0];
  }

  onSubmit() {
    this.isSubmitted = true;

    if (this.appointmentForm.valid) {
      this.isLoading = true;

      // Simulate API call
      setTimeout(() => {
        this.isLoading = false;
        alert(
          'Appointment request submitted successfully! We will contact you within 24 hours to confirm your appointment.'
        );
        this.appointmentForm.reset();
        this.isSubmitted = false;
      }, 2000);
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.appointmentForm.controls).forEach((key) => {
        this.appointmentForm.get(key)?.markAsTouched();
      });
    }
  }

  isFieldInvalid(fieldName: string): boolean {
    const field = this.appointmentForm.get(fieldName);
    return !!(
      field &&
      field.invalid &&
      (field.dirty || field.touched || this.isSubmitted)
    );
  }

  getFieldError(fieldName: string): string {
    const field = this.appointmentForm.get(fieldName);
    if (field && field.errors) {
      if (field.errors['required']) return `${fieldName} is required`;
      if (field.errors['email']) return 'Please enter a valid email address';
      if (field.errors['minlength'])
        return `${fieldName} must be at least ${field.errors['minlength'].requiredLength} characters`;
      if (field.errors['pattern'])
        return 'Please enter a valid phone number (XXX) XXX-XXXX';
    }
    return '';
  }
}
