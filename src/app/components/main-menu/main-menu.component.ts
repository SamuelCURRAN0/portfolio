import { CommonModule } from '@angular/common';
import { Component, AfterViewInit } from '@angular/core';
import { BoxComponent } from '../box/box.component';
import { CustomTextEffectComponent } from '../custom-text-effect/custom-text-effect.component';

@Component({
    selector: 'app-main-menu',
        standalone: true, 
    imports: [
        CommonModule,
        BoxComponent,
        CustomTextEffectComponent
    ],
    templateUrl: './main-menu.component.html',
    styleUrls: ['./main-menu.component.scss'] // Corriger `styleUrl` en `styleUrls`
})
export class MainMenuComponent implements AfterViewInit {
  moveBoxes !: NodeListOf<Element>;
  constructor() { }
  private mouseInterval: any;
  mouseX = 0;
  mouseY = 0;

  ngAfterViewInit(): void {
  }
}
