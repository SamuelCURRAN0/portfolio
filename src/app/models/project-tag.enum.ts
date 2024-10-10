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

export const statusColors = {
    [ProjectTag.Angular]: '#ff4d4d', // Softer red
    [ProjectTag.C]: '#4d94ff',       // Softer blue
    [ProjectTag.CPlus]: '#9966ff',   // Softer purple
    [ProjectTag.GestionDeProjet]: '#ffcc4d', // Softer orange
    [ProjectTag.JavaScript]: '#ffe04d', // Softer yellow
    [ProjectTag.Java]: '#66ff66',     // Softer green
    [ProjectTag.Laravel]: '#ff99cc',  // Softer pink
    [ProjectTag.mySQL]: '#cc9966',     // Softer brown
    [ProjectTag.PHP]: '#4F5B93',       // Light blue for PHP
};