import {
  Component,
  OnInit,
  AfterViewInit,
  Inject,
  PLATFORM_ID,
  ViewChildren,
  QueryList,
  HostListener,
  ViewChild,
  NgZone,
} from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CompetencesListeComponent } from './components/competences-liste/competences-liste.component';
import { ContactComponent } from './components/contact/contact.component';
import { DiplomesListeComponent } from './components/diplomes-liste/diplomes-liste.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { ProjetsListeComponent } from './components/projets-liste/projets-liste.component';
import { ProjetDetailComponent } from './components/projet-detail/projet-detail.component';
import { Project } from './models/project.model';
import * as AOS from 'aos';
import { PageComponent } from './components/page/page.component';
import { ScrollIndicatorComponent } from './components/scroll-indicator/scroll-indicator.component';
import { Routing } from './models/routing.enum';
import { NavigationBarComponent } from './components/navigation-bar/navigation-bar.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CompetencesListeComponent,
    ContactComponent,
    DiplomesListeComponent,
    MainMenuComponent,
    ProjetsListeComponent,
    ProjetDetailComponent,
    PageComponent,
    ScrollIndicatorComponent,
    NavigationBarComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(ScrollIndicatorComponent)
  scrollIndicatorComponent!: ScrollIndicatorComponent;
  selectedProject: Project | null = null;
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private ngZone: NgZone
  ) {}
  title = 'portfolio';
  private defaultPrimaryBg = '#0c0f13';
  private defaultSecondaryBg = '#1a1d22';
  private currentPrimaryBg = this.defaultPrimaryBg;
  private currentSecondaryBg = this.defaultSecondaryBg;
  disabledIndicator = false;
  showNavBar = false;
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({ once: true, duration: 1000 });
    }
    this.ngZone.runOutsideAngular(() => {
      window.addEventListener('wheel', this.onWheel.bind(this), {
        passive: true,
      });
    });
  }

  private throttleDelay = 1000;
  private scrollLocked = false;

  onWheel(event: WheelEvent) {
    if (this.selectedProject) return;
    if (this.scrollLocked) return;
    if ((event.target as HTMLElement).closest('.filters')) {
      // If wheel happened inside a carousel, ignore it here
      return;
    }
    if (Math.abs(event.deltaY) < 2) return;
    this.scrollLocked = true;
    if (event.deltaY > 2) {
      this.onScrollDown();
    } else if (event.deltaY < -2) {
      this.onScrollUp();
    }
    setTimeout(() => (this.scrollLocked = false), this.throttleDelay);
  }

  ngAfterViewInit() {
    AOS.refresh();
    this.selectedProject = null;
    this.selectedPageIndex = 0;
    this.moveToCurrentPage();
    // This runs after the view is initialized, so all app-page instances are available
  }
  onProjectSelected(project: Project) {
    this.selectedProject = project;
  }

  @ViewChildren(PageComponent) pages!: QueryList<PageComponent>;
  selectedPageIndex: number = 0;

  buttonPressed() {
    console.log('button pressed');
    this.onScrollDown();
  }

  switchBgColor(
    currentColor: string,
    propertyName: string,
    newColor: string,
    duration: number = 800,
    steps: number = 30
  ) {
    if (newColor === currentColor) return;
    const startColor = currentColor;
    const endColor = newColor;
    let step = 0;

    const intervalTime = duration / steps;

    const interval = setInterval(() => {
      step++;
      const factor = step / steps;
      const currentColor = this.interpolateColor(startColor, endColor, factor);

      document.documentElement.style.setProperty(propertyName, currentColor);

      if (step >= steps) {
        clearInterval(interval);
        if (propertyName === '--secondary-bg')
          this.currentSecondaryBg = endColor;
        if (propertyName === '--primary-bg') this.currentPrimaryBg = endColor;
      }
    }, intervalTime);
  }

  moveToCurrentPage() {
    let el = this.pages.toArray()[this.selectedPageIndex].elRef.nativeElement;
    this.disabledIndicator =
      !this.pages.toArray()[this.selectedPageIndex].showScrollIndicator;
    this.showNavBar = this.pages.toArray()[this.selectedPageIndex].showNavBar;
    el.scrollIntoView({ behavior: 'smooth' });
    this.scrollIndicatorComponent.onResetTimer();
    const cp =
      this.pages.toArray()[this.selectedPageIndex].customPrimaryBgColor;
    const primaryColor = cp ? cp : this.defaultPrimaryBg;
    this.switchBgColor(
      this.currentPrimaryBg,
      '--primary-bg',
      primaryColor,
      1000,
      60
    );
    const cs =
      this.pages.toArray()[this.selectedPageIndex].customSecondaryBgColor;
    const secondaryColors = cs ? cs : this.defaultSecondaryBg;
    this.switchBgColor(
      this.currentSecondaryBg,
      '--secondary-bg',
      secondaryColors,
      1000,
      60
    );
  }
  onScrollDown() {
    if (this.selectedPageIndex < this.pages.length - 1) {
      this.selectedPageIndex++;
      this.moveToCurrentPage();
    }
  }
  onScrollUp() {
    if (this.selectedPageIndex > 0) {
      this.selectedPageIndex--;
      this.moveToCurrentPage();
    }
  }

  private lastTouchY: number | null = null;

  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    if (this.selectedProject) return;
    event.preventDefault();
    event.stopPropagation();
    if (this.scrollLocked) return;
    this.scrollLocked = true;

    // Detect scroll direction
    if (event.touches && event.touches.length) {
      const touch = event.touches[0];

      if (!this.lastTouchY) {
        this.lastTouchY = touch.clientY;
      } else {
        const deltaY = this.lastTouchY - touch.clientY;

        if (deltaY > 0) {
          this.onScrollDown();
        } else if (deltaY < 0) {
          this.onScrollUp();
        }

        this.lastTouchY = touch.clientY;
      }
    }

    setTimeout(() => (this.scrollLocked = false), this.throttleDelay);
  }

  modalClosed() {
    this.selectedProject = null;
  }

  navigateTo(section: Routing) {
    this.selectedPageIndex = section;
    this.moveToCurrentPage();
  }

  private hexToRgb(hex: string): [number, number, number] {
    hex = hex.replace(/^#/, '');
    if (hex.length === 3) {
      hex = hex
        .split('')
        .map((x) => x + x)
        .join('');
    }
    const num = parseInt(hex, 16);
    return [(num >> 16) & 255, (num >> 8) & 255, num & 255];
  }

  private rgbToHex(r: number, g: number, b: number): string {
    return `#${[r, g, b].map((x) => x.toString(16).padStart(2, '0')).join('')}`;
  }

  private interpolateColor(from: string, to: string, factor: number): string {
    const [r1, g1, b1] = this.hexToRgb(from);
    const [r2, g2, b2] = this.hexToRgb(to);
    const r = Math.round(r1 + factor * (r2 - r1));
    const g = Math.round(g1 + factor * (g2 - g1));
    const b = Math.round(b1 + factor * (b2 - b1));
    return this.rgbToHex(r, g, b);
  }
}
