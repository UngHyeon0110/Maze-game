// public/main.js

import { createGrid, generateMaze } from "./maze.js";
import { Player } from "./player.js";

const STAGES = {
    1: { rows: 5, cols: 5, cellSize: 30, sight: "normal", monster: false },
    2: { rows: 7, cols: 7, cellSize: 30, sight: "normal", monster: false },

    3: { rows: 9, cols: 9, cellSize: 30, sight: "normal", monster: false },
    4: { rows: 11, cols: 11, cellSize: 30, sight: "normal", monster: false },

    5: { rows: 13, cols: 13, cellSize: 35, sight: "normal", monster: false, obstacle: true },
    6: { rows: 15, cols: 15, cellSize: 35, sight: "normal", monster: false, obstacle: true },

    7: { rows: 17, cols: 17, cellSize: 30, sight: "limited", monster: false, obstacle: false },
    8: { rows: 19, cols: 19, cellSize: 30, sight: "limited", monster: false, obstacle: true },

    9: { rows: 21, cols: 21, cellSize: 25, sight: "normal", monster: true , obstacle: false },
    10:{ rows: 23, cols: 23, cellSize: 25, sight: "limited", monster: true, obstacle: true }
};

let rows, cols, cellSize;
let grid, start, goal, player;
    
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

// 스테이지 선택 시 게임 시작
function startGame(stageNum) {
    const stage = STAGES[stageNum];

    rows = stage.rows;
    cols = stage.cols;
    cellSize = stage.cellSize;

    canvas.width = cols * cellSize;
    canvas.height = rows * cellSize;

    // 미로 새로 만들기
    grid = createGrid(rows, cols);
    generateMaze(grid);

    // 출발/도착점 생성
    start = { row: rows - 1, col: cols - 1 };
    goal = { row: 0, col: 0 };

    // 플레이어 위치 초기화
    player = new Player(start.row, start.col, cellSize);

    draw();
}



function drawMaze() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.strokeStyle = "#fff";

    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
            const cell = grid[r][c];
            const x = c * cellSize;
            const y = r * cellSize;

            if (cell.walls.top) {
                ctx.beginPath();
                ctx.moveTo(x, y);
                ctx.lineTo(x + cellSize, y);
                ctx.stroke();
            }
            if (cell.walls.right) {
                ctx.beginPath();
                ctx.moveTo(x + cellSize, y);
                ctx.lineTo(x + cellSize, y + cellSize);
                ctx.stroke();
            }
                
            if (cell.walls.bottom) {
                ctx.beginPath();
                ctx.moveTo(x + cellSize, y + cellSize);
                ctx.lineTo(x, y + cellSize);
                ctx.stroke();
            }
                
            if (cell.walls.left) {
                ctx.beginPath();
                ctx.moveTo(x, y + cellSize);
                ctx.lineTo(x, y);
                ctx.stroke();
            }
        }
    }
}

// 출발/도착점
function drawStartGoal() {
    // 출발점 = 초록색
    ctx.fillStyle = "green";
    ctx.fillRect(
        start.col * cellSize + cellSize * 0.2,
        start.row * cellSize + cellSize * 0.2,
        cellSize * 0.6,
        cellSize * 0.6
    );

    // 도착점 = 빨간색
    ctx.fillStyle = "red";
    ctx.fillRect(
        goal.col * cellSize + cellSize * 0.2,
        goal.row * cellSize + cellSize * 0.2,
        cellSize * 0.6,
        cellSize * 0.6
    );
}

// 이동
function movePlayer(dx, dy) {
    const currentCell = grid[player.row][player.col];

    // 위로 이동
    if (dy === -1 && !currentCell.walls.top) player.row -= 1;
    // 아래로 이동
    if (dy === 1 && !currentCell.walls.bottom) player.row += 1;
    // 왼쪽 이동
    if (dx === -1 && !currentCell.walls.left) player.col -= 1;
    // 오른쪽 이동
    if (dx === 1 && !currentCell.walls.right) player.col += 1;
}

function checkGoal() {
    if (player.row === goal.row && player.col === goal.col) {
        alert("🎉 클리어!");
    }
}

document.addEventListener("keydown", (e) => {
    const key = e.key;

    if (key === "ArrowUp" || key === "w") movePlayer(0, -1);
    if (key === "ArrowDown" || key === "s") movePlayer(0, 1);
    if (key === "ArrowLeft" || key === "a") movePlayer(-1, 0);
    if (key === "ArrowRight" || key === "d") movePlayer(1, 0);

    checkGoal();
    draw();  // 화면 다시 그림
});

// 화면 전체 다시 그리기
function draw() {
    drawMaze();       // 미로 그리기
    drawStartGoal();  // 출발/도착 지점 그리기
    player.draw(ctx); // 플레이어 그리기
}

// Start 버튼
document.getElementById("startBtn").addEventListener("click", () => {
    const stageNum = Number(document.getElementById("stageSelect").value);

    // 시작 UI 오른쪽 패널로 이동
    document.getElementById("ui-area").classList.add("right-side");

    // start 전 중앙 UI 숨기고, game-area 표시
    document.getElementById("game-area").style.display = "flex";

    // canvas 보이기
    document.getElementById("gameCanvas").style.display = "block";

    // 오른쪽 UI 영역에 버튼 다시 넣기 (옮기기)
    document.getElementById("side-ui").appendChild(document.getElementById("ui-area"));

    startGame(stageNum);
});
