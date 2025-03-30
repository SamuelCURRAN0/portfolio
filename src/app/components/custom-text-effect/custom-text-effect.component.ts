import { Component, Input, OnChanges } from '@angular/core';
import { NgFor } from '@angular/common';

@Component({
    selector: 'app-custom-text-effect',
    standalone: true, 
    imports: [NgFor],
    templateUrl: './custom-text-effect.component.html',
    styleUrl: './custom-text-effect.component.scss'
})
export class CustomTextEffectComponent {
  @Input() message!: string;
  letters: string[] = [];

  ngOnChanges() {
    if (this.message) {
      this.letters = this.message.split('');
    }
  }
}
