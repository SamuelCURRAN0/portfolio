import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Project } from '../../models/project.model'; 
import { ProjetComponent } from '../projet/projet.component';

@Component({
  selector: 'app-projets-liste',
  standalone: true,
  imports: [CommonModule, ProjetComponent],
  templateUrl: './projets-liste.component.html',
  styleUrl: './projets-liste.component.scss'
})
export class ProjetsListeComponent {
  projects: Project[] = [
    new Project('AlgoForge', 'Description for project 1', 'AlgoForge.png'),
    new Project('Application de comptage de colis', 'Description for project 2', 'e-scm.png'),
    new Project('Catalogue de CD', 'Description for project 3', 'cd.avif'),
    new Project('Sauce piquante', 'Description for project 3', 'hot-deal.png')
];
}
