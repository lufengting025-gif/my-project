const canvas = document.querySelector('#game');
const context = canvas.getContext('2d');
const scoreElement = document.querySelector('#score');
const highScoreElement = document.querySelector('#high-score');
const message = document.querySelector('#message');
const startButton = document.querySelector('#start-button');

const gridSize = 20;
const tileSize = canvas.width / gridSize;
const directions = { up: [0, -1], down: [0, 1], left: [-1, 0], right: [1, 0] };
let snake;
let food;
let direction;
let nextDirection;
let score;
let timer;
let running = false;
let highScore = Number(localStorage.getItem('snake-high-score')) || 0;

highScoreElement.textContent = highScore;

function randomFood() {
  do {
    food = { x: Math.floor(Math.random() * gridSize), y: Math.floor(Math.random() * gridSize) };
  } while (snake.some((part) => part.x === food.x && part.y === food.y));
}

function draw() {
  context.fillStyle = '#172f22';
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.strokeStyle = '#295039';
  context.lineWidth = 1;
  for (let i = 0; i <= gridSize; i += 1) {
    context.beginPath(); context.moveTo(i * tileSize, 0); context.lineTo(i * tileSize, canvas.height); context.stroke();
    context.beginPath(); context.moveTo(0, i * tileSize); context.lineTo(canvas.width, i * tileSize); context.stroke();
  }
  context.fillStyle = '#ff7765';
  context.beginPath(); context.arc((food.x + .5) * tileSize, (food.y + .5) * tileSize, tileSize * .32, 0, Math.PI * 2); context.fill();
  snake.forEach((part, index) => {
    context.fillStyle = index === 0 ? '#b9f27c' : '#73cf73';
    context.fillRect(part.x * tileSize + 2, part.y * tileSize + 2, tileSize - 4, tileSize - 4);
  });
}

function endGame() {
  running = false;
  clearInterval(timer);
  if (score > highScore) { highScore = score; localStorage.setItem('snake-high-score', highScore); highScoreElement.textContent = highScore; }
  message.querySelector('strong').textContent = '游戏结束';
  message.querySelector('span').textContent = `本局得分：${score}`;
  startButton.textContent = '再玩一次';
  message.hidden = false;
}

function tick() {
  direction = nextDirection;
  const head = { x: (snake[0].x + direction[0] + gridSize) % gridSize, y: (snake[0].y + direction[1] + gridSize) % gridSize };
  if (snake.some((part) => part.x === head.x && part.y === head.y)) return endGame();
  snake.unshift(head);
  if (head.x === food.x && head.y === food.y) { score += 1; scoreElement.textContent = score; randomFood(); } else snake.pop();
  draw();
}

function startGame() {
  snake = [{ x: 10, y: 10 }, { x: 9, y: 10 }, { x: 8, y: 10 }];
  direction = directions.right; nextDirection = directions.right; score = 0; scoreElement.textContent = score; randomFood(); draw();
  message.hidden = true; running = true; clearInterval(timer); timer = setInterval(tick, 115);
}

function changeDirection(name) {
  const proposed = directions[name];
  if (!proposed || (proposed[0] === -direction[0] && proposed[1] === -direction[1])) return;
  if (!running) startGame();
  nextDirection = proposed;
}

document.addEventListener('keydown', (event) => {
  const keys = { ArrowUp: 'up', w: 'up', W: 'up', ArrowDown: 'down', s: 'down', S: 'down', ArrowLeft: 'left', a: 'left', A: 'left', ArrowRight: 'right', d: 'right', D: 'right' };
  if (keys[event.key]) { event.preventDefault(); changeDirection(keys[event.key]); }
});
document.querySelectorAll('[data-direction]').forEach((button) => button.addEventListener('click', () => changeDirection(button.dataset.direction)));
startButton.addEventListener('click', startGame);
startGame();
clearInterval(timer); running = false; message.hidden = false;
