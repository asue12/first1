// Get the canvas element
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Define game variables
const gridSize = 20;  // size of the grid (20x20)
const canvasSize = 400; // canvas size (400x400)
let snake = [{x: 160, y: 160}];  // Initial snake body
let food = {x: 100, y: 100};  // Initial food position
let direction = 'RIGHT'; // Current direction of the snake
let score = 0; // Player's score

// Set the speed of the game
let gameSpeed = 100;

// Draw the snake and food
function draw() {
    ctx.clearRect(0, 0, canvasSize, canvasSize);

    // Draw the snake
    snake.forEach((segment, index) => {
        ctx.fillStyle = index === 0 ? 'green' : 'lime'; // Head is green, tail is lime
        ctx.fillRect(segment.x, segment.y, gridSize, gridSize);
    });

    // Draw the food
    ctx.fillStyle = 'red';
    ctx.fillRect(food.x, food.y, gridSize, gridSize);

    // Draw the score
    ctx.fillStyle = 'black';
    ctx.font = '20px Arial';
    ctx.fillText('Score: ' + score, 10, 20);
}

// Update the snake's position
function update() {
    const head = { ...snake[0] };

    // Move the snake's head in the current direction
    if (direction === 'UP') head.y -= gridSize;
    if (direction === 'DOWN') head.y += gridSize;
    if (direction === 'LEFT') head.x -= gridSize;
    if (direction === 'RIGHT') head.x += gridSize;

    // Snake eats the food
    if (head.x === food.x && head.y === food.y) {
        score += 10;
        food = generateFood(); // Generate new food position
    } else {
        snake.pop(); // Remove the tail if the snake doesn't eat food
    }

    // Add the new head to the snake
    snake.unshift(head);

    // Game Over conditions
    if (head.x < 0 || head.x >= canvasSize || head.y < 0 || head.y >= canvasSize || checkCollision(head)) {
        alert('Game Over! Your Score: ' + score);
        resetGame();
    }
}

// Generate random food position
function generateFood() {
    let foodX = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    let foodY = Math.floor(Math.random() * (canvasSize / gridSize)) * gridSize;
    return { x: foodX, y: foodY };
}

// Check if the snake collides with itself
function checkCollision(head) {
    return snake.some((segment, index) => index !== 0 && segment.x === head.x && segment.y === head.y);
}

// Change the snake's direction based on keyboard input
function changeDirection(event) {
    if (event.key === 'ArrowUp' && direction !== 'DOWN') direction = 'UP';
    if (event.key === 'ArrowDown' && direction !== 'UP') direction = 'DOWN';
    if (event.key === 'ArrowLeft' && direction !== 'RIGHT') direction = 'LEFT';
    if (event.key === 'ArrowRight' && direction !== 'LEFT') direction = 'RIGHT';
}

// Reset the game
function resetGame() {
    snake = [{x: 160, y: 160}];
    food = generateFood();
    direction = 'RIGHT';
    score = 0;
    gameSpeed = 100;
}

// Game loop
function gameLoop() {
    update();
    draw();
    setTimeout(gameLoop, gameSpeed);
}

// Start the game
document.addEventListener('keydown', changeDirection);
gameLoop();
