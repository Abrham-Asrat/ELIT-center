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
  welcomeTitleAnimation,
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
    welcomeTitleAnimation,
  ],
})
export class HomeComponent implements OnInit, OnDestroy, AfterViewInit {
  currentTestimonialIndex = 0;
  private observer!: IntersectionObserver;
  private resizeListener!: () => void;
  @ViewChildren('animateCard') animateCards!: QueryList<ElementRef>;
  @ViewChildren('animateSection') animateSections!: QueryList<ElementRef>;

  // Check if we're on a small screen where only one testimonial is shown
  isSmallScreen(): boolean {
    return window.innerWidth < 768;
  }

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

    if (this.isSmallScreen()) {
      // On small screens, show only one testimonial
      const index = this.currentTestimonialIndex % this.testimonials.length;
      visible.push(this.testimonials[index]);
    } else {
      // On larger screens, show three testimonials
      for (let i = 0; i < 3; i++) {
        const index =
          (this.currentTestimonialIndex + i) % this.testimonials.length;
        visible.push(this.testimonials[index]);
      }
    }

    return visible;
  }

  nextTestimonial() {
    if (this.isSmallScreen()) {
      // On small screens, move one testimonial at a time
      this.currentTestimonialIndex =
        (this.currentTestimonialIndex + 1) % this.testimonials.length;
    } else {
      // On larger screens, move three testimonials at a time
      this.currentTestimonialIndex =
        (this.currentTestimonialIndex + 3) % this.testimonials.length;
    }
  }

  previousTestimonial() {
    if (this.isSmallScreen()) {
      // On small screens, move one testimonial at a time
      this.currentTestimonialIndex =
        this.currentTestimonialIndex === 0
          ? this.testimonials.length - 1
          : this.currentTestimonialIndex - 1;
    } else {
      // On larger screens, move three testimonials at a time
      this.currentTestimonialIndex =
        this.currentTestimonialIndex === 0
          ? this.testimonials.length - 3
          : this.currentTestimonialIndex - 3;
      // Handle negative index
      if (this.currentTestimonialIndex < 0) {
        this.currentTestimonialIndex =
          this.testimonials.length + this.currentTestimonialIndex;
      }
    }
  }

  ngOnInit() {
    this.setupIntersectionObserver();
    this.loadTestimonials();
    this.setupResizeListener();
  }

  private setupResizeListener() {
    this.resizeListener = () => {
      // Reset carousel position when screen size changes significantly
      this.currentTestimonialIndex = 0;
    };
    window.addEventListener('resize', this.resizeListener);
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
    if (this.resizeListener) {
      window.removeEventListener('resize', this.resizeListener);
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
