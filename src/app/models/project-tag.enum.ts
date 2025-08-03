export enum ProjectTag {
    Angular = 'Angular', 
    C = 'C', 
    CPlus = 'C++',   
    GestionDeProjet = 'Gestion de Projet', 
    JavaScript = 'JavaScript', 
    Java = 'Java',  
    Laravel = 'Laravel',
    mySQL = 'mySQL',
    PHP = 'PHP'
}

export const statusColors: Record<ProjectTag, string> = {
  [ProjectTag.Angular]: '#ff4d4d',
  [ProjectTag.C]: '#4d94ff',
  [ProjectTag.CPlus]: '#9966ff',
  [ProjectTag.GestionDeProjet]: '#ffcc4d',
  [ProjectTag.JavaScript]: '#ffe04d',
  [ProjectTag.Java]: '#66ff66',
  [ProjectTag.Laravel]: '#ff99cc',
  [ProjectTag.mySQL]: '#cc9966',
  [ProjectTag.PHP]: '#4F5B93',
};