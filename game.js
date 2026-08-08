

const worldLayer = document.getElementById("worldLayer");
const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");
const shooterCanvas = document.getElementById("shooterCanvas");
const sctx = shooterCanvas.getContext("2d");
const explosionLayer = document.getElementById("explosionLayer");
const characterSprite = document.getElementById("characterSprite");
const startGateGif = document.getElementById("startGateGif");
const startGateStaticCanvas = document.getElementById("startGateStaticCanvas");
const startGateStaticCtx = startGateStaticCanvas ? startGateStaticCanvas.getContext("2d") : null;
const animatedBackground = document.getElementById("animatedBackground");
const startScreen = document.getElementById("startScreen");
const orientationLock = document.getElementById("orientationLock");

const scoreText = document.getElementById("scoreText");
const ballsLeftText = document.getElementById("ballsLeftText");
const progressFill = document.getElementById("progressFill");
const progressCard = document.getElementById("progressCard");
const modeIcon = document.getElementById("modeIcon");
const pauseBtn = document.getElementById("pauseBtn");
const hud = document.getElementById("hud");

const mainMenu = document.getElementById("mainMenu");
const levelSelect = document.getElementById("levelSelect");
const levelModeBtn = document.getElementById("levelModeBtn");
const infiniteModeBtn = document.getElementById("infiniteModeBtn");
const backToMenuBtn = document.getElementById("backToMenuBtn");
const creditsOpenBtn = document.getElementById("creditsOpenBtn");
const creditsPanel = document.getElementById("creditsPanel");
const creditsBox = document.getElementById("creditsBox");
const creditsReturnBtn = document.getElementById("creditsReturnBtn");
const levelButtons = document.querySelectorAll(".levelBtn");

const messagePanel = document.getElementById("messagePanel");
const messageTitle = document.getElementById("messageTitle");
const messageText = document.getElementById("messageText");
const resumeBtn = document.getElementById("resumeBtn");
const retryBtn = document.getElementById("retryBtn");
const nextLevelBtn = document.getElementById("nextLevelBtn");
const menuBtn = document.getElementById("menuBtn");

const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;
const BALL_RADIUS = 18;
const BALL_SPACING = BALL_RADIUS * 2.08;
const PROJECTILE_SPEED = 800;
const SHOOTER_SIZE = 68;
const START_PORTAL_SIZE = 190;
const START_GATE_DRAW_OFFSET_Y = -48;
const START_PORTAL_DISTANCE = 0;
const START_LEAD_DISTANCE = 0;
const EXPLOSION_SIZE = 88;
const EXPLOSION_DURATION = 720;
const EXPLOSION_SRC = "assets/sprites/explosion.gif";
const CHARACTER_SIZE = 150;
const CHARACTER_OFFSET_Y = -40;

const MARBLE_GLOWS = [
  { name: "white",   shadow: "rgba(255, 255, 255, 1)", line: "rgba(245, 255, 255, 1)", fallback: "#f6ffff" },
  { name: "yellow",  shadow: "rgba(255, 232, 65, 1)",  line: "rgba(255, 232, 65, 1)",  fallback: "#ffe84a" },
  { name: "magenta", shadow: "rgba(255, 60, 255, 1)",  line: "rgba(255, 60, 255, 1)",  fallback: "#ff43ff" },
  { name: "red",     shadow: "rgba(255, 65, 65, 1)",    line: "rgba(255, 65, 65, 1)",    fallback: "#ff4545" },
  { name: "green",   shadow: "rgba(65, 255, 92, 1)",    line: "rgba(65, 255, 92, 1)",    fallback: "#41ff5c" },
  { name: "blue",    shadow: "rgba(70, 160, 255, 1)",   line: "rgba(70, 160, 255, 1)",   fallback: "#45a0ff" }
];

const LEVELS = [
  
  { name: "Very Easy", totalBalls: 48, speed: 39, colors: 4, startLead: START_LEAD_DISTANCE },
  { name: "Easy", totalBalls: 64, speed: 50, colors: 5, startLead: START_LEAD_DISTANCE },
  { name: "Normal", totalBalls: 84, speed: 64, colors: 6, startLead: START_LEAD_DISTANCE },
  { name: "Hard", totalBalls: 108, speed: 84, colors: 6, startLead: START_LEAD_DISTANCE }
];

let marbleImages = [];
let shooterImage = null;
let startGateImage = null;
let sounds = { shoot: null, destroy: null, hurt: null, music: null, music2: null, music3: null, music4: null, music5: null };

let path = [];
let pathDistances = [];
let pathLength = 0;
let balls = [];
let projectile = null;
let nextColor = 0;
let score = 0;
let paused = true;
let gameEnded = false;
let lastTime = 0;
let gameMode = "menu";
let currentLevelIndex = 0;
let currentLevel = LEVELS[0];
let infiniteTime = 0;
let infiniteSpawned = 0;
let mouse = { x: GAME_WIDTH / 2 + 100, y: GAME_HEIGHT / 2 };
let screenShake = { time: 0, duration: 0, amount: 0 };
let transitionActive = false;
let orientationPausedGame = false;
let startGateStaticLocked = false;
let startGateStaticSource = null;

const shooter = {
  x: 762,
  y: 427,
  angle: 0
};


function loadImage(src) {
  return new Promise((resolve) => {
    const image = new Image();
    image.onload = () => resolve(image);
    image.onerror = () => resolve(null);
    image.src = src;
  });
}

async function loadAssets() {
  shooterImage = await loadImage("assets/sprites/shooter.png");
  startGateImage = null; 
  startGateStaticSource = await loadImage("assets/sprites/start_gate.gif");

  marbleImages = [];
  for (let i = 1; i <= 6; i++) {
    marbleImages.push(await loadImage(`assets/sprites/marble${i}.png`));
  }

  setupAudio();
}



function setupAudio() {
  sounds.shoot = makeAudio("assets/sounds/shoot.wav", { volume: 0.55 });
  sounds.destroy = makeAudio("assets/sounds/destroy.wav", { volume: 0.7 });
  sounds.hurt = makeAudio("assets/sounds/hurt.wav", { volume: 0.85 });
  sounds.click = makeAudio("assets/sounds/click.wav", { volume: 0.7 });
  sounds.music = makeAudio("assets/sounds/music.wav", { volume: 0.45, loop: true });
  sounds.music2 = makeAudio("assets/sounds/Music2.wav", { volume: 0.45, loop: true });
  sounds.music3 = makeAudio("assets/sounds/music3.wav", { volume: 0.42, loop: true });
  sounds.music4 = makeAudio("assets/sounds/music4.wav", { volume: 0.38, loop: true });
  sounds.music5 = makeAudio("assets/sounds/music5.wav", { volume: 0.45, loop: true });
}

function makeAudio(src, options = {}) {
  const audio = new Audio(src);
  audio.preload = "auto";
  audio.volume = options.volume ?? 1;
  audio.loop = Boolean(options.loop);
  return audio;
}

function playSound(audio, clone = false) {
  if (!audio) return;
  try {
    const sound = clone ? audio.cloneNode(true) : audio;
    sound.volume = audio.volume;
    sound.currentTime = 0;
    sound.play().catch(() => {});
  } catch (error) {}
}

function getActiveMusic() {
  if (gameMode === "infinite") return sounds.music2 || sounds.music;
  return sounds.music;
}

function getMusicTracks() {
  return [sounds.music, sounds.music2, sounds.music3, sounds.music4, sounds.music5].filter(Boolean);
}

function playLoopTrack(track) {
  if (!track) return;
  for (const music of getMusicTracks()) {
    if (music !== track) {
      try {
        music.pause();
        music.currentTime = 0;
      } catch (error) {}
    }
  }
  try {
    track.play().catch(() => {});
  } catch (error) {}
}

function playGameMusic() {
  const music = getActiveMusic();
  if (!music || gameMode === "menu" || paused || gameEnded) return;
  playLoopTrack(music);
}

function playMenuMusic() {
  playLoopTrack(sounds.music3);
}

function playPauseMusic() {
  playLoopTrack(sounds.music4);
}

function playGameOverMusic() {
  playLoopTrack(sounds.music5);
}

function pauseGameMusic() {
  for (const track of [sounds.music, sounds.music2]) {
    if (!track) continue;
    try {
      track.pause();
    } catch (error) {}
  }
}

function stopGameMusic() {
  for (const track of getMusicTracks()) {
    try {
      track.pause();
      track.currentTime = 0;
    } catch (error) {}
  }
}

function updatePauseButtonIcon() {
  if (!pauseBtn) return;
  const shouldShowResume = paused && !gameEnded && gameMode !== "menu";
  pauseBtn.classList.toggle("resume-icon", shouldShowResume);
  pauseBtn.classList.toggle("pause-icon", !shouldShowResume);
  pauseBtn.setAttribute("aria-label", shouldShowResume ? "Resume" : "Pause");
}

function setGameplayBackground() {
  if (!animatedBackground) return;
  animatedBackground.src = gameMode === "menu"
    ? "assets/sprites/background3.png"
    : gameMode === "infinite"
      ? "assets/sprites/background2.png"
      : "assets/sprites/background.png";
}

function updateModeIcon() {
  if (!modeIcon) return;
  modeIcon.classList.remove("infinite-mode-icon");

  if (gameMode === "infinite") {
    modeIcon.src = "assets/sprites/mode5.png";
    modeIcon.classList.add("infinite-mode-icon");
    modeIcon.classList.remove("hidden");
    return;
  }

  if (gameMode === "level") {
    modeIcon.src = `assets/sprites/mode${currentLevelIndex + 1}.png`;
    modeIcon.classList.remove("hidden");
    return;
  }

  modeIcon.classList.add("hidden");
}

function showStartScreen() {
  document.body.classList.add("menu-active");
  if (startScreen) startScreen.classList.remove("hidden");
  mainMenu.classList.add("hidden");
  levelSelect.classList.add("hidden");
  hideCreditsPanel();
  hud.classList.add("hidden");
  hud.style.display = "none";
  canvas.style.cursor = "default";
  if (characterSprite) characterSprite.classList.add("hidden");
  if (startGateGif) startGateGif.classList.add("hidden");
  if (startGateStaticCanvas) startGateStaticCanvas.classList.add("hidden");
  stopGameMusic();
}

function enterMainMenuFromStart() {
  startWithScreenTransition(() => {
    if (startScreen) startScreen.classList.add("hidden");
    showMainMenu();
  });
}

function showCreditsPanel() {
  if (!creditsPanel) return;
  levelSelect.classList.add("hidden");
  creditsPanel.classList.remove("hidden");
}

function hideCreditsPanel() {
  if (!creditsPanel) return;
  creditsPanel.classList.add("hidden");
}


function buildPath() {
  path = [];
  pathDistances = [];

  function addPoint(x, y) {
    const last = path[path.length - 1];
    if (!last || Math.hypot(last.x - x, last.y - y) > 0.35) {
      path.push({ x, y });
    }
  }

  function addLinePoints(from, to, step = 2) {
    const distance = Math.hypot(to.x - from.x, to.y - from.y);
    const count = Math.max(2, Math.ceil(distance / step));
    for (let i = 1; i <= count; i++) {
      const t = i / count;
      addPoint(from.x + (to.x - from.x) * t, from.y + (to.y - from.y) * t);
    }
  }

  function addQuadraticPoints(from, control, to, steps = 28) {
    for (let i = 1; i <= steps; i++) {
      const t = i / steps;
      const mt = 1 - t;
      addPoint(
        mt * mt * from.x + 2 * mt * t * control.x + t * t * to.x,
        mt * mt * from.y + 2 * mt * t * control.y + t * t * to.y
      );
    }
  }

  function getTrimmedPoint(a, b, distance) {
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const length = Math.hypot(dx, dy) || 1;
    const trim = Math.min(distance, length * 0.45);
    return {
      x: a.x + (dx / length) * trim,
      y: a.y + (dy / length) * trim
    };
  }

  function addRoundedPolyline(points, radius = 34) {
    addPoint(points[0].x, points[0].y);

    for (let i = 1; i < points.length - 1; i++) {
      const previous = points[i - 1];
      const corner = points[i];
      const next = points[i + 1];

      const beforeCorner = getTrimmedPoint(corner, previous, radius);
      const afterCorner = getTrimmedPoint(corner, next, radius);

      addLinePoints(path[path.length - 1], beforeCorner);
      addQuadraticPoints(beforeCorner, corner, afterCorner);
    }

    addLinePoints(path[path.length - 1], points[points.length - 1]);
  }

  
  
  
  const route = [
    { x: 104,  y: 149 }, 
    { x: 1180, y: 149 }, 
    { x: 1190, y: 600 }, 
    { x: 101,  y: 600 }, 
    { x: 99,   y: 215 }, 
    { x: 1119, y: 214 }, 
    { x: 1127, y: 541 }, 
    { x: 152,  y: 557 }, 
    { x: 151,  y: 259 }, 
    { x: 1054, y: 259 }, 
    { x: 1063, y: 495 }, 
    { x: 203,  y: 504 }, 
    { x: 197,  y: 304 }, 
    { x: 992,  y: 307 }, 
    { x: 995,  y: 446 }, 
    { x: 792,  y: 451 }  
  ];

  addRoundedPolyline(route, 34);

  pathDistances = [0];
  pathLength = 0;
  for (let i = 1; i < path.length; i++) {
    const dx = path[i].x - path[i - 1].x;
    const dy = path[i].y - path[i - 1].y;
    pathLength += Math.hypot(dx, dy);
    pathDistances.push(pathLength);
  }
}

function pointAtDistance(distance) {
  if (distance <= 0) {
    const first = path[0];
    const second = path[1];
    const angle = Math.atan2(first.y - second.y, first.x - second.x);
    return {
      x: first.x + Math.cos(angle) * -distance,
      y: first.y + Math.sin(angle) * -distance
    };
  }

  if (distance >= pathLength) {
    return path[path.length - 1];
  }

  let low = 0;
  let high = pathDistances.length - 1;

  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (pathDistances[mid] < distance) low = mid + 1;
    else high = mid;
  }

  const index = Math.max(1, low);
  const previousDistance = pathDistances[index - 1];
  const segmentLength = pathDistances[index] - previousDistance;
  const localT = segmentLength === 0 ? 0 : (distance - previousDistance) / segmentLength;
  const a = path[index - 1];
  const b = path[index];

  return {
    x: a.x + (b.x - a.x) * localT,
    y: a.y + (b.y - a.y) * localT
  };
}

function getPathAngleAtDistance(distance) {
  const a = pointAtDistance(Math.max(0, distance));
  const b = pointAtDistance(Math.min(pathLength, distance + 18));
  return Math.atan2(b.y - a.y, b.x - a.x);
}

function randomColor(maxColors) {
  return Math.floor(Math.random() * maxColors);
}

function makeBall(color, distance) {
  return {
    color,
    distance,
    visualDistance: distance,
    rollOffset: Math.random() * Math.PI * 2,
    merge: null,
    checkAfterMerge: false
  };
}

function startLevel(index) {
  currentLevelIndex = index;
  currentLevel = LEVELS[currentLevelIndex];
  gameMode = "level";
  setGameplayBackground();
  updateModeIcon();
  setupNewRun();

  for (let i = 0; i < currentLevel.totalBalls; i++) {
    balls.push(makeBall(randomColor(currentLevel.colors), currentLevel.startLead - i * BALL_SPACING));
  }

  nextColor = randomColor(currentLevel.colors);
  showGameOnly();
}

function startInfinite() {
  gameMode = "infinite";
  setGameplayBackground();
  currentLevel = { name: "Infinite", totalBalls: 0, speed: 36, colors: 4, startLead: START_LEAD_DISTANCE };
  updateModeIcon();
  infiniteTime = 0;
  infiniteSpawned = 0;
  setupNewRun();

  for (let i = 0; i < 34; i++) {
    spawnTailBall();
  }

  nextColor = randomColor(currentLevel.colors);
  showGameOnly();
}

function setupNewRun() {
  balls = [];
  projectile = null;
  score = 0;
  paused = false;
  gameEnded = false;
  screenShake = { time: 0, duration: 0, amount: 0 };
  startGateStaticLocked = false;
  if (startGateGif) startGateGif.src = `assets/sprites/start_gate.gif?play=${Date.now()}`;
  if (startGateStaticCanvas) startGateStaticCanvas.classList.add("hidden");
  worldLayer.style.transform = "translate(0px, 0px)";
  explosionLayer.innerHTML = "";
  stopGameMusic();
  lastTime = performance.now();
  updatePauseButtonIcon();
  messagePanel.classList.add("hidden");
  updateHud();
}

function showGameOnly() {
  document.body.classList.remove("menu-active");
  mainMenu.classList.add("hidden");
  levelSelect.classList.add("hidden");
  hideCreditsPanel();
  hud.style.display = "block";
  hud.classList.remove("hidden");
  updateModeIcon();
  canvas.style.cursor = "crosshair";
  if (characterSprite) characterSprite.classList.remove("hidden");
  if (startGateGif) startGateGif.classList.remove("hidden");
  updateStartGateGifPosition();
  updateHud();
  updatePauseButtonIcon();
  playGameMusic();
}

function showMainMenu() {
  document.body.classList.add("menu-active");
  hideCreditsPanel();
  gameMode = "menu";
  setGameplayBackground();
  updateModeIcon();
  paused = true;
  gameEnded = true;
  balls = [];
  projectile = null;
  screenShake = { time: 0, duration: 0, amount: 0 };
  startGateStaticLocked = false;
  if (startGateGif) startGateGif.src = `assets/sprites/start_gate.gif?play=${Date.now()}`;
  if (startGateStaticCanvas) startGateStaticCanvas.classList.add("hidden");
  worldLayer.style.transform = "translate(0px, 0px)";
  explosionLayer.innerHTML = "";
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  sctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  messagePanel.classList.add("hidden");
  hud.classList.add("hidden");
  hud.style.display = "none";
  levelSelect.classList.add("hidden");
  mainMenu.classList.remove("hidden");
  canvas.style.cursor = "default";
  if (characterSprite) characterSprite.classList.add("hidden");
  if (startGateGif) startGateGif.classList.add("hidden");
  if (startGateStaticCanvas) startGateStaticCanvas.classList.add("hidden");
  stopGameMusic();
  playMenuMusic();
  updatePauseButtonIcon();
}

function retryCurrentRun() {
  if (gameMode === "infinite") startInfinite();
  else startLevel(currentLevelIndex);
}

function startNextLevel() {
  const nextIndex = Math.min(currentLevelIndex + 1, LEVELS.length - 1);
  startLevel(nextIndex);
}



function updateHud() {
  scoreText.textContent = score.toString();

  if (gameMode === "infinite") {
    progressCard.classList.add("hidden");
    return;
  }

  progressCard.classList.remove("hidden");
  const total = currentLevel.totalBalls || 1;
  const left = Math.max(0, Math.min(total, balls.length));
  ballsLeftText.textContent = `${left} / ${total}`;
  const percent = Math.max(0, Math.min(100, (left / total) * 100));
  progressFill.style.width = "100%";
  progressFill.style.clipPath = `inset(0 ${100 - percent}% 0 0)`;
}

function getPointerPosition(event) {
  const rect = canvas.getBoundingClientRect();
  return {
    x: ((event.clientX - rect.left) / rect.width) * GAME_WIDTH,
    y: ((event.clientY - rect.top) / rect.height) * GAME_HEIGHT
  };
}

function setPaused(value) {
  if (gameEnded || gameMode === "menu") return;
  paused = value;
  updatePauseButtonIcon();

  if (paused) {
    pauseGameMusic();
    playPauseMusic();
    showMessage("Paused", "Click Resume to continue.", { resume: true, retry: true, next: false, menu: true });
  } else {
    if (sounds.music4) {
      try {
        sounds.music4.pause();
        sounds.music4.currentTime = 0;
      } catch (error) {}
    }
    messagePanel.classList.add("hidden");
    lastTime = performance.now();
    playGameMusic();
  }
}

function showMessage(title, text, buttons) {
  messagePanel.classList.remove("game-over-panel");
  messageTitle.textContent = title;
  messageText.textContent = text;
  resumeBtn.style.display = buttons.resume ? "inline-block" : "none";
  retryBtn.style.display = buttons.retry ? "inline-block" : "none";
  nextLevelBtn.style.display = buttons.next ? "inline-block" : "none";
  menuBtn.style.display = buttons.menu ? "inline-block" : "none";
  messagePanel.classList.remove("hidden");
}

function shoot() {
  if (document.body.classList.contains("portrait-locked")) return;
  if (paused || gameEnded || gameMode === "menu" || projectile) return;

  const dx = mouse.x - shooter.x;
  const dy = mouse.y - shooter.y;
  const length = Math.hypot(dx, dy) || 1;
  const color = nextColor;

  playSound(sounds.shoot);

  projectile = {
    x: shooter.x + (dx / length) * 45,
    y: shooter.y + (dy / length) * 45,
    vx: (dx / length) * PROJECTILE_SPEED,
    vy: (dy / length) * PROJECTILE_SPEED,
    color,
    roll: 0
  };

  nextColor = randomColor(currentLevel.colors);
}

function getCurrentSpeed() {
  if (gameMode !== "infinite") return currentLevel.speed;

  
  const timeBoost = infiniteTime * 0.18;
  const scoreBoost = Math.floor(score / 3000) * 1.4;
  return Math.min(92, currentLevel.speed + timeBoost + scoreBoost);
}

function update(delta) {
  const dx = mouse.x - shooter.x;
  const dy = mouse.y - shooter.y;
  shooter.angle = Math.atan2(dy, dx);

  updateScreenShake(delta);

  if (gameMode === "infinite") {
    infiniteTime += delta;
    const colorCount = Math.min(6, 4 + Math.floor(infiniteTime / 75));
    currentLevel.colors = colorCount;
  }

  if (balls.length > 0) {
    balls[0].distance += getCurrentSpeed() * delta;
    normalizeBallDistances(1);

    if (balls[0].distance >= pathLength - BALL_RADIUS) {
      gameOver();
      return;
    }
  } else if (gameMode === "infinite") {
    spawnTailBall();
    balls[0].distance = currentLevel.startLead;
    balls[0].visualDistance = currentLevel.startLead;
  }

  if (gameMode === "infinite") {
    addInfiniteTailBalls();
  }

  if (projectile) {
    projectile.x += projectile.vx * delta;
    projectile.y += projectile.vy * delta;
    projectile.roll += delta * 8.5;

    if (
      projectile.x < -80 ||
      projectile.x > GAME_WIDTH + 80 ||
      projectile.y < -80 ||
      projectile.y > GAME_HEIGHT + 80
    ) {
      projectile = null;
    } else {
      checkProjectileHit();
    }
  }

  updateBallVisuals(delta);

  if (gameMode === "level" && balls.length === 0) {
    winLevel();
  }

  updateHud();
}

function normalizeBallDistances(startIndex) {
  for (let i = Math.max(1, startIndex); i < balls.length; i++) {
    balls[i].distance = balls[i - 1].distance - BALL_SPACING;
  }
}

function updateBallVisuals(delta) {
  let matchIndex = -1;
  const follow = 1 - Math.pow(0.0006, delta);

  for (let i = 0; i < balls.length; i++) {
    const ball = balls[i];

    if (typeof ball.visualDistance !== "number") {
      ball.visualDistance = ball.distance;
    }

    if (Math.abs(ball.distance - ball.visualDistance) > BALL_SPACING * 12) {
      ball.visualDistance = ball.distance;
    } else {
      ball.visualDistance += (ball.distance - ball.visualDistance) * follow;
      if (Math.abs(ball.distance - ball.visualDistance) < 0.12) ball.visualDistance = ball.distance;
    }

    if (ball.merge) {
      ball.merge.elapsed += delta;
      if (ball.merge.elapsed >= ball.merge.duration) {
        ball.merge = null;
        if (ball.checkAfterMerge) {
          ball.checkAfterMerge = false;
          matchIndex = i;
        }
      }
    }
  }

  if (matchIndex !== -1 && !paused && !gameEnded) {
    checkMatches(matchIndex);
  }
}

function spawnTailBall() {
  let distance = currentLevel.startLead;
  if (balls.length > 0) {
    distance = balls[balls.length - 1].distance - BALL_SPACING;
  }

  balls.push(makeBall(randomColor(currentLevel.colors), distance));
  infiniteSpawned++;
}

function addInfiniteTailBalls() {
  if (balls.length === 0) return;

  let guard = 0;
  while (balls[balls.length - 1].distance > -BALL_SPACING * 2.2 && guard < 8) {
    spawnTailBall();
    guard++;
  }
}

function checkProjectileHit() {
  if (!projectile) return;

  for (let i = 0; i < balls.length; i++) {
    const p = getBallPoint(balls[i]);
    const distance = Math.hypot(projectile.x - p.x, projectile.y - p.y);

    if (distance <= BALL_RADIUS * 1.65) {
      const insertIndex = Math.min(i + 1, balls.length);
      const insertDistance = balls[i].distance - BALL_SPACING;
      const newBall = makeBall(projectile.color, insertDistance);

      newBall.merge = {
        x: projectile.x,
        y: projectile.y,
        elapsed: 0,
        duration: 0.16
      };
      newBall.checkAfterMerge = true;

      balls.splice(insertIndex, 0, newBall);
      normalizeBallDistances(insertIndex + 1);
      projectile = null;
      break;
    }
  }
}

function checkMatches(index) {
  if (index < 0 || index >= balls.length) return;

  const color = balls[index].color;
  let start = index;
  let end = index;

  while (start > 0 && balls[start - 1].color === color) start--;
  while (end < balls.length - 1 && balls[end + 1].color === color) end++;

  const count = end - start + 1;
  if (count >= 3) {
    const destroyedPositions = [];
    for (let i = start; i <= end; i++) {
      destroyedPositions.push(getBallPoint(balls[i]));
    }

    balls.splice(start, count);
    playSound(sounds.destroy);
    createExplosionGroup(destroyedPositions);
    startScreenShake(12, 0.24);
    score += count * 100 + Math.max(0, count - 3) * 70;

    
    
    
    pullFrontSegmentBack(start, count);

    const chainIndex = Math.min(start, balls.length - 1);
    if (chainIndex > 0 && balls[chainIndex] && balls[chainIndex - 1].color === balls[chainIndex].color) {
      window.setTimeout(() => {
        if (!paused && !gameEnded) checkMatches(chainIndex);
      }, 90);
    }
  }
}

function pullFrontSegmentBack(gapIndex, removedCount) {
  if (gapIndex <= 0 || balls.length === 0) return;

  const pullBackDistance = removedCount * BALL_SPACING;
  for (let i = 0; i < gapIndex; i++) {
    balls[i].distance -= pullBackDistance;
  }
}

function createExplosionGroup(positions) {
  for (let i = 0; i < positions.length; i++) {
    if (i % 2 === 0 || positions.length <= 4) {
      createExplosion(positions[i].x, positions[i].y);
    }
  }
}

function createExplosion(x, y) {
  const rect = canvas.getBoundingClientRect();
  const size = (EXPLOSION_SIZE / GAME_WIDTH) * rect.width;
  const screenX = (x / GAME_WIDTH) * rect.width;
  const screenY = (y / GAME_HEIGHT) * rect.height;

  const img = document.createElement("img");
  img.className = "explosion-gif";
  img.src = `${EXPLOSION_SRC}?play=${Date.now()}_${Math.random()}`;
  img.style.left = `${screenX}px`;
  img.style.top = `${screenY}px`;
  img.style.width = `${size}px`;
  img.style.height = `${size}px`;

  explosionLayer.appendChild(img);
  window.setTimeout(() => img.remove(), EXPLOSION_DURATION);
}

function showGameOverOverlay() {
  const oldOverlay = document.getElementById("gameOverOverlay");
  if (oldOverlay) oldOverlay.remove();

  const overlay = document.createElement("img");
  overlay.id = "gameOverOverlay";
  overlay.src = `assets/sprites/gameover.png?play=${Date.now()}`;
  overlay.alt = "Game Over";
  document.getElementById("gameShell").appendChild(overlay);

  window.setTimeout(() => overlay.remove(), 1000);
}

function startScreenShake(amount, duration) {
  screenShake.amount = Math.max(screenShake.amount, amount);
  screenShake.duration = duration;
  screenShake.time = duration;
}

function updateScreenShake(delta) {
  if (screenShake.time > 0) {
    screenShake.time = Math.max(0, screenShake.time - delta);
    const power = screenShake.time / screenShake.duration;
    const x = (Math.random() * 2 - 1) * screenShake.amount * power;
    const y = (Math.random() * 2 - 1) * screenShake.amount * power;
    worldLayer.style.transform = `translate(${x}px, ${y}px)`;
  } else {
    worldLayer.style.transform = "translate(0px, 0px)";
  }
}


function gameOver() {
  stopGameMusic();
  gameEnded = true;
  paused = true;
  startScreenShake(30, 0.72);
  playSound(sounds.hurt, true);
  window.setTimeout(() => {
    if (gameEnded) playGameOverMusic();
  }, 300);
  showGameOverOverlay();
  updatePauseButtonIcon();

  showMessage("Game Over", `The Soul Eggs have reached you
Score: ${score}`, {
    resume: false,
    retry: true,
    next: false,
    menu: true
  });
  messagePanel.classList.add("game-over-panel");
}

function winLevel() {
  stopGameMusic();
  gameEnded = true;
  paused = true;
  updatePauseButtonIcon();

  const hasNext = currentLevelIndex < LEVELS.length - 1;
  const text = hasNext
    ? `Cleared ${currentLevel.name}! Score: ${score}`
    : `You cleared Hard mode! Final Score: ${score}`;

  showMessage("Level Clear", text, {
    resume: false,
    retry: true,
    next: hasNext,
    menu: true
  });
}

function draw() {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  sctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  ctx.imageSmoothingEnabled = false;
  sctx.imageSmoothingEnabled = false;

  
  
  if (gameMode === "menu") return;

  drawTrack();
  drawBalls();
  drawStartGate();
  drawProjectile();

  updateCharacterSpritePosition();
  drawShooter();
  drawAimReticle();
}

function drawBackgroundOverlay() {
  const gradient = ctx.createRadialGradient(GAME_WIDTH / 2, GAME_HEIGHT / 2, 60, GAME_WIDTH / 2, GAME_HEIGHT / 2, GAME_WIDTH / 1.2);
  gradient.addColorStop(0, "rgba(0, 118, 156, 0.08)");
  gradient.addColorStop(1, "rgba(0, 0, 0, 0.34)");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);

  ctx.fillStyle = "rgba(0, 4, 16, 0.16)";
  ctx.fillRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
}

function drawGridOverlay() {
  ctx.save();
  ctx.globalAlpha = 0.22;
  ctx.strokeStyle = "rgba(88, 228, 255, 0.45)";
  ctx.lineWidth = 1;

  for (let x = 0; x <= GAME_WIDTH; x += 64) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, GAME_HEIGHT);
    ctx.stroke();
  }

  for (let y = 0; y <= GAME_HEIGHT; y += 64) {
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(GAME_WIDTH, y);
    ctx.stroke();
  }

  ctx.restore();
}



function drawTrack() {
  ctx.save();
  ctx.lineJoin = "round";
  ctx.lineCap = "round";

  ctx.beginPath();
  for (let i = 0; i < path.length; i++) {
    if (i === 0) ctx.moveTo(path[i].x, path[i].y);
    else ctx.lineTo(path[i].x, path[i].y);
  }

  
  ctx.strokeStyle = "rgba(0, 0, 0, 0.88)";
  ctx.lineWidth = 10;
  ctx.shadowColor = "rgba(0, 0, 0, 0.95)";
  ctx.shadowBlur = 8;
  ctx.stroke();

  ctx.shadowBlur = 0;
  ctx.strokeStyle = gameMode === "infinite" ? "#39ff14" : "#001C2F";
  ctx.lineWidth = gameMode === "infinite" ? 6 : 5;
  ctx.stroke();

  ctx.restore();
}

function drawStartGate() {
  
  updateStartGateGifPosition();
}

function updateStartGateGifPosition() {
  if ((!startGateGif && !startGateStaticCanvas) || !path.length || gameMode === "menu") return;

  const p = pointAtDistance(START_PORTAL_DISTANCE);
  const angle = getPathAngleAtDistance(START_PORTAL_DISTANCE);
  const x = (p.x / GAME_WIDTH) * 100;
  const y = ((p.y + START_GATE_DRAW_OFFSET_Y) / GAME_HEIGHT) * 100;
  const w = (START_PORTAL_SIZE / GAME_WIDTH) * 100;
  const h = (START_PORTAL_SIZE / GAME_HEIGHT) * 100;
  const transform = `translate(-50%, -50%) rotate(${angle}rad)`;

  const useStaticGate = shouldFreezeStartGate();

  if (startGateGif) {
    startGateGif.style.left = `${x}%`;
    startGateGif.style.top = `${y}%`;
    startGateGif.style.width = `${w}%`;
    startGateGif.style.height = `${h}%`;
    startGateGif.style.transform = transform;
    startGateGif.classList.toggle("hidden", useStaticGate);
  }

  if (startGateStaticCanvas) {
    startGateStaticCanvas.style.left = `${x}%`;
    startGateStaticCanvas.style.top = `${y}%`;
    startGateStaticCanvas.style.width = `${w}%`;
    startGateStaticCanvas.style.height = `${h}%`;
    startGateStaticCanvas.style.transform = transform;
    startGateStaticCanvas.classList.toggle("hidden", !useStaticGate);

    if (useStaticGate && !startGateStaticLocked) {
      drawStaticStartGateFrame();
      startGateStaticLocked = true;
    }
  }
}

function shouldFreezeStartGate() {
  if (gameMode !== "level" || balls.length === 0) return false;
  const tail = balls[balls.length - 1];
  if (!tail) return false;
  return tail.distance >= START_PORTAL_DISTANCE - BALL_RADIUS * 0.45;
}

function drawStaticStartGateFrame() {
  if (!startGateStaticCanvas || !startGateStaticCtx) return;
  const source = startGateStaticSource || startGateGif;
  startGateStaticCtx.clearRect(0, 0, startGateStaticCanvas.width, startGateStaticCanvas.height);

  if (source && source.complete !== false) {
    startGateStaticCtx.imageSmoothingEnabled = false;
    startGateStaticCtx.drawImage(source, 0, 0, startGateStaticCanvas.width, startGateStaticCanvas.height);
  }
}


function drawPortalImage(image, x, y, size, angle, drawFallbackRing) {
  ctx.save();
  ctx.translate(x, y);
  ctx.rotate(angle);

  if (image) {
    ctx.shadowColor = "rgba(0, 0, 0, 0.78)";
    ctx.shadowBlur = 10;
    ctx.drawImage(image, -size / 2, -size / 2, size, size);
  } else {
    ctx.strokeStyle = drawFallbackRing ? "rgba(90, 240, 255, 0.95)" : "rgba(0, 140, 255, 0.9)";
    ctx.fillStyle = "rgba(0, 14, 32, 0.9)";
    ctx.shadowColor = "rgba(68, 232, 255, 0.95)";
    ctx.shadowBlur = 22;
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.32, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
  }

  ctx.restore();
}

function getBallPoint(ball) {
  const visualDistance = typeof ball.visualDistance === "number" ? ball.visualDistance : ball.distance;
  return pointAtDistance(visualDistance);
}

function getBallDrawPosition(ball) {
  const target = getBallPoint(ball);

  if (!ball.merge) return target;

  const t = Math.min(1, ball.merge.elapsed / ball.merge.duration);
  const eased = 1 - Math.pow(1 - t, 3);

  return {
    x: ball.merge.x + (target.x - ball.merge.x) * eased,
    y: ball.merge.y + (target.y - ball.merge.y) * eased
  };
}

function drawBalls() {
  for (let i = balls.length - 1; i >= 0; i--) {
    const ball = balls[i];
    const drawDistance = typeof ball.visualDistance === "number" ? ball.visualDistance : ball.distance;

    
    
    if (drawDistance < START_PORTAL_DISTANCE - BALL_RADIUS * 0.45) continue;
    if (drawDistance > pathLength + 50) continue;

    const p = getBallDrawPosition(ball);
    const rollAngle = (drawDistance / BALL_RADIUS) + ball.rollOffset;
    drawMarble(p.x, p.y, ball.color, BALL_RADIUS * 2.15, ctx, rollAngle);
  }
}

function drawProjectile() {
  if (!projectile) return;
  drawMarble(projectile.x, projectile.y, projectile.color, BALL_RADIUS * 2.05, ctx, projectile.roll);
}

function updateCharacterSpritePosition() {
  if (!characterSprite) return;

  if (gameMode === "menu") {
    characterSprite.classList.add("hidden");
    return;
  }

  characterSprite.classList.remove("hidden");
  const rect = canvas.getBoundingClientRect();
  const x = (shooter.x / GAME_WIDTH) * rect.width;
  const y = ((shooter.y + CHARACTER_OFFSET_Y) / GAME_HEIGHT) * rect.height;
  const width = (CHARACTER_SIZE / GAME_WIDTH) * rect.width;
  const height = (CHARACTER_SIZE / GAME_HEIGHT) * rect.height;

  const facingLeft = mouse.x < shooter.x;
  characterSprite.style.left = `${x}px`;
  characterSprite.style.top = `${y}px`;
  characterSprite.style.width = `${width}px`;
  characterSprite.style.height = `${height}px`;
  characterSprite.style.transform = `translate(-50%, -50%) scaleX(${facingLeft ? -1 : 1})`;
}

function drawShooter() {
  const aimingLeft = Math.cos(shooter.angle) < 0;

  sctx.save();
  sctx.translate(shooter.x, shooter.y);
  sctx.rotate(shooter.angle);
  if (aimingLeft) sctx.scale(1, -1);

  if (shooterImage) {
    sctx.shadowColor = "rgba(90, 235, 255, 0.78)";
    sctx.shadowBlur = 12;
    sctx.drawImage(shooterImage, -SHOOTER_SIZE / 2, -SHOOTER_SIZE / 2, SHOOTER_SIZE, SHOOTER_SIZE);
  } else {
    sctx.fillStyle = "rgba(117, 236, 255, 0.95)";
    sctx.shadowColor = "rgba(78, 230, 255, 0.9)";
    sctx.shadowBlur = 18;
    sctx.beginPath();
    sctx.moveTo(40, 0);
    sctx.lineTo(-22, -20);
    sctx.lineTo(-8, 0);
    sctx.lineTo(-22, 20);
    sctx.closePath();
    sctx.fill();
  }

  sctx.restore();

  const side = aimingLeft ? -1 : 1;
  const nextX = shooter.x + Math.cos(shooter.angle + side * Math.PI / 2) * 32;
  const nextY = shooter.y + Math.sin(shooter.angle + side * Math.PI / 2) * 32;
  drawMarble(nextX, nextY, nextColor, BALL_RADIUS * 1.55, sctx, 0);
}


function drawAimReticle() {
  if (paused || gameEnded || gameMode === "menu") return;

  const dx = mouse.x - shooter.x;
  const dy = mouse.y - shooter.y;
  const length = Math.hypot(dx, dy) || 1;
  const ux = dx / length;
  const uy = dy / length;
const startX = shooter.x + (dx / length) * 35;
const startY = shooter.y + (dy / length) * 35;
const endX = shooter.x + (dx / length) * 150;
const endY = shooter.y + (dy / length) * 150;
  const glow = getMarbleGlow(nextColor);

  sctx.save();
  sctx.lineCap = "round";
  sctx.lineJoin = "round";

  const outerGradient = sctx.createLinearGradient(startX, startY, endX, endY);
  outerGradient.addColorStop(0, glow.line.replace("1)", "0.82)"));
  outerGradient.addColorStop(0.56, glow.line.replace("1)", "0.38)"));
  outerGradient.addColorStop(1, glow.line.replace("1)", "0)"));

  const coreGradient = sctx.createLinearGradient(startX, startY, endX, endY);
  coreGradient.addColorStop(0, "rgba(255, 255, 255, 0.92)");
  coreGradient.addColorStop(0.48, glow.line.replace("1)", "0.48)"));
  coreGradient.addColorStop(1, "rgba(255, 255, 255, 0)");

  
  sctx.globalAlpha = 1;
  sctx.strokeStyle = outerGradient;
  sctx.shadowColor = glow.shadow;
  sctx.shadowBlur = 22;
  sctx.lineWidth = 7;
  sctx.beginPath();
  sctx.moveTo(startX, startY);
  sctx.lineTo(endX, endY);
  sctx.stroke();

  
  sctx.strokeStyle = outerGradient;
  sctx.shadowBlur = 12;
  sctx.lineWidth = 3;
  sctx.beginPath();
  sctx.moveTo(startX, startY);
  sctx.lineTo(endX, endY);
  sctx.stroke();

  
  sctx.strokeStyle = coreGradient;
  sctx.shadowBlur = 0;
  sctx.lineWidth = 1.2;
  sctx.beginPath();
  sctx.moveTo(startX, startY);
  sctx.lineTo(endX, endY);
  sctx.stroke();

  
  sctx.fillStyle = glow.line;
  sctx.shadowColor = glow.shadow;
  sctx.shadowBlur = 10;
  for (let d = 78; d <= 148; d += 28) {
    const fade = 1 - (d - 78) / 92;
    const px = shooter.x + ux * d;
    const py = shooter.y + uy * d;
    sctx.globalAlpha = 0.45 * Math.max(0.15, fade);
    sctx.fillRect(Math.round(px) - 2, Math.round(py) - 2, 4, 4);
  }

  sctx.restore();
}

function getMarbleGlow(color) {
  return MARBLE_GLOWS[color] || MARBLE_GLOWS[0];
}

function drawMarble(x, y, color, size, renderCtx = ctx, rotation = 0) {
  const image = marbleImages[color];
  const half = size / 2;

  const glow = getMarbleGlow(color);

  renderCtx.save();

  
  const aura = renderCtx.createRadialGradient(x, y, half * 0.1, x, y, half * 1.85);
  aura.addColorStop(0, glow.line.replace("1)", "0.72)"));
  aura.addColorStop(0.38, glow.line.replace("1)", "0.34)"));
  aura.addColorStop(1, "rgba(0, 0, 0, 0)");
  renderCtx.fillStyle = aura;
  renderCtx.beginPath();
  renderCtx.arc(x, y, half * 1.85, 0, Math.PI * 2);
  renderCtx.fill();

  renderCtx.shadowColor = glow.shadow;
  renderCtx.shadowBlur = 34;

  if (image) {
    renderCtx.translate(x, y);
    renderCtx.rotate(rotation);
    renderCtx.drawImage(image, -half, -half, size, size);
  } else {
    const gradient = renderCtx.createRadialGradient(x - half * 0.35, y - half * 0.4, 2, x, y, half);
    gradient.addColorStop(0, "#ffffff");
    gradient.addColorStop(0.25, glow.fallback);
    gradient.addColorStop(1, "#07111d");
    renderCtx.fillStyle = gradient;
    renderCtx.beginPath();
    renderCtx.arc(x, y, half, 0, Math.PI * 2);
    renderCtx.fill();
  }

  renderCtx.restore();
}


function loop(time) {
  const delta = Math.min(0.033, (time - lastTime) / 1000 || 0);
  lastTime = time;

  if (!paused && gameMode !== "menu" && !transitionActive) {
    update(delta);
  } else if (screenShake.time > 0) {
    updateScreenShake(delta);
  }
  draw();

  requestAnimationFrame(loop);
}


function makeTransitionOverlay() {
  let overlay = document.getElementById("transitionOverlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.id = "transitionOverlay";
    document.getElementById("gameShell").appendChild(overlay);
  }
  overlay.classList.remove("hidden", "fade-visible");
  overlay.style.opacity = "0";
  overlay.style.display = "block";
  
  overlay.style.backgroundImage = `url("assets/sprites/black.png?transition=${Date.now()}")`;
  return overlay;
}

function startWithScreenTransition(startCallback) {
  if (transitionActive) return;
  transitionActive = true;

  const overlay = makeTransitionOverlay();
  stopGameMusic();

  
  overlay.getBoundingClientRect();
  overlay.classList.add("fade-visible");

  window.setTimeout(() => {
    startCallback();

    
    paused = true;
    stopGameMusic();
    updatePauseButtonIcon();

    window.setTimeout(() => {
      overlay.classList.remove("fade-visible");
    }, 90);
  }, 475);

  window.setTimeout(() => {
    overlay.remove();
    transitionActive = false;

    if (gameMode === "menu") {
      playMenuMusic();
    } else if (!gameEnded) {
      paused = false;
      lastTime = performance.now();
      updatePauseButtonIcon();
      playGameMusic();
    }
  }, 1150);
}

if (startScreen) {
  startScreen.addEventListener("click", enterMainMenuFromStart, { once: true });
}

canvas.addEventListener("pointermove", (event) => {
  if (event.pointerType === "touch") event.preventDefault();
  mouse = getPointerPosition(event);
});

canvas.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "touch") event.preventDefault();
  mouse = getPointerPosition(event);
  shoot();
});

canvas.addEventListener("contextmenu", (event) => event.preventDefault());

pauseBtn.addEventListener("click", () => {
  if (gameEnded) retryCurrentRun();
  else setPaused(!paused);
});

resumeBtn.addEventListener("click", () => setPaused(false));
retryBtn.addEventListener("click", retryCurrentRun);
nextLevelBtn.addEventListener("click", startNextLevel);
menuBtn.addEventListener("click", () => startWithScreenTransition(showMainMenu));


function setupButtonClickSounds() {
  document.addEventListener("click", (event) => {
    const clickable = event.target.closest("button, .credits-link");
    if (!clickable || clickable.disabled) return;
    playSound(sounds.click);
  });
}

if (creditsOpenBtn) creditsOpenBtn.addEventListener("click", showCreditsPanel);
if (creditsReturnBtn) creditsReturnBtn.addEventListener("click", hideCreditsPanel);
if (creditsPanel) creditsPanel.addEventListener("click", (event) => {
  if (event.target === creditsPanel) hideCreditsPanel();
});

levelModeBtn.addEventListener("click", () => {
  hideCreditsPanel();
  mainMenu.classList.add("hidden");
  levelSelect.classList.remove("hidden");
});

infiniteModeBtn.addEventListener("click", () => {
  hideCreditsPanel();
  startWithScreenTransition(startInfinite);
});
backToMenuBtn.addEventListener("click", () => {
  levelSelect.classList.add("hidden");
  mainMenu.classList.remove("hidden");
});

levelButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const levelIndex = Number(button.dataset.level);
    startWithScreenTransition(() => startLevel(levelIndex));
  });
});

document.addEventListener("keydown", (event) => {
  if (event.key.toLowerCase() === "p") setPaused(!paused);
  if (event.key === "Escape" && creditsPanel && !creditsPanel.classList.contains("hidden")) {
    hideCreditsPanel();
    return;
  }
  if (event.key === "Escape" && gameMode !== "menu") setPaused(true);
});


function shouldLockPortrait() {
  const portrait = window.matchMedia("(orientation: portrait)").matches;
  const touchDevice = window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
  return portrait && touchDevice;
}

function updateOrientationLock() {
  const locked = shouldLockPortrait();
  document.body.classList.toggle("portrait-locked", locked);
  if (orientationLock) orientationLock.setAttribute("aria-hidden", locked ? "false" : "true");

  if (locked && gameMode !== "menu" && !gameEnded && !paused) {
    orientationPausedGame = true;
    paused = true;
    pauseGameMusic();
    updatePauseButtonIcon();
  } else if (!locked && orientationPausedGame && gameMode !== "menu" && !gameEnded) {
    orientationPausedGame = false;
    paused = false;
    lastTime = performance.now();
    updatePauseButtonIcon();
    playGameMusic();
  }
}

window.addEventListener("resize", updateOrientationLock);
window.addEventListener("orientationchange", updateOrientationLock);

async function start() {
  buildPath();
  await loadAssets();
  setupButtonClickSounds();
  updateOrientationLock();
  showStartScreen();
  if (window.location.search.includes("autostart=1")) {
    if (startScreen) startScreen.classList.add("hidden");
    startLevel(0);
  }
  lastTime = performance.now();
  requestAnimationFrame(loop);
}

start();
