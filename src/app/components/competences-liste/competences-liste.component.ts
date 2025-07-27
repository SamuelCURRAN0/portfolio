import { Component } from '@angular/core';
import { CommonModule, AsyncPipe } from '@angular/common';
import { TranslationContentService } from '../../services/translation-content.service';
import { Competence } from '../../models/competence.model';
@Component({
    selector: 'app-competences-liste',
    standalone: true,
    imports: [CommonModule, AsyncPipe],
    templateUrl: './competences-liste.component.html',
    styleUrl: './competences-liste.component.scss'
})
export class CompetencesListeComponent {
  competences: Competence[] = [];
  constructor(public translationContentService: TranslationContentService) { }
  
  ngOnInit(): void {
    this.translationContentService.getCompetences$().subscribe((competences: Competence[]) => {
      this.competences = competences;
    });  
  }
}

