import { Component, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-buton-theme',
  standalone: true,
  imports: [],
  templateUrl: './buton-theme.component.html',
  styleUrls: ['./buton-theme.component.scss'] 
})
export class ButonThemeComponent {
  isDarkTheme: boolean = true;

  constructor(private renderer: Renderer2) {}

  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;

    if (this.isDarkTheme) {
      this.renderer.setAttribute(document.documentElement, 'data-theme', 'dark');
    } else {
      this.renderer.setAttribute(document.documentElement, 'data-theme', 'light');
    }
  }
}
