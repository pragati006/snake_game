const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const scoreDisplay = document.getElementById("score");

const gridSize = 20;
const tileCount = canvas.width / gridSize;

let snake = [
    { x: 10, y: 10 }
];

let velocityX = 0;
let velocityY = 0;

let food = {
    x: 5,
    y: 5
};

let score = 0;

function gameLoop() {
    update();
    draw();
}

function update() {
    const head = {
        x: snake[0].x + velocityX,
        y: snake[0].y + velocityY
    };

    // Move only after first key press
    if (velocityX !== 0 || velocityY !== 0) {
        snake.unshift(head);

        // Food collision
        if (head.x === food.x && head.y === food.y) {
            score++;
            scoreDisplay.textContent = `Score: ${score}`;
            generateFood();
        } else {
            snake.pop();
        }

        // Wall collision
        if (
            head.x < 0 ||
            head.x >= tileCount ||
            head.y < 0 ||
            head.y >= tileCount
        ) {
            resetGame();
        }

        // Self collision
        for (let i = 1; i < snake.length; i++) {
            if (
                head.x === snake[i].x &&
                head.y === snake[i].y
            ) {
                resetGame();
            }
        }
    }
}

function draw() {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw snake
    ctx.fillStyle = "lime";
    snake.forEach(segment => {
        ctx.fillRect(
            segment.x * gridSize,
            segment.y * gridSize,
            gridSize - 2,
            gridSize - 2
        );
    });

    // Draw food
    ctx.fillStyle = "red";
    ctx.fillRect(
        food.x * gridSize,
        food.y * gridSize,
        gridSize - 2,
        gridSize - 2
    );
}

function generateFood() {
    food = {
        x: Math.floor(Math.random() * tileCount),
        y: Math.floor(Math.random() * tileCount)
    };
}

function resetGame() {
    alert(`Game Over! Score: ${score}`);

    snake = [{ x: 10, y: 10 }];
    velocityX = 0;
    velocityY = 0;

    score = 0;
    scoreDisplay.textContent = "Score: 0";

    generateFood();
}

document.addEventListener("keydown", (e) => {
    switch (e.key) {
        case "ArrowUp":
            if (velocityY !== 1) {
                velocityX = 0;
                velocityY = -1;
            }
            break;

        case "ArrowDown":
            if (velocityY !== -1) {
                velocityX = 0;
                velocityY = 1;
            }
            break;

        case "ArrowLeft":
            if (velocityX !== 1) {
                velocityX = -1;
                velocityY = 0;
            }
            break;

        case "ArrowRight":
            if (velocityX !== -1) {
                velocityX = 1;
                velocityY = 0;
            }
            break;
    }
});

setInterval(gameLoop, 120);