import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Project } from '../../models/project.model'; 
import {ProjectTag } from '../../models/project-tag.enum'; 
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
    new Project('AlgoForge', 'Description for project 1', 'AlgoForge.png', [ProjectTag.JavaScript, ProjectTag.GestionDeProjet]),
    new Project('Application de comptage de colis', 'Description for project 2', 'e-scm.png', [ProjectTag.Angular, ProjectTag.Java,ProjectTag.mySQL,ProjectTag.GestionDeProjet]),
    new Project('Catalogue de CD', 'Description for project 3', 'cd.avif', [ProjectTag.PHP, ProjectTag.mySQL]),
    new Project('Sauce piquante', 'Description for project 3', 'hot-deal.png', [ProjectTag.Laravel, ProjectTag.mySQL]),
    new Project('Serveur de Chat', 'Description for project 3', 'messagerie.png', [ProjectTag.C]),
    new Project('Memory', 'Description for project 3', 'memory.webp', [ProjectTag.CPlus])
];
}
