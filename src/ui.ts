import {Grid, Player} from './game';

export class Ui {
    private canvas: HTMLCanvasElement;

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    private get context(): CanvasRenderingContext2D {
        const context = this.canvas.getContext('2d')!;

        context.lineWidth = this.borderThickness();

        return context;
    }

    public mouseClickLocation(x: number, y: number): {row: number, col: number} | null {
        console.log(`mouseClickLocation(x=${x}, y=${y})`);
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const left = this.borderThickness() + col * (this.borderThickness() + this.cellWidth());
                const right = (1 + col) * (this.borderThickness() + this.cellWidth());
                const top = this.borderThickness() + row * (this.borderThickness() + this.cellHeight());
                const bottom = (1 + row) * (this.borderThickness() + this.cellHeight());

                if (x > left && x < right && y > top && y < bottom) {
                    return {row, col};
                }
            }
        }

        return null;
    }


    public drawGrid(grid: Grid) {
        // console.log(`drawGrid(), canvasHeight()=${this.canvasHeight()}, borderThickness()=${this.borderThickness()}, canvasWidth=${this.canvasWidth()}, cellHeight()=${this.cellHeight()}, cellWidth()=${this.cellWidth()}`);
        // console.log(`clientHeight=${this.canvas.clientHeight}, clientWidth=${this.canvas.clientWidth}`);

        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.drawBorders();

        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                const cellValue  = grid[row][col];
                this.drawCellValue(row, col, cellValue);
            }
        }
    }

    private canvasHeight() {
        return this.canvas.scrollHeight;
    }

    private canvasWidth() {
        return this.canvas.scrollWidth;
    }

    private borderThickness() {
        return Math.max(this.canvas.scrollHeight / 30, 1);
    }

    // the width of a cell, not including the border
    private cellWidth() {
        return (this.canvasWidth() - this.borderThickness()) / 3 - this.borderThickness();
    }

    private cellPaddingHorizontal() {
        return this.cellWidth() / 5;
    }

    // the height of a cell, not including the border
    private cellHeight() {
        return (this.canvasHeight() - this.borderThickness()) / 3 - this.borderThickness();
    }

    private cellPaddingVertical() {
        return this.cellHeight() / 5;
    }

    private drawBorders() {
        this.context.beginPath();

        const top = 0;
        const bottom = this.borderThickness() + (this.cellHeight() + this.borderThickness()) * 3;

        const leftThird = this.borderThickness() + this.cellWidth() + this.borderThickness() / 2;

        this.drawLine(leftThird, top, leftThird, bottom);

        const rightThird = 2 * (this.borderThickness() + this.cellWidth()) + this.borderThickness() / 2;

        this.drawLine(rightThird, top, rightThird, bottom);

        const left = 0;
        const right = this.borderThickness() + (this.cellHeight() + this.borderThickness()) * 3;

        const topThird = this.borderThickness() + this.cellHeight() + this.borderThickness() / 2;

        this.drawLine(left, topThird, right, topThird);

        const bottomThird = 2 * (this.cellHeight() + this.borderThickness()) + this.borderThickness() / 2;

        this.drawLine(left, bottomThird, right, bottomThird);
    }

    private drawLine(x1: number, y1: number, x2: number, y2: number) {
        this.context.moveTo(x1, y1);
        this.context.lineTo(x2, y2);
        this.context.stroke();
    }

    private drawEllipse(centerX: number, centerY: number, radiusX: number, radiusY: number) {
        this.context.beginPath();
        this.context.ellipse(centerX, centerY, radiusX, radiusY, 0, 0, 2 * Math.PI);
        this.context.stroke();
    }

    private drawCellValue(row: number, col: number, player: Player | null) {
        const cellTop  = this.borderThickness() + row * (this.borderThickness() + this.cellHeight());
        const cellLeft = this.borderThickness() + col * (this.borderThickness() + this.cellWidth());
        const cellBottom = cellTop + this.cellWidth();
        const cellRight  = cellLeft + this.cellWidth();

        // console.log(`drawCellValue(${row}, ${col}), top=${cellTop}, bottom=${cellBottom}, left=${cellLeft}, right=${cellRight}`);

        this.context.beginPath();

        switch (player) {
            case Player.X:
                const letterTop = cellTop + this.cellPaddingVertical();
                const letterLeft = cellLeft + this.cellPaddingHorizontal();
                const letterBottom = cellBottom - this.cellPaddingVertical();
                const letterRight = cellRight - this.cellPaddingHorizontal();

                this.drawLine(letterLeft, letterTop, letterRight, letterBottom);
                this.drawLine(letterRight, letterTop, letterLeft, letterBottom);
                break;
            case Player.O:
                const centerX = (cellLeft + cellRight) / 2;
                const centerY = (cellTop + cellBottom) / 2;
                const radiusX = (this.cellWidth() / 2) - this.cellPaddingHorizontal();
                const radiusY = (this.cellHeight() / 2) - this.cellPaddingVertical();
                this.drawEllipse(centerX, centerY, radiusX, radiusY);
                break;
            case null:
                // draw nothing
                break;
        }
    }
}
