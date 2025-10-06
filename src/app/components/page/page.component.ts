import { Component, ElementRef, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})
export class PageComponent {
  @Input() customPrimaryBgColor: string | null = null;
  @Input() customSecondaryBgColor: string | null = null;
  @Input() showScrollIndicator: boolean = true;
  @Input() showNavBar: boolean = true;
  constructor(public elRef: ElementRef) {}
}
