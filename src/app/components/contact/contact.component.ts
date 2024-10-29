import { Component } from '@angular/core';
import { TranslationContentService } from '../../services/translation-content.service';
@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss'
})
export class ContactComponent {
  constructor(public translationContentService: TranslationContentService) { }

}
