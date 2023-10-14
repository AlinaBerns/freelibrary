import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ThemeService {
  private renderer: Renderer2;
  private isDark: boolean;
  private isLight: boolean;
  private isMid: boolean;

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.isDark = this.getInitialTheme();
    this.isLight=this.getInitialTheme2();
    this.isMid = this.getInitialTheme3();
    this.updateTheme();
  }

  toggleTheme() {
    this.isDark = !this.isDark;
    this.isLight = !this.isLight;
    this.isMid =!this.isMid;
    this.saveThemePreference();
    this.updateTheme();
  }

  private getInitialTheme(): boolean {
    const savedTheme = localStorage.getItem('theme');
    // If a theme preference is saved in localStorage, use it; otherwise, default to light.
    return savedTheme === 'dark';
  }
  private getInitialTheme2(): boolean {
    const savedTheme = localStorage.getItem('theme');
    // If a theme preference is saved in localStorage, use it; otherwise, default to light.
    return savedTheme === 'light';
  }
  private getInitialTheme3(): boolean {
    const savedTheme = localStorage.getItem('theme');
    // If a theme preference is saved in localStorage, use it; otherwise, default to light.
    return savedTheme === 'mid';
  }

  private saveThemePreference() {
    localStorage.setItem('theme', this.isDark ? 'dark' :  'light');
  }

  private updateTheme() {
    const theme = this.isDark ? 'dark-theme' : 'light-theme';
    this.renderer.addClass(document.body, theme);
    this.renderer.removeClass(document.body, this.isDark ? 'light-theme' : 'dark-theme');
  }
  
}