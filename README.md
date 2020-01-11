# Battleship
Battleship, the game, on JavaScript

## Overview

* Game - in charge of keeping track of game, switching turns and listening for drag or click events.
* Board - in charge of managing the board, adding ships, removing ships, and setting the board on the screen.
* Ship - in charge of ship operations like reporting a hit / sink and changing positions.
* FirstMate - helper to set ship in a random position in the grid
* Cell - generates a node or several node elements to append to the page.

## How to Play

You can play locally by cloning the project and running a development server.

### Setup

1. Clone the project
```bash
  git clone https://github.com/adriaanbd/jsbattlehsip.git
  cd jsbattleship
```

2. Install packages: `$ npm install`;

3. Start the live-server: `$ npm run start`;

4. Open up your browser and go to `http://127.0.0.1:8080/dist/`

### Gameflow

Game starts as soon as you fire on the enemy grid and the game ends as soon as all ships of one player have been sunk, you can drag your ships to change location before the first shot of the game, and you can restart the game and/or change ship placements by refreshing the page.

#### Ship Placements
1. The ships are randomly placed on page reload.
2. If you reload the page you'll get a new ship placement setup.
3. You can also drag and drop your ships into new locations, as long as its in your own board and the position isn't occupied by another ship.

#### Shooting
1. You can shoot by clicking on the enemy grid.
2. Hits are colored red.
3. Misses are colored grey.

## How to contribute

1. Clone the project
```bash
  git clone https://github.com/adriaanbd/jsbattlehsip.git
  cd jsbattleship
```

2. Install packages: `$ npm install`;

3. Start the live-server: `$ npm run start`;

4. Watch for changes: `$ run watch`;

5. Make changes to the code.
