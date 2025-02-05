import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslationContentService } from '../../services/translation-content.service';
import { Competence } from '../../models/competence.model';
@Component({
  selector: 'app-competences-liste',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './competences-liste.component.html',
  styleUrl: './competences-liste.component.scss'
})
export class CompetencesListeComponent {
  competences: Competence[] = [];
  mapCategorie: string[] = [];
  constructor(public translationContentService: TranslationContentService) { }
  
  ngOnInit(): void {
    this.competences = this.translationContentService.getCompetences() || [];
    this.mapCategorie = Array.from(new Set(this.competences.map(competence => competence.categorie)));
    for(let i = 0; i < this.mapCategorie.length; i++) {
      console.log(this.mapCategorie[i]);
    }
    console.log(this.competences);
  }

  getCompetencesByCategorie(categorie: string): Competence[] {
    return this.competences.filter(competence => competence.categorie === categorie);
  }
}
