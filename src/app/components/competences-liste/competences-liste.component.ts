import { Component } from '@angular/core';
import { TranslationContentService } from '../../services/translation-content.service';
@Component({
  selector: 'app-competences-liste',
  standalone: true,
  imports: [],
  templateUrl: './competences-liste.component.html',
  styleUrl: './competences-liste.component.scss'
})
export class CompetencesListeComponent {
  constructor(public translationContentService: TranslationContentService) { }

}
