import {Game} from './game';

const canvas = document.querySelector("#game-canvas")! as HTMLCanvasElement;
const game = new Game(canvas);

game.drawGrid();
