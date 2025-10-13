import {
  trigger,
  state,
  style,
  transition,
  animate,
  query,
  stagger,
  group,
  keyframes,
} from '@angular/animations';

// Page enter animation
export const pageEnter = trigger('pageEnter', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(30px)' }),
    animate(
      '600ms cubic-bezier(0.4, 0, 0.2, 1)',
      style({ opacity: 1, transform: 'translateY(0)' })
    ),
  ]),
]);

// Fade in animation
export const fadeIn = trigger('fadeIn', [
  transition(':enter', [
    style({ opacity: 0 }),
    animate('500ms ease-in', style({ opacity: 1 })),
  ]),
]);

// Slide in from left
export const slideInLeft = trigger('slideInLeft', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(-50px)' }),
    animate(
      '600ms cubic-bezier(0.4, 0, 0.2, 1)',
      style({ opacity: 1, transform: 'translateX(0)' })
    ),
  ]),
]);

// Slide in from right
export const slideInRight = trigger('slideInRight', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateX(50px)' }),
    animate(
      '600ms cubic-bezier(0.4, 0, 0.2, 1)',
      style({ opacity: 1, transform: 'translateX(0)' })
    ),
  ]),
]);

// Slide up animation
export const slideUp = trigger('slideUp', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(50px)' }),
    animate(
      '600ms cubic-bezier(0.4, 0, 0.2, 1)',
      style({ opacity: 1, transform: 'translateY(0)' })
    ),
  ]),
]);

// Scale in animation
export const scaleIn = trigger('scaleIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'scale(0.8)' }),
    animate(
      '500ms cubic-bezier(0.4, 0, 0.2, 1)',
      style({ opacity: 1, transform: 'scale(1)' })
    ),
  ]),
]);

// Stagger animation for lists
export const staggerCards = trigger('staggerCards', [
  transition('* => *', [
    query(
      ':enter',
      [
        style({ opacity: 0, transform: 'translateY(50px)' }),
        stagger('100ms', [
          animate(
            '600ms cubic-bezier(0.4, 0, 0.2, 1)',
            style({ opacity: 1, transform: 'translateY(0)' })
          ),
        ]),
      ],
      { optional: true }
    ),
  ]),
]);

// Bounce in animation
export const bounceIn = trigger('bounceIn', [
  transition(':enter', [
    animate(
      '1000ms',
      keyframes([
        style({ opacity: 0, transform: 'scale(0.3)', offset: 0 }),
        style({ opacity: 1, transform: 'scale(1.05)', offset: 0.5 }),
        style({ opacity: 1, transform: 'scale(0.95)', offset: 0.7 }),
        style({ opacity: 1, transform: 'scale(1)', offset: 1 }),
      ])
    ),
  ]),
]);

// Rotate in animation
export const rotateIn = trigger('rotateIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'rotate(-180deg) scale(0.8)' }),
    animate(
      '800ms cubic-bezier(0.4, 0, 0.2, 1)',
      style({ opacity: 1, transform: 'rotate(0deg) scale(1)' })
    ),
  ]),
]);

// Float animation for continuous motion
export const float = trigger('float', [
  state('floating', style({ transform: 'translateY(0px)' })),
  transition('* => floating', [
    animate(
      '2s ease-in-out infinite alternate',
      style({ transform: 'translateY(-10px)' })
    ),
  ]),
]);

// Page transition with route animation
export const routeAnimation = trigger('routeAnimation', [
  transition('* <=> *', [
    group([
      query(
        ':enter',
        [
          style({ opacity: 0, transform: 'translateX(100%)' }),
          animate(
            '600ms cubic-bezier(0.4, 0, 0.2, 1)',
            style({ opacity: 1, transform: 'translateX(0%)' })
          ),
        ],
        { optional: true }
      ),
      query(
        ':leave',
        [
          style({ opacity: 1, transform: 'translateX(0%)' }),
          animate(
            '600ms cubic-bezier(0.4, 0, 0.2, 1)',
            style({ opacity: 0, transform: 'translateX(-100%)' })
          ),
        ],
        { optional: true }
      ),
    ]),
  ]),
]);

// Button hover animation
export const buttonHover = trigger('buttonHover', [
  state('normal', style({ transform: 'scale(1)' })),
  state('hovered', style({ transform: 'scale(1.05)' })),
  transition('normal <=> hovered', [animate('200ms ease-in-out')]),
]);

// Container animations
export const containerSlideIn = trigger('containerSlideIn', [
  transition(':enter', [
    style({ opacity: 0, transform: 'translateY(100px)' }),
    animate(
      '800ms cubic-bezier(0.4, 0, 0.2, 1)',
      style({ opacity: 1, transform: 'translateY(0)' })
    ),
  ]),
]);
