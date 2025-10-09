import { Component, Output, EventEmitter, Input } from '@angular/core';
import { TranslationContentService } from '../../services/translation-content.service';
import { AsyncPipe } from '@angular/common';
import { Routing } from '../../models/routing.enum';

@Component({
  selector: 'app-navigation-bar',
  imports: [AsyncPipe],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.scss',
})
export class NavigationBarComponent {
  @Input() showNavBar: boolean = true;
  Routing = Routing;
  @Output() scrollTo = new EventEmitter<Routing>();
  constructor(public translationContentService: TranslationContentService) {}
}
