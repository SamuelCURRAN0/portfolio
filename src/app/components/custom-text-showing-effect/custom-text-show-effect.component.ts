import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-custom-text-show-effect',
  imports: [],
  templateUrl: './custom-text-show-effect.component.html',
  styleUrls: ['./custom-text-show-effect.component.scss']
})
export class CustomTextShowEffectComponent {
  @Input() message!: string;
  currentMessage: string = '';
  isAnimationComplete: boolean = false;
  ngOnInit(): void {
    this.showMessage();
  }

  private showMessage(): void {
    this.isAnimationComplete = false;
    this.currentMessage = '';
    const messageArray = this.message.split('');
    let index = 0;

    const interval = setInterval(() => {
      if (index < messageArray.length) {
        this.currentMessage += messageArray[index];
        index++;
      } else {
        clearInterval(interval);
        this.isAnimationComplete = true;
      }
    }, 200);
  }
}
