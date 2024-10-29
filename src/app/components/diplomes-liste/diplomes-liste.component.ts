import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Diplome } from '../../models/diplome.model';
import { TranslationContentService } from '../../services/translation-content.service';
@Component({
  selector: 'app-diplomes-liste',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './diplomes-liste.component.html',
  styleUrl: './diplomes-liste.component.scss'
})
export class DiplomesListeComponent {
  diplomes: Diplome[] = [
    new Diplome('BUT - Iut de Bayonne et du pays Basque', 'Connaissances et  compétences techniques spécialisées en informatique : réseaux, bases de données (dont base du SQL), programmation par la maîtrise des langages et des outils de développement du domaine (C++ et C#, Python,..)', 2022, 2025),
    new Diplome('Bac STI2D - Lycée hasparen', 'Ce cursus m’a apporté des compétences technologiques.', 2019, 2021)]
  constructor(public translationContentService: TranslationContentService) { }
}
