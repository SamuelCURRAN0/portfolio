import { Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { Project } from '../../models/project.model';
import { CommonModule } from '@angular/common';
import { statusColors } from '../../models/project-tag.enum';

@Component({
  selector: 'app-projet-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projet-detail.component.html',
  styleUrl: './projet-detail.component.scss',
})
export class ProjetDetailComponent {
  statusColors = statusColors;
  @Input() project?: Project | null;
  @ViewChild('modal') modalRef!: ElementRef;
  @Output() close = new EventEmitter<void>();

  ngAfterViewInit() {
    const modalEl = this.modalRef.nativeElement;

    modalEl.addEventListener('hidden.bs.modal', () => {
      this.close.emit();
    });
  }
}
