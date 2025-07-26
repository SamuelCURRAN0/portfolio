import { Component, ElementRef, QueryList, ViewChildren, Renderer2, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomNumberService } from '../../services/random-number.service'; 

@Component({
  selector: 'app-explosion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './explosion.component.html',
  styleUrls: ['./explosion.component.scss']
})
export class ExplosionComponent implements AfterViewInit {
  @ViewChildren('testElements') testElements!: QueryList<ElementRef>;
  items = Array.from({ length: 100 }, (_, i) => i + 1); 

  constructor(
    private randomNumberService: RandomNumberService, 
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {
    // Initialize particles if needed
  }

  public explosion(transform: TransformInfo): void {
    console.log("explode");

    this.testElements.forEach((elementRef) => {
      const element = elementRef.nativeElement as HTMLElement;
      const elementEnfant = element.querySelector('.item') as HTMLElement;

      // First make sure the element is visible and reset
      this.renderer.removeStyle(elementEnfant, 'display');
      this.renderer.setStyle(elementEnfant, 'opacity', '1');
      this.renderer.setStyle(elementEnfant, 'transform', 'translate(0, 0)');
      
      // Apply initial position
      this.renderer.setStyle(element, 'position', 'absolute');
      this.renderer.setStyle(element, 'width', `${transform.size.width}px`);
      this.renderer.setStyle(element, 'height', `${transform.size.height}px`);
      this.renderer.setStyle(element, 'top', `${transform.position.top}px`);
      this.renderer.setStyle(element, 'left', `${transform.position.left}px`);
      this.renderer.setStyle(element, 'transform', `rotate(${transform.rotation}deg)`);
      
      const vertical = this.randomNumberService.getRandomNumberInRange(0, 1);
      let leftValue: string, topValue: string;
      if (vertical === 1) {
        topValue = this.randomNumberService.getRandomNumberInRange(0, 1) === 1 ? '100%' : '0%';
        leftValue = `${this.randomNumberService.getRandomNumberInRange(0, 100)}%`;
      } else {
        leftValue = this.randomNumberService.getRandomNumberInRange(0, 1) === 1 ? '100%' : '0%';
        topValue = `${this.randomNumberService.getRandomNumberInRange(0, 100)}%`;
      }
      
      this.renderer.setStyle(elementEnfant, 'left', leftValue);
      this.renderer.setStyle(elementEnfant, 'top', topValue);
      
      // Generate a random angle and distance
      const angle = this.randomNumberService.getRandomNumberInRange(0, 360);
      const distance = this.randomNumberService.getRandomNumberInRange(50, 200);

      // Convert angle to radians
      const radians = (angle * Math.PI) / 180;
      const deltaX = Math.cos(radians) * distance;
      const deltaY = Math.sin(radians) * distance;

      // Force a reflow to ensure the initial state is rendered
      elementEnfant.offsetHeight;

      // Animate explosion
      this.renderer.setStyle(elementEnfant, 'transition', 'transform 0.5s ease-out, opacity 0.5s ease-out');
      this.renderer.setStyle(elementEnfant, 'transform', `translate(${deltaX}px, ${deltaY}px)`);
      this.renderer.setStyle(elementEnfant, 'opacity', '0');

      // Reset for reuse
      setTimeout(() => {
        this.renderer.setStyle(elementEnfant, 'transition', 'none');
        this.renderer.setStyle(elementEnfant, 'transform', 'translate(0, 0)');
        this.renderer.setStyle(elementEnfant, 'display', 'none');
      }, 1000);
    });
  }
}
  
export interface TransformInfo {
  rotation: number;
  size: { width: number; height: number };
  position: { top: number; left: number };
}