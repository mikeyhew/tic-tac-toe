import {Ui} from './ui';

export class Game {
    private statusDiv: HTMLDivElement;
    private ui: Ui;
    private grid: Grid;
    private playerToMove: Player;

    constructor(canvas: HTMLCanvasElement, statusDiv: HTMLDivElement) {
        this.statusDiv = statusDiv;
        this.ui = new Ui(canvas);
        this.grid = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ];
        this.playerToMove = Player.X;

        canvas.addEventListener('mousedown', (event) => {
            console.log(event);
            const location = this.ui.mouseClickLocation(event.offsetX, event.offsetY);

            if (location != null) {
                const {row, col} = location;

                this.onPlayerMove(row, col);
            }
        })
    }

    private onPlayerMove(row: number, col: number) {
        console.log(`onPlayerMove(${row}, ${col})`)
        this.fillCell(row, col, this.playerToMove);

        switch (this.playerToMove) {
            case Player.X:
                this.playerToMove = Player.O;
                break;
            case Player.O:
                this.playerToMove = Player.X;
                break;
        }

        this.render();
    }

    private fillCell(row: number, col: number, player: Player) {
        if (!([0,1,2].includes(row) && [0,1,2].includes(col))) {
            throw Error(`Bad cell coordinates: (${row}, ${col})`);
        }

        this.grid[row][col] = player;
    }

    public render() {
        this.statusDiv.innerHTML = `Make a move for ${this.playerToMove}`;
        this.ui.drawGrid(this.grid);
    }
}

export enum Player {
    X = 'X',
    O = 'O',
}

export type Grid = Array<Array<Player | null>>;
