
// Vue principale du jeu : coordonne GridView et CluesView

import GridView from "./GridView.js"; //import de l'affichage de la grille du joueur
import CluesView from "./CluesView.js"; //import des indices

export default class GameView { // export de la classe pour qu'elle puisse être réutilisé dans d'autres scripts
  constructor(gridContainer, rowContainer, colContainer){
    // Sous-vue pour la grille
    this.gridView = new GridView(gridContainer);

    // Sous-vue pour les indices
    this.cluesView = new CluesView(rowContainer, colContainer);
  }

  // Render complet : indices + grille
  render(puzzle){
    // 1Affiche les indices
    this.cluesView.render(puzzle.getRowClues(), puzzle.getColClues());

    // Affiche la grille via GridView
    this.gridView.render(puzzle.grid, puzzle);
  }

  // Permet au contrôleur de gérer les clics sur la grille
  bindCellClick(handler){
    this.gridView.bindCellClick(handler);
  }
}
