Nonogram (racine)
│
├─ index.html
│   └─ Point d'entrée HTML + boutons pour "jouer" et "solveur"
│
├─ css/
│   └─ style.css
│       └─ Gestion styles grille, cellules, couleurs, surlignage
│
├─ js/
│   │
│   ├─ main.js
│   │   ├─ Crée le modèle (PuzzleModel + GridModel)
│   │   ├─ Crée la vue (GameView + ExplanationView)
│   │   ├─ Crée les controllers (GameController + SolverController)
│   │   └─ Lancement initial (render du puzzle)
│   │
│   ├─ model/ (contient ce que le modèle doit permettre)
│   │   ├─ CellState.js
│   │   │   └─ Enumération des états de cellule (UNKNOWN, EMPTY, FILLED)
│   │   ├─ GridModel.js
│   │   │   └─ Stocke la grille, get/set cellules, lignes et colonnes
│   │   ├─ PuzzleModel.js
│   │   │   └─ Contient GridModel + indices lignes/colonnes
│   │   └─ Rules.js
│   │       ├─ extractBlocks(line) → transforme une ligne en blocs noirs
│   │       ├─ lineMatchesClues(line, clues) → validation d’une ligne
│   │       └─ isSolved(puzzle) → puzzle complet validé
│   │
│   ├─ solver/
│   │   ├─ Deduction.js
│   │   │   └─ Objet décrivant une déduction (type, cases modifiées, explication)
│   │   ├─ Strategies.js
│   │   │   └─ Fonctions de déduction (full line, chevauchement, etc.)
│   │   ├─ LineSolver.js
│   │   │   └─ Applique les stratégies sur une ligne ou colonne
│   │   └─ Solver.js
│   │       ├─ nextDeduction() → retourne la prochaine déduction
│   │       └─ solve() → boucle jusqu’à résolution complète
│   │
│   ├─ view/
│   │   ├─ GridView.js
│   │   │   └─ Affiche la grille, met à jour les classes CSS
│   │   ├─ CluesView.js
│   │   │   └─ Affiche indices lignes/colonnes
│   │   ├─ GameView.js
│   │   │   └─ Coordonne GridView et CluesView
│   │   └─ ExplanationView.js
│   │       └─ Affiche le texte pédagogique pour chaque déduction
│   │
│   ├─ controller/
│   │   ├─ GameController.js
│   │   │   └─ Gère clics utilisateurs → modifie GridModel → rafraîchit vue
│   │   └─ SolverController.js
│   │       └─ Gère boutons solveur → demande nextDeduction → applique GridModel → rafraîchit vue + explanation
│   │
│   ├─ data/
│   │   └─ puzzles.js
│   │       └─ Contient puzzles prédéfinis
│   │
│   └─ utils/
│       └─ EventEmitter.js (optionnel pour observer des changements entre model et view)

*****SCHEMA Mental _ Chaîne des intéractions*******

Utilisateur
   ↓ clique
GridView
   ↓ notifie
GameView
   ↓ transmet
GameController
   ↓ modifie
GridModel / PuzzleModel
   ↓
GameController
   ↓ demande
GameView.render()
   ↓
GridView / CluesView
   ↓
DOM mis à jour