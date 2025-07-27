import { Component } from '@angular/core';
import { TranslationContentService } from '../../services/translation-content.service';
import { AsyncPipe } from '@angular/common';
@Component({
    selector: 'app-contact',
    standalone: true,
    imports: [AsyncPipe],
    templateUrl: './contact.component.html',
    styleUrl: './contact.component.scss'
})
export class ContactComponent {
  constructor(public translationContentService: TranslationContentService) { }

}
