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

  explosion()
  {
    console.log("explode");
    this.testElements.forEach((element, index) => {
      const vertical = this.randomNumberService.getRandomNumberInRange(0, 1);
      let leftValue: string, topValue: string;
  
      if (vertical === 1) {
        topValue = this.randomNumberService.getRandomNumberInRange(0, 1) === 1 ? '100%' : '0%';
        leftValue = `${this.randomNumberService.getRandomNumberInRange(0, 100)}%`;
      } else {
        leftValue = this.randomNumberService.getRandomNumberInRange(0, 1) === 1 ? '100%' : '0%';
        topValue = `${this.randomNumberService.getRandomNumberInRange(0, 100)}%`;
      }
  
      // Set positions on each explosion element
      element.nativeElement.style.left = leftValue;
      element.nativeElement.style.top = topValue;
  
      // Set additional randomized properties (if you use these variables in your CSS via CSS variables)
      const randomRotation = Math.random() * 720;
      const randomY = Math.random() * 120;
  
      this.renderer.setStyle(element.nativeElement, '--rotation', `${randomRotation}deg`);
      this.renderer.setStyle(element.nativeElement, '--randomY', `${randomY}px`);
  
      // Start the animation after a slight delay to ensure styles are applied
      setTimeout(() => {
        this.renderer.addClass(element.nativeElement, 'animate');
      }, 50);
    });
  }

  @Input() set trigger(value: boolean) {
    if (value) {
      this.explosion();
    }
  }
}
