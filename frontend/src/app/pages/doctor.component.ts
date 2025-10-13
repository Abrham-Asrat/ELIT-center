import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
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
  rotateIn,
  containerSlideIn,
} from '../shared/animations';

@Component({
  selector: 'app-doctor',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './doctor.component.html',
  styleUrls: ['./doctor.component.scss'],
  animations: [
    pageEnter,
    slideUp,
    slideInLeft,
    slideInRight,
    staggerCards,
    scaleIn,
    fadeIn,
    bounceIn,
    rotateIn,
    containerSlideIn,
  ],
})
export class DoctorComponent {
  constructor(public languageService: LanguageService) {}

  qualifications = [
    'Doctor of Medicine (MD) - ENT Surgery',
    'Board Certified in Otolaryngology',
    'Fellowship in Head and Neck Surgery',
    'Member, American Academy of Otolaryngology',
  ];

  specialties = [
    'Endoscopic Sinus Surgery',
    'Hearing Restoration',
    'Voice Disorders',
    'Sleep Apnea Treatment',
    'Head and Neck Surgery',
    'Pediatric ENT',
  ];

  experience = [
    {
      year: '2020 - Present',
      position: 'Chief ENT Specialist',
      institution: 'ELIT ENT Center',
      description: 'Leading comprehensive ENT care and surgical procedures',
    },
    {
      year: '2015 - 2020',
      position: 'Senior ENT Surgeon',
      institution: 'Metropolitan Medical Center',
      description: 'Performed complex ENT surgeries and managed patient care',
    },
    {
      year: '2010 - 2015',
      position: 'ENT Resident',
      institution: 'University Hospital',
      description: 'Comprehensive training in all aspects of ENT medicine',
    },
  ];

  awards = [
    'Excellence in Patient Care Award 2023',
    'Outstanding ENT Surgeon of the Year 2022',
    'Medical Innovation Award 2021',
    'Community Service Recognition 2020',
  ];

  publications = [
    'Advanced Techniques in Endoscopic Sinus Surgery - Medical Journal 2023',
    'Innovations in Hearing Restoration - ENT Today 2022',
    'Pediatric ENT: Best Practices - Healthcare Review 2021',
  ];
}
