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
  
    this.testElements.forEach((elementRef, index) => {
      const element = elementRef.nativeElement as HTMLElement;
  
      element.style.position = "absolute"; // Ensure absolute positioning
      element.style.width = `${transform.size.width}px`;
      element.style.height = `${transform.size.height}px`;
      element.style.top = `${transform.position.top}px`;
      element.style.left = `${transform.position.left}px`;
      element.style.transform = `rotate(${transform.rotation}deg)`;
      element.classList.add("animate"); // Trigger explosion animation
    });
  }
  
}
export interface TransformInfo {
  rotation: number;
  size: { width: number; height: number };
  position: { top: number; left: number };
}
