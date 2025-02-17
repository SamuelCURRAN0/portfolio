import { Component, ElementRef, QueryList, ViewChildren, Renderer2, AfterViewInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RandomNumberService } from '../../services/random-number.service'; 

@Component({
  selector: 'app-explosion',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './explosion.component.html',
  styleUrls: ['./explosion.component.scss']  // Notice the plural 's'
})
export class ExplosionComponent implements AfterViewInit {
  @ViewChildren('testElements') testElements!: QueryList<ElementRef>;
  items = Array.from({ length: 100 }, (_, i) => i + 1); 

  constructor(
    private randomNumberService: RandomNumberService, 
    private renderer: Renderer2
  ) {}

  ngAfterViewInit(): void {

  }
  public explosion(transform: TransformInfo): void {
    console.log(transform);
    console.log("explode");
  
    const centerX = transform.position.left + transform.size.width / 2;
    const centerY = transform.position.top + transform.size.height / 2;
  
    this.testElements.forEach((elementRef, index) => {
      const element = elementRef.nativeElement as HTMLElement;
      const elementEnfant = element.querySelector('.item') as HTMLElement;
  
      element.style.position = "absolute";
      element.style.width = `${transform.size.width}px`;
      element.style.height = `${transform.size.height}px`;
      element.style.top = `${transform.position.top}px`;
      element.style.left = `${transform.position.left}px`;
      element.style.transform = `rotate(${transform.rotation}deg)`;
  
      // Generate a random angle for each item
      const angle = this.randomNumberService.getRandomNumberInRange(0, 360);
      const distance = this.randomNumberService.getRandomNumberInRange(50, 200); // Varying explosion force
  
      // Convert angle to radians
      const radians = (angle * Math.PI) / 180;
      const deltaX = Math.cos(radians) * distance;
      const deltaY = Math.sin(radians) * distance;
      this.renderer.setStyle(elementEnfant, 'display', 'block');
      this.renderer.setStyle(elementEnfant, 'opacity', '1');
      // Animate movement outward
      this.renderer.setStyle(elementEnfant, 'transition', 'transform 0.5s ease-out, opacity 0.5s ease-out');
      this.renderer.setStyle(elementEnfant, 'transform', `translate(${deltaX}px, ${deltaY}px)`);
    
      // Remove from DOM after fade-out
      setTimeout(() => {
        this.renderer.setStyle(elementEnfant, 'display', 'none');
        this.renderer.setStyle(elementEnfant, 'opacity', '0');
        this.renderer.setStyle(elementEnfant, 'transition', 'none'); // Remove previous transition
        this.renderer.setStyle(elementEnfant, 'transform', 'translate(0, 0)'); // Reset position
      }, 500);
    });
  }
  
  
  
}
export interface TransformInfo {
  rotation: number;
  size: { width: number; height: number };
  position: { top: number; left: number };
}
