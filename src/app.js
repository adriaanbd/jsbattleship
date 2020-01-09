import Game from './game';

const columns = 10;
const rows = 10;
const size = columns * rows;

const game = Game(size, '#content');

document.addEventListener('DOMContentLoaded', () => game.play());
