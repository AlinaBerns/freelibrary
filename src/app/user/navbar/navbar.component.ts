import { Component, OnInit } from '@angular/core';
import { NavService } from 'src/app/nav.service';
import { AuthService } from 'src/app/services/security/auth.service';
import { ThemeService } from 'src/app/theme.service';
import { FormControl } from '@angular/forms';
import { debounceTime,} from 'rxjs/operators';
import { SearchService } from 'src/app/services/searchservice/search.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  navLinks: { label: string; route: string }[] = [];
  isContentVisible = false;
  
  searchControl = new FormControl('');

  constructor(private themeService: ThemeService, private navService: NavService, private authService:AuthService, private searchService: SearchService) {
    this.searchControl.valueChanges.pipe(
      debounceTime(300)
    ).subscribe(query => {
      if (query !== null) {
        this.searchService.updateSearchTerm(query);
      }
    });
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

  logOut(event: Event){
    console.log('logOut method called');
    event.stopImmediatePropagation();
    event.stopPropagation();
    this.authService.logOut();
  }


}
