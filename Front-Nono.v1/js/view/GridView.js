
// GridView est responsable de l’affichage de la grille du joueur.
// GridView est passif : il se contente de rendre les cellules selon leur état et de transmettre les clics au controller.
// Il ne connaît pas les indices, il ne sait pas résoudre le puzzle.

import { CellState } from "../model/CellState.js"; //import de l'état des cellules


export default class GridView { //export de la classe pour qu'elle puisse être réutilisé dans d'autres scripts
  constructor(container) { //fonction "constructor" à l'intérieur de la classe
    this.container = container; // div HTML qui contiendra toutes les cases du nonogram
  }

  // Méthode principale pour afficher une grille complète
  render(grid, puzzle) {
    this.container.innerHTML = ""; //supprime tout ce qui est déjà affiché, pour repartir à zéro.
    this.container.className = "grid";
    this.container.style.gridTemplateColumns = `repeat(${grid.cols}, 30px)`; //définit le nombre de colonnes dans le CSS Grid selon la taille réelle de la grille.

    // Parcours chaque cellule de la grille
    grid.cells.forEach((row, r) => { //on parcourt chaque ligne.
      row.forEach((cell, c) => { //on parcourt chaque cellule dans la ligne.
        const div = document.createElement("div"); //crée une div pour chaque cellule
        div.classList.add("cell");

        // Classe selon l’état logique
        if (cell === CellState.FILLED) div.classList.add("filled");
        if (cell === CellState.EMPTY) div.classList.add("empty");
        if (cell === CellState.UNKNOWN) div.classList.add("unknown");

        // feedback visuel des erreurs
        if (!puzzle.isCellCorrect(r, c)) {
          div.classList.add("error");
        }

        // Coordonnées pour le clic
        div.dataset.row = r;
        div.dataset.col = c;

        this.container.appendChild(div);
      });
    });
  }

  // Méthode pour gérer les clics sur les cellules
  bindCellClick(handler) {
    this.container.addEventListener("click", e => {
      if (e.target.classList.contains("cell")) {
        const row = parseInt(e.target.dataset.row);
        const col = parseInt(e.target.dataset.col);
        handler(row, col);
      }
    });
  }
}
