import { Component, signal } from '@angular/core';
import { Router, NavigationEnd, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './core/header-component/header-component';
import { FooterComponent } from './core/footer-component/footer-component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.html',
  styleUrls: ['./app.css'],
})
export class App {
  protected readonly title = signal('ecommerce');
  showLayout = true;

  constructor(private router: Router) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.showLayout = !(
          event.url.includes('login') ||
          event.url.includes('register') ||
          event.url.includes('orderSuccess') ||
          event.url.includes('board')
        );
      }
    });
  }
}
