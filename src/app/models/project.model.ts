import { ProjectTag } from './project-tag.enum'; 
export class Project {
    constructor(
        public nom: string,
        public description: any[],
        public image: string,
        public tags: ProjectTag[] ,
        public invertImage?: boolean,
        public lienGithub?: string,
        public lienSiteWeb?: string
    ) {}
}
