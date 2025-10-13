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
  containerSlideIn,
} from '../shared/animations';

@Component({
  selector: 'app-about',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
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
  ],
})
export class AboutComponent {
  constructor(public languageService: LanguageService) {}

  values = [
    {
      icon: 'fas fa-heart',
      title: 'Compassionate Care',
      description:
        'We treat every patient with empathy, respect, and genuine concern for their well-being.',
    },
    {
      icon: 'fas fa-microscope',
      title: 'Medical Excellence',
      description:
        'We maintain the highest standards of medical practice and continuous professional development.',
    },
    {
      icon: 'fas fa-handshake',
      title: 'Patient Partnership',
      description:
        'We believe in collaborative care, involving patients in every aspect of their treatment decisions.',
    },
    {
      icon: 'fas fa-shield-alt',
      title: 'Safety First',
      description:
        'Patient safety is our top priority in every procedure and treatment we provide.',
    },
  ];

  team = [
    {
      name: 'Dr. Abiy',
      position: 'Chief ENT Specialist',
      icon: 'fas fa-user-md',
      description:
        'Leading ENT specialist with 15+ years of experience in comprehensive ear, nose, and throat care.',
    },
    {
      name: 'Sarah Johnson',
      position: 'Head Nurse',
      icon: 'fas fa-user-nurse',
      description:
        'Experienced registered nurse specializing in ENT patient care and surgical assistance.',
    },
    {
      name: 'Michael Chen',
      position: 'Audiologist',
      icon: 'fas fa-assistive-listening-systems',
      description:
        'Certified audiologist providing comprehensive hearing evaluations and hearing aid services.',
    },
    {
      name: 'Lisa Rodriguez',
      position: 'Patient Coordinator',
      icon: 'fas fa-clipboard-user',
      description:
        'Dedicated to ensuring smooth patient experiences and coordinating all aspects of care.',
    },
  ];

  milestones = [
    {
      year: '2020',
      title: 'ELIT ENT Center Founded',
      description:
        'Dr. Abiy established the center with a vision to provide exceptional ENT care to the community.',
    },
    {
      year: '2021',
      title: 'Advanced Equipment Installation',
      description:
        'Invested in state-of-the-art diagnostic and surgical equipment for better patient outcomes.',
    },
    {
      year: '2022',
      title: 'Expanded Services',
      description:
        'Added specialized services including pediatric ENT and sleep disorder treatments.',
    },
    {
      year: '2023',
      title: 'Excellence Award',
      description:
        'Received recognition for outstanding patient care and medical excellence in the community.',
    },
  ];
}
