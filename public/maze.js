// maze.js

class Cell {
    constructor(row, col) {
        this.row = row;
        this.col = col;

        // 벽 4개 (상, 우, 하, 좌)
        this.walls = { top: true, right: true, bottom: true, left: true };

        this.visited = false;
    }
}

export function createGrid(rows, cols) {
    const grid = [];

    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
            row.push(new Cell(r, c));
        }
        grid.push(row);
    }

    return grid;
}

export function generateMaze(grid, startRow = 0, startCol = 0) {
    const stack = [];
    const startCell = grid[startRow][startCol];
    startCell.visited = true;

    stack.push(startCell);

    while (stack.length > 0) {
        const current = stack[stack.length - 1];

        const neighbors = getUnvisitedNeighbors(grid, current);

        if (neighbors.length > 0) {
            // 랜덤 이웃 선택
            const next = neighbors[Math.floor(Math.random() * neighbors.length)];

            // 벽 허물기
            removeWalls(current, next);

            next.visited = true;
            stack.push(next);
        } else {
            stack.pop();  // 되돌아가기 (Backtracking)
        }
    }
}

function getUnvisitedNeighbors(grid, cell) {
    const { row, col } = cell;
    const neighbors = [];

    // 위
    if (row > 0 && !grid[row - 1][col].visited)
        neighbors.push(grid[row - 1][col]);

    // 오른쪽
    if (col < grid[0].length - 1 && !grid[row][col + 1].visited)
        neighbors.push(grid[row][col + 1]);

    // 아래
    if (row < grid.length - 1 && !grid[row + 1][col].visited)
        neighbors.push(grid[row + 1][col]);

    // 왼쪽
    if (col > 0 && !grid[row][col - 1].visited)
        neighbors.push(grid[row][col - 1]);

    return neighbors;
}

function removeWalls(a, b) {
    const x = a.col - b.col;
    const y = a.row - b.row;

    if (x === 1) { 
        a.walls.left = false;
        b.walls.right = false;
    } else if (x === -1) {
        a.walls.right = false;
        b.walls.left = false;
    }

    if (y === 1) {
        a.walls.top = false;
        b.walls.bottom = false;
    } else if (y === -1) {
        a.walls.bottom = false;
        b.walls.top = false;
    }
}