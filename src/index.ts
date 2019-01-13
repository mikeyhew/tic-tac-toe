import {Game} from './game';

const canvas = document.querySelector("#game-canvas")! as HTMLCanvasElement;
const statusDiv = document.querySelector("#game-status")! as HTMLDivElement;
const game = new Game(canvas, statusDiv);

game.render();
