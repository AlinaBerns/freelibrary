import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/nav.service';
import { ThemeService } from 'src/app/theme.service';
import { AuthService } from 'src/app/services/security/auth.service';

@Component({
  selector: 'app-navbarcart',
  templateUrl: './navbarcart.component.html',
  styleUrls: ['./navbarcart.component.css']
})
export class NavbarcartComponent implements OnInit{
  navLinks: { label: string; route: string }[] = [];
  isContentVisible = false;
  constructor(private themeService: ThemeService, private navService: NavService, private authService:AuthService) {}

  logOut(event: Event){
    console.log('logOut method called');
    event.stopImmediatePropagation();
    event.stopPropagation();
    this.authService.logOut();
  }

  ngOnInit(): void {
    this.navLinks = this.navService.getNavLinks();
  }

  toggleTheme() {
    this.themeService.toggleTheme();
  }
  showContent() {
    this.isContentVisible = true;
  }

  hideContent() {
    this.isContentVisible = false;
  }
}
