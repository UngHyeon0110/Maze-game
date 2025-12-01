export class Player {
    constructor(row, col, cellSize, color = "yellow") {
        this.row = row;
        this.col = col;
        this.cellSize = cellSize;
        this.color = color;
    }

    draw(ctx) {
        const x = this.col * this.cellSize + this.cellSize / 4;
        const y = this.row * this.cellSize + this.cellSize / 4;
        const size = this.cellSize / 2;

        ctx.fillStyle = this.color;
        ctx.fillRect(x, y, size, size);
    }
}