import { CommonModule } from '@angular/common';
import { Component, HostListener } from '@angular/core';
import { Project } from '../../models/project.model'; 
import { ProjectTag } from '../../models/project-tag.enum'; 
import { ProjetComponent } from '../projet/projet.component';

@Component({
  selector: 'app-projets-liste',
  standalone: true,
  imports: [CommonModule, ProjetComponent],
  templateUrl: './projets-liste.component.html',
  styleUrls: ['./projets-liste.component.scss'] // Corrected to 'styleUrls'
})
export class ProjetsListeComponent {
  dropdownVisible = false;
  projects: Project[] = [
    new Project('AlgoForge', 'Description for project 1', 'AlgoForge.png', [ProjectTag.JavaScript, ProjectTag.GestionDeProjet]),
    new Project('Application de comptage de colis', 'Description for project 2', 'e-scm.png', [ProjectTag.Angular, ProjectTag.Java, ProjectTag.mySQL, ProjectTag.GestionDeProjet]),
    new Project('Catalogue de CD', 'Description for project 3', 'cd.avif', [ProjectTag.PHP, ProjectTag.mySQL]),
    new Project('Sauce piquante', 'Description for project 3', 'hot-deal.png', [ProjectTag.Laravel, ProjectTag.mySQL]),
    new Project('Serveur de Chat', 'Description for project 3', 'messagerie.png', [ProjectTag.C]),
    new Project('Memory', 'Description for project 3', 'memory.webp', [ProjectTag.CPlus])
  ];

  projectsTags: string[] = [];
  checkboxStates: { [key: string]: boolean } = {};

  ngOnInit() {
    for (const project of this.projects) {
      for (const tag of project.tags) {
        if (!this.projectsTags.includes(tag)) {
          this.projectsTags.push(tag);
        }
      }
    }
    this.projectsTags.forEach(tag => {
      this.checkboxStates[tag] = true; // Set to true by default
    });
  }

  toggleDropdown() {
    this.dropdownVisible = !this.dropdownVisible;
  }

  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    if (!target.closest('.dropdown')) {
      this.dropdownVisible = false;
    }
  }

  toggleCheckbox(tag: string) {
    this.checkboxStates[tag] = !this.checkboxStates[tag];
  }

  // Method to get filtered projects based on selected tags
  filteredProjects(): Project[] {
    return this.projects.filter(project => 
      project.tags.some(tag => this.checkboxStates[tag])
    );
  }
}
