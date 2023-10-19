import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
import { NavService } from 'src/app/nav.service';
import { SearchService } from 'src/app/services/searchservice/search.service';
import { AuthService } from 'src/app/services/security/auth.service';
import { ThemeService } from 'src/app/theme.service';

@Component({
  selector: 'app-navbaradmin',
  templateUrl: './navbaradmin.component.html',
  styleUrls: ['./navbaradmin.component.css']
})
export class NavbaradminComponent {
  navLinks: { label: string; route: string }[] = [];
  isContentVisible = false;
  searchControl = new FormControl('');
  


  constructor(private searchService: SearchService, private themeService: ThemeService, private navService: NavService, private authService:AuthService) {
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
