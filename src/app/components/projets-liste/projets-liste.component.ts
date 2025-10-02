import { CommonModule, AsyncPipe } from '@angular/common';
import { Component, HostListener, Output, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Project } from '../../models/project.model'; 
import { ProjectTag } from '../../models/project-tag.enum'; 
import { ProjetComponent } from '../projet/projet.component';
import { TranslationContentService } from '../../services/translation-content.service';
import { ProjetDetailComponent } from "../projet-detail/projet-detail.component";

@Component({
    selector: 'app-projets-liste',
    standalone: true,
    imports: [CommonModule, ProjetComponent, AsyncPipe, ProjetDetailComponent],
    templateUrl: './projets-liste.component.html',
    styleUrls: ['./projets-liste.component.scss'] // Corrected to 'styleUrls'
})
export class ProjetsListeComponent {
  dropdownVisible = false;
  projects: Project[] = [];

  projectsTags: string[] = [];
  checkboxStates: { [key: string]: boolean } = {};
  selectedProject: Project | null = null;
  cursorValue: number = 0;
  cursorProjects: Project[] = [];
  @Output() projectSelected = new EventEmitter<Project>();

  constructor(public translationContentService: TranslationContentService) { }
  ngOnInit() {
    this.translationContentService.getProjets$().subscribe((projects: Project[]) => {
      this.projects = projects;
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
      this.updateCursorProject();
    });
}


  clickOnProject(project: Project) {
    this.cursorValue = this.projects.indexOf(project);
    console.log("Cursor value updated to:", this.cursorValue);
    this.updateCursorProject();
  }

  selectProject(project: Project) {
    this.selectedProject = project;
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
  updateCursorProject(): void {
    const numberOfProjectsToShow = 5;
    const numberOfLeftProjects = Math.floor(numberOfProjectsToShow / 2);
    const numberOfRightProjects = Math.ceil(numberOfProjectsToShow / 2);
    this.cursorProjects = [];
    for (let i = this.cursorValue-numberOfLeftProjects+1; i < this.cursorValue+numberOfRightProjects+1; i++) {
      let index = i;
      this.cursorProjects.push(this.projects[(index - 1 + this.projects.length) % this.projects.length]);
    }
    this.selectProject(this.projects[(this.cursorValue + this.projects.length) % this.projects.length]);
  }

  incrementCursorValue() {
    this.cursorValue++;
    this.updateCursorProject();
  }
  decrementCursorValue() {
    this.cursorValue--;
    this.updateCursorProject();
  }

  /*@ViewChild('scrollContainer') scrollContainer!: ElementRef;
  
  scrollLeft() {
    this.scrollContainer.nativeElement.scrollBy({
      left: -200, // adjust step size
      behavior: 'smooth'
    });
  }

  scrollRight() {
    this.scrollContainer.nativeElement.scrollBy({
      left: 200, // adjust step size
      behavior: 'smooth'
    });
  }

  scrollInterval: NodeJS.Timeout | null = null;
  stopScroll() {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
      this.scrollInterval = null;
    }
  }
  startScroll(direction: 'left' | 'right') {
    const step = direction === 'left' ? -30 : 30; // pixels per tick
    if(this.scrollInterval != null)
    {
      this.stopScroll();
      console.error("Scroll interval was not null");
      return;
    }
    this.scrollInterval = setInterval(() => {
      this.scrollContainer.nativeElement.scrollBy({ left: step, behavior: 'auto' });
    }, 20);
  }*/
}
