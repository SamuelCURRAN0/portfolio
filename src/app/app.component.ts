import { Component, OnInit, AfterViewInit,Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { CompetencesListeComponent } from './components/competences-liste/competences-liste.component';
import { ContactComponent } from './components/contact/contact.component';
import { DiplomesListeComponent } from './components/diplomes-liste/diplomes-liste.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { ProjetsListeComponent } from './components/projets-liste/projets-liste.component';
import { ProjetDetailComponent } from './components/projet-detail/projet-detail.component';
import { Project } from './models/project.model'; 
import * as AOS from 'aos';

@Component({
    selector: 'app-root',
    standalone:true,
    imports: [
        CompetencesListeComponent,
        ContactComponent,
        DiplomesListeComponent,
        MainMenuComponent,
        ProjetsListeComponent,
        ProjetDetailComponent
    ],
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
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
  }
  onProjectSelected(project: Project) {
    this.selectedProject = project;
  }
}
