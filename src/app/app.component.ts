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
import { Project } from './models/project.model';
import * as AOS from 'aos';
import { PageComponent } from './components/page/page.component';
import { ScrollIndicatorComponent } from './components/scroll-indicator/scroll-indicator.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CompetencesListeComponent,
    ContactComponent,
    DiplomesListeComponent,
    MainMenuComponent,
    ProjetsListeComponent,
    PageComponent,
    ScrollIndicatorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(ScrollIndicatorComponent) scrollIndicatorComponent!: ScrollIndicatorComponent;
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
    const pageComponent:PageComponent = this.pages.toArray()[this.selectedPageIndex];
    let el = pageComponent.elRef.nativeElement;
    el.scrollIntoView({ behavior: 'smooth' });
    this.scrollIndicatorComponent.onResetTimer();
    this.scrollIndicatorComponent.showOnThisPage = pageComponent.showScrollIndicatorOnThisPage;
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
    if(this.selectedProject) return;
    event.preventDefault();
    event.stopPropagation();
    if (this.scrollLocked) return;
    this.scrollLocked = true;
    if (event.deltaY > 0) {
      this.onScrollDown();
    } else if (event.deltaY < 0) {
      this.onScrollUp();
    }
    setTimeout(() => this.scrollLocked = false, this.throttleDelay);
  }

  // Prevent touch scroll on the host element (mobile)
  @HostListener('touchmove', ['$event'])
  onTouchMove(event: TouchEvent) {
    event.preventDefault();
  }
}
