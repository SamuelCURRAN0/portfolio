import { Component, ElementRef, Renderer2, AfterViewInit, ViewChild, HostListener } from '@angular/core';
import { RandomNumberService } from '../../services/random-number.service';
import { ExplosionComponent } from '../explosion/explosion.component';

@Component({
  selector: 'app-box',
  standalone: true,
  imports: [ExplosionComponent],
  templateUrl: './box.component.html',
  styleUrls: ['./box.component.scss']
})
export class BoxComponent implements AfterViewInit {
  triggerExplosion = false;
  timeAnimation = 5;
  top = 10;
  left = 6;

  // Use static: false so the element is only queried after view initialization
  @ViewChild('box', { static: false }) boxElement?: ElementRef;

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

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent): void {
    if (!this.boxElement) return;
    this.renderer.setStyle(this.boxElement.nativeElement, 'display', 'none');
    this.generateValue();
    this.setValue();
    this.triggerExplosion = true;
  }
}
