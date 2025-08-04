export enum ProjectTag {
    Angular = 'Angular', 
    C = 'C', 
    CPlus = 'C++',   
    ProjectManagement = 'Gestion de Projet', 
    JavaScript = 'JavaScript', 
    Java = 'Java',  
    Laravel = 'Laravel',
    mySQL = 'mySQL',
    PHP = 'PHP'
}
export const statusColors: Record<ProjectTag, string> = {
  [ProjectTag.Angular]: '#e53935',        // rouge plus profond
  [ProjectTag.C]: '#2563eb',              // bleu plus foncé
  [ProjectTag.CPlus]: '#7c3aed',          // violet foncé
  [ProjectTag.ProjectManagement]: '#f59e0b', // orange ambré foncé
  [ProjectTag.JavaScript]: '#fbbf24',     // ambré foncé au lieu de jaune
  [ProjectTag.Java]: '#16a34a',           // vert foncé
  [ProjectTag.Laravel]: '#db2777',        // rose foncé
  [ProjectTag.mySQL]: '#b45309',          // brun foncé
  [ProjectTag.PHP]: '#3b4c83',            // déjà assez foncé, gardé tel quel
};
