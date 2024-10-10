import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CompetencesListeComponent } from './components/competences-liste/competences-liste.component';
import { ContactComponent } from './components/contact/contact.component';
import { DiplomesListeComponent } from './components/diplomes-liste/diplomes-liste.component';
import { MainMenuComponent } from './components/main-menu/main-menu.component';
import { ProjetComponent } from './components/projet/projet.component';
import { ProjetsListeComponent } from './components/projets-liste/projets-liste.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,CompetencesListeComponent,ContactComponent,DiplomesListeComponent,MainMenuComponent,ProjetComponent,ProjetsListeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'portfolio';
}
