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
  diplomes: Diplome[] = [];
  constructor(public translationContentService: TranslationContentService) { }
  
  ngOnInit(): void {
    this.diplomes = this.translationContentService.getDiplomes() || [];
  }
}
