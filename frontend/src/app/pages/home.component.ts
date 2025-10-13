import {
  Component,
  OnInit,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { LanguageService } from '../services/language.service';
import {
  pageEnter,
  slideUp,
  staggerCards,
  scaleIn,
  fadeIn,
  bounceIn,
  slideInLeft,
  slideInRight,
} from '../shared/animations';

interface Testimonial {
  name: string;
  text: string;
  rating: number;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  animations: [
    pageEnter,
    slideUp,
    staggerCards,
    scaleIn,
    fadeIn,
    bounceIn,
    slideInLeft,
    slideInRight,
  ],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  currentTestimonialIndex = 0;
  private observer!: IntersectionObserver;
  @ViewChildren('animateCard') animateCards!: QueryList<ElementRef>;
  @ViewChildren('animateSection') animateSections!: QueryList<ElementRef>;

  constructor(public languageService: LanguageService) {}

  services = [
    {
      icon: 'fas fa-ear-listen',
      titleKey: 'hearingTests',
      descriptionKey: 'hearingTestsDesc',
    },
    {
      icon: 'fas fa-head-side-virus',
      titleKey: 'sinusTreatment',
      descriptionKey: 'sinusTreatmentDesc',
    },
    {
      icon: 'fas fa-lungs',
      titleKey: 'throatDisorders',
      descriptionKey: 'throatDisordersDesc',
    },
    {
      icon: 'fas fa-allergies',
      titleKey: 'allergyManagement',
      descriptionKey: 'allergyManagementDesc',
    },
  ];

  testimonials: Testimonial[] = [];

  get visibleTestimonials() {
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index =
        (this.currentTestimonialIndex + i) % this.testimonials.length;
      visible.push(this.testimonials[index]);
    }
    return visible;
  }

  nextTestimonial() {
    this.currentTestimonialIndex =
      (this.currentTestimonialIndex + 1) % this.testimonials.length;
  }

  previousTestimonial() {
    this.currentTestimonialIndex =
      this.currentTestimonialIndex === 0
        ? this.testimonials.length - 1
        : this.currentTestimonialIndex - 1;
  }

  ngOnInit() {
    this.setupIntersectionObserver();
    this.loadTestimonials();
  }

  private loadTestimonials() {
    this.testimonials = this.languageService.getTestimonials();

    // Subscribe to language changes to reload testimonials
    this.languageService.currentLanguage$.subscribe(() => {
      this.testimonials = this.languageService.getTestimonials();
      // Reset carousel position when language changes
      this.currentTestimonialIndex = 0;
    });
  }

  ngAfterViewInit() {
    // Apply initial hidden state to all animated elements
    this.animateCards.forEach((card, index) => {
      card.nativeElement.style.opacity = '0';
      card.nativeElement.style.transform = 'translateY(50px)';
      card.nativeElement.style.transition =
        'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    this.animateSections.forEach((section) => {
      section.nativeElement.style.opacity = '0';
      section.nativeElement.style.transform = 'translateY(30px)';
      section.nativeElement.style.transition =
        'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    });

    // Start observing elements
    this.observeElements();
  }

  ngOnDestroy() {
    if (this.observer) {
      this.observer.disconnect();
    }
  }

  private setupIntersectionObserver() {
    const options = {
      root: null,
      rootMargin: '0px 0px -100px 0px',
      threshold: 0.1,
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const element = entry.target as HTMLElement;

          if (element.classList.contains('animate-card')) {
            this.animateCard(element);
          } else if (element.classList.contains('animate-section')) {
            this.animateSection(element);
          }

          this.observer.unobserve(element);
        }
      });
    }, options);
  }

  private observeElements() {
    // Observe cards
    this.animateCards.forEach((card) => {
      this.observer.observe(card.nativeElement);
    });

    // Observe sections
    this.animateSections.forEach((section) => {
      this.observer.observe(section.nativeElement);
    });
  }

  private animateCard(element: HTMLElement) {
    const delay = parseInt(element.dataset['delay'] || '0');

    setTimeout(() => {
      element.style.opacity = '1';
      element.style.transform = 'translateY(0)';
    }, delay);
  }

  private animateSection(element: HTMLElement) {
    element.style.opacity = '1';
    element.style.transform = 'translateY(0)';
  }
}
