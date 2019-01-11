import {Ui} from './ui';

export class Game {
    private ui: Ui;
    private grid: Grid;

    constructor(canvas: HTMLCanvasElement) {
        this.ui = new Ui(canvas);
        this.grid = [
            [Player.O, Player.X, Player.X],
            [null, Player.O, null],
            [null, null, null],
        ];
    }

    public drawGrid() {
        this.ui.drawGrid(this.grid);
    }
}

export enum Player {
    X = 'X',
    O = 'O',
}

export type Grid = Array<Array<Player | null>>;
