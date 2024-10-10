import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Project } from '../../models/project.model';
import { statusColors } from '../../models/project-tag.enum';

@Component({
  selector: 'app-projet',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './projet.component.html',
  styleUrl: './projet.component.scss'
})
export class ProjetComponent {
  @Input() project!: Project;
  statusColors = statusColors;
}
