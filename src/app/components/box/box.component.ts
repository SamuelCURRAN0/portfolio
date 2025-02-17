import { Component, ElementRef, Renderer2, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { RandomNumberService } from '../../services/random-number.service';
import { ExplosionComponent, TransformInfo } from '../explosion/explosion.component';
import { time } from 'node:console';
import { last } from 'rxjs';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [ExplosionComponent],
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements AfterViewInit {
  timeAnimation = 5;
  top = 10;
  left = 6;
  // Use static: false so the element is only queried after view initialization
  @ViewChild('box', { static: false }) boxElement?: ElementRef;
  @ViewChild(ExplosionComponent) explosionElement!: ExplosionComponent;
  constructor(
    private randomNumberService: RandomNumberService,
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    if (!this.boxElement) {
      console.error('Box element not found!');
      return;
    }
    this.generateValue();
    this.setValue();

    // Listen for the 'animationiteration' event on the box element.
    this.renderer.listen(this.boxElement.nativeElement, 'animationiteration', () => this.onAnimationEnd());
  }

  onAnimationEnd(): void {
    this.generateValue();
    this.setValue();
  }

  generateValue(): void {
    // Generate new random values for time, top, and left
    this.timeAnimation = this.randomNumberService.getRandomNumberInRange(5, 16);
    this.top = this.randomNumberService.getRandomNumberInRange(10, 90);
    this.left = this.randomNumberService.getRandomNumberInRange(10, 90);
  }

  setValue(): void {
    if (!this.boxElement) return;
    // Hide the box, update styles, then show it again
    this.renderer.setStyle(this.boxElement.nativeElement, 'display', 'none');
    setTimeout(() => {
      this.renderer.setStyle(this.boxElement?.nativeElement, 'animation-duration', `${this.timeAnimation}s`);
      this.renderer.setStyle(this.boxElement?.nativeElement, 'top', `${this.top}%`);
      this.renderer.setStyle(this.boxElement?.nativeElement, 'left', `${this.left}%`);
      setTimeout(() => {
        this.renderer.setStyle(this.boxElement?.nativeElement, 'display', 'block');
      }, 100);
    }, 400);
  }
  getRotation(element: HTMLElement): number {
    const transformMatrix = getComputedStyle(element).transform;
  
    if (transformMatrix === 'none') {
      return 0; // No rotation applied
    }
  
    const matrixValues = transformMatrix.match(/matrix\(([^)]+)\)/);
    if (!matrixValues) {
      return 0;
    }
  
    const values = matrixValues[1].split(',').map(parseFloat);
    const a = values[0], b = values[1];
    
    return Math.round(Math.atan2(b, a) * (180 / Math.PI)); // Convert radians to degrees
  }
  
  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.boxElement) return;
    const rect = this.boxElement.nativeElement.getBoundingClientRect(); // Get accurate size and position
  
    const transform: TransformInfo = {
      rotation: this.getRotation(this.boxElement.nativeElement),
      size: { 
        width: rect.width, // More accurate than offsetWidth
        height: rect.height 
      },
      position: { 
        top: rect.top + window.scrollY,  // Convert relative to absolute position
        left: rect.left + window.scrollX
      }
    };
    if(transform.position.left == 0 && transform.position.top == 0){
      return;
    }
    this.renderer.setStyle(this.boxElement.nativeElement, 'display', 'none');
    this.explosionElement.explosion(transform);
    setTimeout(() => {
      if (!this.boxElement) return;
      this.renderer.setStyle(this.boxElement.nativeElement, 'display', 'none');
      this.generateValue();
      this.setValue();
    }, 3000);
  }  
}
