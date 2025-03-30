import { CommonModule } from '@angular/common';
import { Component, HostListener, Output, EventEmitter } from '@angular/core';
import { Project } from '../../models/project.model'; 
import { ProjectTag } from '../../models/project-tag.enum'; 
import { ProjetComponent } from '../projet/projet.component';
import { TranslationContentService } from '../../services/translation-content.service';

@Component({
    selector: 'app-projets-liste',
    standalone: true, 
    imports: [CommonModule, ProjetComponent],
    templateUrl: './projets-liste.component.html',
    styleUrls: ['./projets-liste.component.scss'] // Corrected to 'styleUrls'
})
export class ProjetsListeComponent {
  dropdownVisible = false;
  projects: Project[] = [];

  projectsTags: string[] = [];
  checkboxStates: { [key: string]: boolean } = {};
  selectedProject: Project | null = null;
  @Output() projectSelected = new EventEmitter<Project>();

  constructor(public translationContentService: TranslationContentService) { }
  ngOnInit() {
    this.projects = this.translationContentService.getProjets() || [];

    for (const project of this.projects) {
        project.tags.sort();
        project.tags = project.tags.map(tag => ProjectTag[tag as keyof typeof ProjectTag]);
        for (const tag of project.tags) {
          if (!this.projectsTags.includes(tag)) {
              this.projectsTags.push(tag);
          }
      }
    }
    this.projectsTags.sort();
    this.projectsTags.forEach(tag => {
        this.checkboxStates[tag] = true;
    });
}


  selectProject(project: Project) {
    this.selectedProject = project;
    this.projectSelected.emit(project);
  }

  openModal() {
    document.getElementById('modal')!.style.display = 'block';
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

  filteredProjects(): Project[] {
    return this.projects.filter(project => 
      project.tags.some(tag => this.checkboxStates[tag])
    );
  }
}
