
// Affiche uniquement les indices des lignes et des colonnes du nonogramme

export default class CluesView { //export de la classe pour qu'elle puisse être réutilisé dans d'autres scripts
  constructor(rowContainer, colContainer){
    this.rowContainer = rowContainer; // div pour les indices lignes
    this.colContainer = colContainer; // div pour les indices colonnes
  }//this.rowContainer et this.colContainer sont des références internes pour pouvoir manipuler le DOM dans la méthode render

  render(rowClues, colClues){ //Cette méthode met à jour l’affichage des indices

    //lignes
    this.rowContainer.innerHTML = ""; //on efface l’ancien contenu pour ne pas superposer.
    rowClues.forEach(clue=>{ //on parcourt le tableau d'indices.
      const div = document.createElement("div"); // on crée un div pour chaque ligne
      div.textContent = clue.join(" "); //join(" ") transforme [3,1] en "3 1" pour que ça s’affiche correctement dans le div.
      this.rowContainer.appendChild(div); // ajoute le div dans le container
    });

    //colonnes
    this.colContainer.innerHTML = ""; // vide le container
    colClues.forEach(clue=>{
      const div = document.createElement("div"); // div pour chaque colonne
      clue.forEach(n=>{
        const span = document.createElement("div"); // div pour chaque chiffre
        span.textContent = n;          // chaque chiffre dans sa div
        div.appendChild(span);  // met le chiffre dans la colonne
      });
      this.colContainer.appendChild(div);  // ajoute la colonne dans le container
    });
  }
}
//Pourquoi ce n’est pas juste join(" ") comme pour les lignes ?
//Parce qu’on veut afficher les chiffres de la colonne verticalement, pas horizontalement.
//Chaque chiffre doit être empilé dans sa propre div pour pouvoir utiliser du CSS display: grid et aligner verticalement.
