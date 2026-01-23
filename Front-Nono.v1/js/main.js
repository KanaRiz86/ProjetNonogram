import GridModel from "./model/GridModel.js";
import PuzzleModel from "./model/PuzzleModel.js";
import GameView from "./view/GameView.js";
import GameController from "./controller/GameController.js";
import { CellState } from "./model/CellState.js";

const ROWS = 5;
const COLS = 5;

// Génère une solution aléatoire (fonction temporaire)
function generateRandomSolution(rows, cols){
  const solution=[];
  for(let r=0;r<rows;r++){
    const row=[];
    for(let c=0;c<cols;c++){
      // 50% chance que la case soit noire
      row.push(Math.random() < 0.5 ? 1 : 0);
    }
    solution.push(row);
  }
  return solution;
}

// Création du modèle
const grid = new GridModel(ROWS, COLS); //créé grâce à la classe dans le script "GridModel" ("grid" devient une instance)
const solution = generateRandomSolution(ROWS, COLS); //variable qui récupère les données de la grille aléatoire et qui les balances dans PuzzleModel
const puzzle = new PuzzleModel(grid, solution); //créé grâce à la classe dans le script "Puzzle Model"

// Création de la vue
const view = new GameView( //crée les sous-vues GridView et CluesView pour gérer l’affichage
  document.getElementById("grid"), //Fait le lien entre GridView et le DOM
  document.getElementById("clues-row"), // Fait le lien entre CluesView et le DOM
  document.getElementById("clues-col") // Fait le lien entre CluesView et le DOM
);

// Création du contrôleur
const controller = new GameController(puzzle, view);

// Premier rendu
view.render(puzzle);

// Lier les clics au contrôleur
view.bindCellClick((r, c) => controller.handleCellClick(r, c));
