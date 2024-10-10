import { ProjectTag } from './project-tag.enum'; 
export class Project {
    constructor(
        public nom: string,
        public description: string,
        public image: string,
        public tags: ProjectTag[] 
    ) {}
}
