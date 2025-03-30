import { Component } from '@angular/core';
import { TranslationContentService } from '../../services/translation-content.service';

@Component({
    selector: 'app-a-propos',
    standalone: true, 
    imports: [],
    templateUrl: './a-propos.component.html',
    styleUrl: './a-propos.component.scss'
})
export class AProposComponent {
  constructor(public translationContentService: TranslationContentService) { }
}
