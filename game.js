const canvas = document.getElementById('game');
const ctx = canvas.getContext('2d');
const scoreEl = document.getElementById('score');
const bestEl = document.getElementById('best');
const statusEl = document.getElementById('status');

const gridSize = 20;
const tileCount = canvas.width / gridSize;
const speedMs = 110;

let snake;
let direction;
let nextDirection;
let food;
let score;
let bestScore = Number(localStorage.getItem('snakeBest') || 0);
let gameOver;
let loopId;

bestEl.textContent = bestScore;

function resetGame() {
  snake = [
    { x: 9, y: 10 },
    { x: 8, y: 10 },
    { x: 7, y: 10 }
  ];
  direction = { x: 1, y: 0 };
  nextDirection = direction;
  score = 0;
  gameOver = false;
  scoreEl.textContent = score;
  statusEl.textContent = 'Collect the food!';
  statusEl.classList.remove('game-over');
  placeFood();
  draw();
}

function placeFood() {
  while (true) {
    const candidate = {
      x: Math.floor(Math.random() * tileCount),
      y: Math.floor(Math.random() * tileCount)
    };
    const occupied = snake.some((part) => part.x === candidate.x && part.y === candidate.y);
    if (!occupied) {
      food = candidate;
      return;
    }
  }
}

function gameStep() {
  if (gameOver) return;

  direction = nextDirection;
  const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };

  const hitWall = head.x < 0 || head.x >= tileCount || head.y < 0 || head.y >= tileCount;
  const hitSelf = snake.some((part) => part.x === head.x && part.y === head.y);

  if (hitWall || hitSelf) {
    gameOver = true;
    statusEl.textContent = 'Game over — press Space to restart';
    statusEl.classList.add('game-over');
    draw();
    return;
  }

  snake.unshift(head);

  if (head.x === food.x && head.y === food.y) {
    score += 10;
    scoreEl.textContent = score;
    if (score > bestScore) {
      bestScore = score;
      localStorage.setItem('snakeBest', String(bestScore));
      bestEl.textContent = bestScore;
    }
    placeFood();
  } else {
    snake.pop();
  }

  draw();
}

function drawCell(x, y, color, radius = 0) {
  const px = x * gridSize;
  const py = y * gridSize;
  ctx.fillStyle = color;

  if (!radius) {
    ctx.fillRect(px + 1, py + 1, gridSize - 2, gridSize - 2);
    return;
  }

  const w = gridSize - 2;
  const h = gridSize - 2;
  const r = Math.min(radius, w / 2, h / 2);
  const rx = px + 1;
  const ry = py + 1;

  ctx.beginPath();
  ctx.moveTo(rx + r, ry);
  ctx.arcTo(rx + w, ry, rx + w, ry + h, r);
  ctx.arcTo(rx + w, ry + h, rx, ry + h, r);
  ctx.arcTo(rx, ry + h, rx, ry, r);
  ctx.arcTo(rx, ry, rx + w, ry, r);
  ctx.closePath();
  ctx.fill();
}

function draw() {
  ctx.fillStyle = '#020617';
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  for (let y = 0; y < tileCount; y++) {
    for (let x = 0; x < tileCount; x++) {
      if ((x + y) % 2 === 0) {
        drawCell(x, y, '#0b1224');
      }
    }
  }

  snake.forEach((part, index) => {
    const color = index === 0 ? '#22c55e' : '#16a34a';
    drawCell(part.x, part.y, color, 4);
  });

  drawCell(food.x, food.y, '#f43f5e', 7);
}

function setDirection(newDir) {
  if (gameOver) return;
  const opposite = direction.x === -newDir.x && direction.y === -newDir.y;
  if (!opposite) {
    nextDirection = newDir;
  }
}

window.addEventListener('keydown', (event) => {
  switch (event.key) {
    case 'ArrowUp':
    case 'w':
    case 'W':
      setDirection({ x: 0, y: -1 });
      break;
    case 'ArrowDown':
    case 's':
    case 'S':
      setDirection({ x: 0, y: 1 });
      break;
    case 'ArrowLeft':
    case 'a':
    case 'A':
      setDirection({ x: -1, y: 0 });
      break;
    case 'ArrowRight':
    case 'd':
    case 'D':
      setDirection({ x: 1, y: 0 });
      break;
    case ' ':
      if (gameOver) resetGame();
      break;
    default:
      return;
  }
  event.preventDefault();
});

resetGame();
loopId = setInterval(gameStep, speedMs);
