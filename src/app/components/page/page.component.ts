import { Component, ElementRef, HostListener, Input } from '@angular/core';

@Component({
  selector: 'app-page',
  templateUrl: './page.component.html',
  styleUrl: './page.component.scss',
})
export class PageComponent {

  constructor(public elRef: ElementRef) {}
}
