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
  selector: 'app-services',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss'],
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
export class ServicesComponent {
  constructor(public languageService: LanguageService) {}

  services: {
    icon: string;
    titleKey: string;
    descriptionKey: string;
    features: string[];
  }[] = [
    {
      icon: 'fas fa-ear-listen',
      titleKey: 'hearingTests',
      descriptionKey: 'hearingTestsDesc',
      features: [
        'Pure tone audiometry',
        'Speech audiometry',
        'Tympanometry',
        'Hearing aid consultations',
      ],
    },
    {
      icon: 'fas fa-head-side-virus',
      titleKey: 'sinusTreatment',
      descriptionKey: 'sinusTreatmentDesc',
      features: [
        'Endoscopic sinus surgery',
        'Balloon sinuplasty',
        'Medical management',
        'Allergy testing',
      ],
    },
    {
      icon: 'fas fa-lungs',
      titleKey: 'throatDisorders',
      descriptionKey: 'throatDisordersDesc',
      features: [
        'Voice therapy',
        'Swallowing studies',
        'Throat surgery',
        'Sleep apnea treatment',
      ],
    },
    {
      icon: 'fas fa-allergies',
      titleKey: 'allergyManagement',
      descriptionKey: 'allergyManagementDesc',
      features: [
        'Skin prick tests',
        'Blood allergy tests',
        'Immunotherapy',
        'Environmental controls',
      ],
    },
    {
      icon: 'fas fa-microscope',
      titleKey: 'diagnosticServices',
      descriptionKey: 'diagnosticServicesDesc',
      features: ['CT scans', 'MRI imaging', 'Endoscopy', 'Biopsy procedures'],
    },
    {
      icon: 'fas fa-surgery',
      titleKey: 'surgicalProcedures',
      descriptionKey: 'surgicalProceduresDesc',
      features: [
        'Endoscopic surgery',
        'Microsurgery',
        'Laser surgery',
        'Outpatient procedures',
      ],
    },
  ];

  specialtyAreas = [
    {
      title: 'Pediatric ENT',
      description:
        "Specialized care for children's ear, nose, and throat conditions",
      icon: 'fas fa-child',
    },
    {
      title: 'Head & Neck Surgery',
      description:
        'Comprehensive treatment for head and neck tumors and conditions',
      icon: 'fas fa-head-side-cough',
    },
    {
      title: 'Balance Disorders',
      description: 'Diagnosis and treatment of dizziness and balance problems',
      icon: 'fas fa-balance-scale',
    },
  ];
}
