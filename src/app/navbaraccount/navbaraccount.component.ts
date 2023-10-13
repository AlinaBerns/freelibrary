import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/nav.service';
import { ThemeService } from 'src/app/theme.service';

@Component({
  selector: 'app-navbaraccount',
  templateUrl: './navbaraccount.component.html',
  styleUrls: ['./navbaraccount.component.css']
})
export class NavbaraccountComponent implements OnInit{
  navLinks: { label: string; route: string }[] = [];
  isContentVisible = false;

  constructor(private themeService: ThemeService, private navService: NavService) {}

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

