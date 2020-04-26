# Battleship
> The renowned Battleship board game for a single player vs computer.

![Picture of the board](/screenshots/battleship.png?raw=true)

The ships are randomly placed upon page load or reload and the game begins as soon as you click on the opponent's board. You can move your ships by dragging them to a different position before the game starts. A hit is colored red and a miss is colored grey.

## Built With

- JavaScript
- Webpack
- Jest

## Live Demo

The app is deployed on Vercel (formely Zeit), and can be accessed through the following link, [here](https://jsbattleship.now.sh/).

## Getting Started

### Prerequisites

- NodeJS

### Setup

```bash
  git clone https://github.com/adriaanbd/jsbattlehsip.git
  cd jsbattleship
```

### Install

```bash
$ npm install
```

### Usage

```bash
$ npm run start
```

Open up your browser and go to `http://127.0.0.1:8080/dist/`

#### Gameflow

- Game starts as soon as you fire on the enemy grid
- Game ends as soon as all ships of one player have been sunk
- Drag your ships to change location before the first shot of the game
- Restart the game and/or change ship placements by refreshing the page.

#### Ship Placements

- The ships are randomly placed on page reload.
- If you reload the page you'll get a new ship placement setup.
- You can also drag and drop your ships into new locations, as long as its in your own board and the position isn't occupied by another ship.

#### Shooting

- You can shoot by clicking on the enemy grid.
- Hits are colored red.
- Misses are colored grey.

### Run tests

```bash
$ npm run test
Test Suites: 3 passed, 3 total
Tests:       28 passed, 28 total
Snapshots:   0 total
Time:        2.369s
Ran all test suites matching /.\/tests/i.
```

## Author

### Adriaan Beiertz

- [GitHub](https://gihub.com/adriaanbd)
- [Twitter](https://twitter.com/abeiertz)
- [LinkedIn](https://linkedin.com/adriaanbd)

## Contributing

Contributions, issues and feature requests are welcome!

Feel free to check the issues page, [here](https://github.com/adriaanbd/jsbattleship/issues).
