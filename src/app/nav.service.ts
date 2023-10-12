import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class NavService {
  private navLinks: { label: string; route: string }[] = [
    // { label: 'Home', route: '/' },
    // { label: 'Account', route: '/account' }
  ];

  getNavLinks() {
    return this.navLinks;
  }
}