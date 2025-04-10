import { Component, OnInit, AfterViewInit,Inject, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { AProposComponent } from './components/a-propos/a-propos.component';
import { BoxComponent } from './components/box/box.component';
import { ButonThemeComponent } from './components/buton-theme/buton-theme.component'
import { CompetencesListeComponent } from './components/competences-liste/competences-liste.component';
import { ContactComponent } from './components/contact/contact.component';
import { CustomScrollbarComponent } from './components/custom-scrollbar/custom-scrollbar.component';
import { CommonModule } from '@angular/common';
import { CustomTextEffectComponent } from './components/custom-text-effect/custom-text-effect.component'
import { DiplomesListeComponent } from './components/diplomes-liste/diplomes-liste.component';
import { ExplosionComponent } from './components/explosion/explosion.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { ProjetComponent } from './components/projet/projet.component';
import { ProjetsListeComponent } from './components/projets-liste/projets-liste.component';
import { ProjetDetailComponent } from './components/projet-detail/projet-detail.component';
import { Project } from './models/project.model'; 
import AOS from 'aos';
import 'aos/dist/aos.css';

@Component({
    selector: 'app-root',
    standalone: true, 
    imports: [
        AProposComponent,
        CompetencesListeComponent,
        ContactComponent,
        DiplomesListeComponent,
        MainMenuComponent,
        ProjetsListeComponent,
        ProjetDetailComponent,
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
