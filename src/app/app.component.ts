import { Component, OnInit, AfterViewInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { AProposComponent } from './components/a-propos/a-propos.component';
import { BoxComponent } from './components/box/box.component';
import { CompetencesListeComponent } from './components/competences-liste/competences-liste.component';
import { ContactComponent } from './components/contact/contact.component';
import { CustomScrollbarComponent } from './components/custom-scrollbar/custom-scrollbar.component';
import { DiplomesListeComponent } from './components/diplomes-liste/diplomes-liste.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { ProjetComponent } from './components/projet/projet.component';
import { ProjetsListeComponent } from './components/projets-liste/projets-liste.component';
import * as AOS from 'aos';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    AProposComponent,
    BoxComponent,
    CompetencesListeComponent,
    ContactComponent,
    CustomScrollbarComponent,
    DiplomesListeComponent,
    MainMenuComponent,
    ProjetComponent,
    ProjetsListeComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'portfolio';
  ngOnInit() {
    AOS.init();
  }
  ngAfterViewInit() {
    AOS.refresh();
  }
}
