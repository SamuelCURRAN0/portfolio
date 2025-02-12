import { CommonModule } from '@angular/common';
import { Component, AfterViewInit, HostListener  } from '@angular/core';
import { BoxComponent } from '../box/box.component';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [CommonModule, BoxComponent],
  templateUrl: './main-menu.component.html',
  styleUrls: ['./main-menu.component.scss']  // Corriger `styleUrl` en `styleUrls`
})
export class MainMenuComponent implements AfterViewInit {
  moveBoxes !: NodeListOf<Element>;
  constructor() { }
  private mouseInterval: any;
  mouseX = 0;
  mouseY = 0;

  ngAfterViewInit(): void {
    //this.moveBoxes = document.querySelectorAll('.moveBox');
  
    /*this.moveBoxes.forEach((box: any) => {
      const rect = box.getBoundingClientRect(); // Obtient les dimensions et la position
      console.log(`Position de l'élément:`);
      console.log(`- Haut: ${rect.top}`);
      console.log(`- Droite: ${rect.right}`);
      console.log(`- Bas: ${rect.bottom}`);
      console.log(`- Gauche: ${rect.left}`);
      console.log(`- Largeur: ${rect.width}`);
      console.log(`- Hauteur: ${rect.height}`);

    });*/
  }

  /*@HostListener('mousemove', ['$event']) onMouseMove(event: MouseEvent) {
    this.mouseX = event.clientX;
    this.mouseY = event.clientY;
    this.UpdateBox();
  }
  UpdateBox() : void {
    if (this.moveBoxes === undefined) {
      return;
    }
    this.moveBoxes.forEach((box: any) => {
      this.calculerLaDistance(box);
    });
  }
  calculerLaDistance(monElement:Element) : void{
    const rect = monElement.getBoundingClientRect();
    const posX = rect.left;
    const posY = rect.top;
    const distance = Math.sqrt(
      Math.pow(posX - this.mouseX, 2) + Math.pow(posY - this.mouseY, 2)
    );
    if(distance < 10) {
      console.log(monElement);
    }
  }*/
}
