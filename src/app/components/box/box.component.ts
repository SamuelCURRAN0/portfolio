import { Component, ElementRef, Renderer2, AfterViewInit, HostListener } from '@angular/core';
import { RandomNumberService } from '../../services/random-number.service';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [],
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements AfterViewInit {

  timeAnimation = 5;
  top = 10;
  left = 6;

  constructor(private randomNumberService: RandomNumberService, 
              private elementRef: ElementRef,
              private renderer: Renderer2) {
  }

  ngAfterViewInit(): void {
    this.generateValue();
    this.setValue();
    this.renderer.listen(this.elementRef.nativeElement, 'animationend', () => this.onAnimationEnd());
  }

  onAnimationEnd(): void {
    console.log("Anim end");

  }

  generateValue(): void {
    // Generate new random values for time, top, and left
    this.timeAnimation = this.randomNumberService.getRandomNumberInRange(5, 16);
    this.top = this.randomNumberService.getRandomNumberInRange(10, 90);
    this.left = this.randomNumberService.getRandomNumberInRange(10, 90);
  }

  setValue(): void {
    // Set animation duration directly on the element
    this.renderer.setStyle(this.elementRef.nativeElement, 'animation-duration', `${this.timeAnimation}s`);
    // Set the position dynamically
    this.renderer.setStyle(this.elementRef.nativeElement, 'top', `${this.top}%`);
    this.renderer.setStyle(this.elementRef.nativeElement, 'left', `${this.left}%`);
  }

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const mouseX = event.clientX; // Position X de la souris
    const mouseY = event.clientY; // Position Y de la souris

    // Récupérer la position actuelle du composant
    const rect = this.elementRef.nativeElement.getBoundingClientRect();
    const componentCenterX = rect.left + rect.width / 2; // Centre du composant
    const componentCenterY = rect.top + rect.height / 2; // Centre du composant
    const distanceX = mouseX - componentCenterX;
    const distanceY = mouseY - componentCenterY;
    console.log(distanceX);
    // Définir les nouvelles positions avec des limites
    const newLeft = Math.max(0, Math.min(window.innerWidth - rect.width, (rect.width / 2-distanceX) + rect.left));
    const newTop = Math.max(0, Math.min(window.innerHeight - rect.height, (rect.height/2-distanceY) + rect.top));

    // Appliquer les nouvelles positions
    this.elementRef.nativeElement.style.left = newLeft + 'px';
    this.elementRef.nativeElement.style.top = newTop + 'px';
  }

}
