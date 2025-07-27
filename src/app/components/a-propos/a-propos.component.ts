import { Component } from '@angular/core';
import { TranslationContentService } from '../../services/translation-content.service';
import { AsyncPipe } from '@angular/common';

@Component({
    selector: 'app-a-propos',
    standalone: true,
    imports: [AsyncPipe],
    templateUrl: './a-propos.component.html',
    styleUrl: './a-propos.component.scss'
})
export class AProposComponent {
  constructor(public translationContentService: TranslationContentService) { }
}
