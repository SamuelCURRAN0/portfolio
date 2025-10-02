import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-custom-text-show-effect',
  templateUrl: './custom-text-show-effect.component.html',
  styleUrls: ['./custom-text-show-effect.component.scss'],
})
export class CustomTextShowEffectComponent implements OnChanges {
  @Input() message!: string;
  @Input() speed: number = 200;

  currentMessage: string = '';
  isAnimationComplete: boolean = false;
  private typingInterval: any;

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['message'] && changes['message'].currentValue) {
      this.showMessage();
    }
  }

  private showMessage(): void {
    // Clear any running interval if message changes mid-animation
    if (this.typingInterval) {
      clearInterval(this.typingInterval);
    }

    this.isAnimationComplete = false;
    this.currentMessage = '';

    const messageArray = this.message.split('');
    let index = 0;

    this.typingInterval = setInterval(() => {
      if (index < messageArray.length) {
        this.currentMessage += messageArray[index];
        index++;
      } else {
        clearInterval(this.typingInterval);
        this.isAnimationComplete = true;
      }
    }, this.speed);
  }
}
