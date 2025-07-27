import { CommonModule, AsyncPipe } from '@angular/common';
import { Component } from '@angular/core';
import { Diplome } from '../../models/diplome.model';
import { TranslationContentService } from '../../services/translation-content.service';
@Component({
    standalone: true,
    selector: 'app-diplomes-liste',
    imports: [CommonModule, AsyncPipe],
    templateUrl: './diplomes-liste.component.html',
    styleUrl: './diplomes-liste.component.scss'
})
export class DiplomesListeComponent {
  diplomes: Diplome[] = [];
  constructor(public translationContentService: TranslationContentService) { }
  
  ngOnInit(): void {
    this.translationContentService.getDiplomes$().subscribe((diplomes: Diplome[]) => {
      this.diplomes = diplomes;
    });
  }
}
