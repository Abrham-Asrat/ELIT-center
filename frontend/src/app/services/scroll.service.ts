import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ScrollService {
  /**
   * Scroll to the top of the page
   * This method tries multiple approaches to ensure compatibility across different browsers
   */
  scrollToTop(): void {
    try {
      // Try multiple approaches to ensure scrolling works
      // 1. Standard window scroll
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      
      // 2. Document element scroll (for older browsers)
      if (document.documentElement) {
        document.documentElement.scrollTop = 0;
      }
      
      // 3. Body scroll (fallback)
      if (document.body) {
        document.body.scrollTop = 0;
      }
    } catch (error) {
      console.warn('Unable to scroll to top:', error);
    }
  }

  /**
   * Scroll to a specific element by ID
   * @param elementId The ID of the element to scroll to
   */
  scrollToElement(elementId: string): void {
    try {
      const element = document.getElementById(elementId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    } catch (error) {
      console.warn('Unable to scroll to element:', error);
    }
  }

  /**
   * Scroll to a specific position
   * @param x The x coordinate to scroll to
   * @param y The y coordinate to scroll to
   */
  scrollToPosition(x: number, y: number): void {
    try {
      window.scrollTo({ top: y, left: x, behavior: 'smooth' });
    } catch (error) {
      console.warn('Unable to scroll to position:', error);
    }
  }
}