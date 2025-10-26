import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, NavigationEnd } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './components/header.component';
import { FooterComponent } from './components/footer.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-root',
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'ELIT ENT Center';
  showHeader = true;
  showFooter = true;

  constructor(private router: Router) {}

  ngOnInit() {
    // Listen to route changes to hide header and footer on admin pages
    // and scroll to top
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        // Hide header and footer on admin-related routes
        const adminRoutes = [
          '/admin',
          '/super-admin',
          '/sub-admin',
          '/super-admin-login',
          '/sub-admin-login',
        ];
        const isAdminRoute = adminRoutes.some((route) =>
          event.urlAfterRedirects.startsWith(route)
        );
        this.showHeader = !isAdminRoute;
        this.showFooter = !isAdminRoute;

        // Scroll to top on every navigation
        window.scrollTo(0, 0);
      });
  }
}
