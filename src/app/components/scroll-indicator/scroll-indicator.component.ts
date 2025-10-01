import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-scroll-indicator',
  templateUrl: './scroll-indicator.component.html',
  styleUrls: ['./scroll-indicator.component.scss']
})
export class ScrollIndicatorComponent {
  @Input() action!: () => void; 

  private timerId: NodeJS.Timeout | null = null;

  private lastTime:number = 0;
  showIndicator:boolean = false;

  show(){
    this.showIndicator = true;
  }
  onResetTimer() {
    this.showIndicator = false;
    if (this.timerId) {
      clearTimeout(this.timerId);
    }
    this.timerId = setTimeout(() => {
      this.show();
    }, 3000); // 3 seconds of inactivity
  }
}
