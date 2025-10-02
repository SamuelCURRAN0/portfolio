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
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(ScrollIndicatorComponent)
  scrollIndicatorComponent!: ScrollIndicatorComponent;
  selectedProject: Project | null = null;
  constructor(@Inject(PLATFORM_ID) private platformId: Object) {}
  title = 'portfolio';
  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      AOS.init({ once: true, duration: 1000 });
    }
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

  moveToCurrentPage() {
    let el = this.pages.toArray()[this.selectedPageIndex].elRef.nativeElement;
    el.scrollIntoView({ behavior: 'smooth' });
    this.scrollIndicatorComponent.onResetTimer();
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
  private throttleDelay = 1000;
  private scrollLocked = false;

  @HostListener('wheel', ['$event'])
  onWheel(event: WheelEvent) {
    if (this.selectedProject) return;
    if ((event.target as HTMLElement).closest('.filters')) {
      // If wheel happened inside a carousel, ignore it here
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    if (this.scrollLocked) return;
    this.scrollLocked = true;
    if (event.deltaY > 0) {
      this.onScrollDown();
    } else if (event.deltaY < 0) {
      this.onScrollUp();
    }
    setTimeout(() => (this.scrollLocked = false), this.throttleDelay);
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
}
