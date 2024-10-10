import { ProjectTag } from './project-tag.enum'; // Adjust the import path as necessary
export class Project {
    constructor(
        public nom: string,
        public description: string,
        public image: string,
        public tags: ProjectTag[] 
    ) {}
}
