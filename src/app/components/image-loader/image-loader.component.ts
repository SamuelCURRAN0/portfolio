import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.scss'],
})
export class ImageLoaderComponent implements OnInit {
  @Input() imageSrc!: string;
  @Input() speed: number = 40;

  clipPath: string = 'polygon(0% 0%, 100% 0%, 100% 0%, 0% 0%)';
  numberOfPoints: number = 50;
  valueOfPoints: number[] = [];

  ngOnInit() {
    this.startAnimation();
  }

  startAnimation() {
    this.valueOfPoints = new Array(this.numberOfPoints).fill(0);
    this.animate();
  }

  animate() {
    let finished = true;

    for (let i = 0; i < this.numberOfPoints; i++) {
      // Increment the value randomly and cap at 100
      this.valueOfPoints[i] = Math.min(this.valueOfPoints[i] + Math.random() * 3 + 1, 100);
      if (this.valueOfPoints[i] < 100) finished = false;
    }

    this.updateClipPath();

    if (!finished) {
      // Use requestAnimationFrame for smoother animation
      setTimeout(() => requestAnimationFrame(() => this.animate()), this.speed);
    }
  }

  updateClipPath() {
    const points = this.valueOfPoints
      .map((value, index) => {
        const x = -(100 / (this.numberOfPoints - 1)) * index + 100;
        return `${x}% ${value}%`;
      })
      .join(', ');

    this.clipPath = `polygon(0% 0%, 100% 0%, ${points})`;
  }
}
