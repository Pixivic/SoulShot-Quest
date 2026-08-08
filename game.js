

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
const loadingScreen = document.getElementById("loadingScreen");
const loadingStatus = document.getElementById("loadingStatus");
const loadingProgressBar = document.getElementById("loadingProgressBar");
const loadingHint = document.getElementById("loadingHint");
const loadingRetryBtn = document.getElementById("loadingRetryBtn");
const orientationLock = document.getElementById("orientationLock");
const gameShell = document.getElementById("gameShell");

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
const settingsOpenBtn = document.getElementById("settingsOpenBtn");
const settingsPanel = document.getElementById("settingsPanel");
const settingsReturnBtn = document.getElementById("settingsReturnBtn");
const musicVolumeSlider = document.getElementById("musicVolumeSlider");
const sfxVolumeSlider = document.getElementById("sfxVolumeSlider");
const musicVolumeFill = document.getElementById("musicVolumeFill");
const sfxVolumeFill = document.getElementById("sfxVolumeFill");
const musicVolumeKnob = document.getElementById("musicVolumeKnob");
const sfxVolumeKnob = document.getElementById("sfxVolumeKnob");
const musicVolumeText = document.getElementById("musicVolumeText");
const sfxVolumeText = document.getElementById("sfxVolumeText");
const skillSlotEls = {
  electric: document.getElementById("skillSlotElectric"),
  fire: document.getElementById("skillSlotFire"),
  ice: document.getElementById("skillSlotIce")
};
const skillTooltipEl = document.getElementById("skillTooltip");
const skillTooltipName = document.getElementById("skillTooltipName");
const skillTooltipDesc = document.getElementById("skillTooltipDesc");
const skillCancelTip = document.getElementById("skillCancelTip");

const levelButtons = document.querySelectorAll(".levelBtn");

const messagePanel = document.getElementById("messagePanel");
const messageTitle = document.getElementById("messageTitle");
const messageText = document.getElementById("messageText");
const resumeBtn = document.getElementById("resumeBtn");
const retryBtn = document.getElementById("retryBtn");
const nextLevelBtn = document.getElementById("nextLevelBtn");
const menuBtn = document.getElementById("menuBtn");
const settingsPauseBtn = document.getElementById("settingsPauseBtn");

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
const ICE_EXPLOSION_SRC = "assets/sprites/explosionblue.gif";
const SKILL_EXPLOSION_SRC = {
  electric: "assets/sprites/skills/Electric_Barrel_Explosion.gif",
  fire: "assets/sprites/skills/Fire_Barrel_Explosion.gif",
  ice: "assets/sprites/skills/Ice_Barrel_Explosion.gif"
};
const SKILL_EXPLOSION_SCALE = 4;
const FIRE_SKILL_EXPLOSION_SCALE = 8;
const FIRE_SKILL_RADIUS = 220;
const FIRE_AIM_SIZE = 230;
const ELECTRIC_CHAIN_RANGE = 5;
const ELECTRIC_CHAIN_STEP = 0.20;
const ELECTRIC_EXPLODE_STEP = 0.10;
const ELECTRIC_CONNECT_SRC = "assets/sprites/electricconnect.gif";
const ELECTRIC_START_POINT_SRC = "assets/sprites/electricstartpoint.gif";
const FIRE_AIM_SRC = "assets/sprites/fireaim.png";
const FIRE_FLASH_DURATION = 0.16;
const ICE_FREEZE_DURATION = 15;
const ICE_FLASH_DURATION = 0.42;
const CHARACTER_SIZE = 150;
const CHARACTER_OFFSET_Y = -40;

const SKILL_TYPES = {
  electric: { name: "Electric Barrel", desc: "Fires an electric barrel that chains damage to up to 5 Soul Eggs on each side.", glow: "rgba(255, 230, 45, 1)", icon: "assets/sprites/skills/marbleelectric.png", inactive: "assets/sprites/skills/electric-inactive.png", active: "assets/sprites/skills/electric_active.gif", shoot: "assets/sprites/skills/electric_shoot.gif" },
  fire: { name: "Explosive Barrel", desc: "Fires an explosive barrel that deals area damage.", glow: "rgba(255, 55, 45, 1)", icon: "assets/sprites/skills/marblefire.png", inactive: "assets/sprites/skills/fire-inactive.png", active: "assets/sprites/skills/fire_active.gif", shoot: "assets/sprites/skills/fire_shoot.gif" },
  ice: { name: "Ice Barrel", desc: "Fires an ice barrel that freezes all Soul Eggs for 15 seconds.", glow: "rgba(95, 220, 255, 1)", icon: "assets/sprites/skills/marbleice.png", inactive: "assets/sprites/skills/ice-inactive.png", active: "assets/sprites/skills/ice_active.gif", shoot: "assets/sprites/skills/ice_shoot.gif" }
};

const SKILL_ORDER = ["electric", "fire", "ice"];
const SKILL_SIZE = 112;
const SKILL_SLOT_GAP = 150;
const SKILL_HOVER_DELAY = 1;

const MARBLE_GLOWS = [
  { name: "white",   shadow: "rgba(255, 255, 255, 1)", line: "rgba(245, 255, 255, 1)", fallback: "#f6ffff" },
  { name: "yellow",  shadow: "rgba(255, 232, 65, 1)",  line: "rgba(255, 232, 65, 1)",  fallback: "#ffe84a" },
  { name: "magenta", shadow: "rgba(255, 60, 255, 1)",  line: "rgba(255, 60, 255, 1)",  fallback: "#ff43ff" },
  { name: "red",     shadow: "rgba(255, 65, 65, 1)",    line: "rgba(255, 65, 65, 1)",    fallback: "#ff4545" },
  { name: "green",   shadow: "rgba(65, 255, 92, 1)",    line: "rgba(65, 255, 92, 1)",    fallback: "#41ff5c" },
  { name: "blue",    shadow: "rgba(70, 160, 255, 1)",   line: "rgba(70, 160, 255, 1)",   fallback: "#45a0ff" }
];

const LEVELS = [
  { name: "Normal", totalBalls: 84, speed: 64, colors: 6, startLead: START_LEAD_DISTANCE },
  { name: "Hard", totalBalls: 108, speed: 84, colors: 6, startLead: START_LEAD_DISTANCE },
  { name: "Insane", totalBalls: 128, speed: 108, colors: 6, startLead: START_LEAD_DISTANCE },
  { name: "Impossible", totalBalls: 148, speed: 132, colors: 6, startLead: START_LEAD_DISTANCE, impossible: true }
];

const RESOURCE_MANIFEST = [
  "assets/font/Pixelmax-Outline.otf",
  "assets/font/Pixelmax-Regular.otf",
  "assets/font/ZXPIX___.TTF",
  "assets/sounds/Electricskillexplode.WAV",
  "assets/sounds/Freezescreen.WAV",
  "assets/sounds/Music2.wav",
  "assets/sounds/click.wav",
  "assets/sounds/destroy.wav",
  "assets/sounds/electricconnect.WAV",
  "assets/sounds/explosiveskillsound.WAV",
  "assets/sounds/hurt.wav",
  "assets/sounds/music.wav",
  "assets/sounds/music3.wav",
  "assets/sounds/music4.wav",
  "assets/sounds/music5.wav",
  "assets/sounds/shoot.wav",
  "assets/sprites/Electric_Barrel_Explosion.gif",
  "assets/sprites/Fire_Barrel_Explosion.gif",
  "assets/sprites/Ice_Barrel_Explosion.gif",
  "assets/sprites/Screenfreeze.png",
  "assets/sprites/White.png",
  "assets/sprites/background.png",
  "assets/sprites/background2.png",
  "assets/sprites/background3.png",
  "assets/sprites/black.png",
  "assets/sprites/character.gif",
  "assets/sprites/character.png",
  "assets/sprites/electricconnect.gif",
  "assets/sprites/electricstartpoint.gif",
  "assets/sprites/explosion.gif",
  "assets/sprites/explosionblue.gif",
  "assets/sprites/fireaim.png",
  "assets/sprites/gameover.png",
  "assets/sprites/marble1.png",
  "assets/sprites/marble2.png",
  "assets/sprites/marble3.png",
  "assets/sprites/marble4.png",
  "assets/sprites/marble5.png",
  "assets/sprites/marble6.png",
  "assets/sprites/mode1.png",
  "assets/sprites/mode2.png",
  "assets/sprites/mode3.png",
  "assets/sprites/mode4.png",
  "assets/sprites/mode5.png",
  "assets/sprites/shooter.png",
  "assets/sprites/skills/Electric_Barrel_Explosion.gif",
  "assets/sprites/skills/Fire_Barrel_Explosion.gif",
  "assets/sprites/skills/Ice_Barrel_Explosion.gif",
  "assets/sprites/skills/electric-inactive.png",
  "assets/sprites/skills/electric_active.gif",
  "assets/sprites/skills/electric_shoot.gif",
  "assets/sprites/skills/fire-inactive.png",
  "assets/sprites/skills/fire_active.gif",
  "assets/sprites/skills/fire_shoot.gif",
  "assets/sprites/skills/ice-inactive.png",
  "assets/sprites/skills/ice_active.gif",
  "assets/sprites/skills/ice_shoot.gif",
  "assets/sprites/skills/marbleelectric.png",
  "assets/sprites/skills/marblefire.png",
  "assets/sprites/skills/marbleice.png",
  "assets/sprites/start_gate.gif",
  "assets/ui/Buttonhover.png",
  "assets/ui/Buttonpressed.png",
  "assets/ui/MainmenuCon.png",
  "assets/ui/Marblebar.png",
  "assets/ui/Marblebarfill.png",
  "assets/ui/Pause.png",
  "assets/ui/PauseCon.png",
  "assets/ui/Pausehover.png",
  "assets/ui/Pausepressed.png",
  "assets/ui/Resume.png",
  "assets/ui/Resumehover.png",
  "assets/ui/Score.png",
  "assets/ui/Volumebar.png",
  "assets/ui/Volumebarfill.png",
  "assets/ui/button.png",
  "assets/ui/resumepressed.png",
  "assets/ui/volumeadjuster.png",
  "assets/ui/volumeadjusterhover.png",
  "assets/ui/volumeadjusterpressed.png"
];

const IMAGE_EXTENSIONS = new Set(["png", "gif", "jpg", "jpeg", "webp"]);
const AUDIO_EXTENSIONS = new Set(["wav", "mp3", "ogg", "m4a"]);
const RESOURCE_LOAD_CONCURRENCY = 6;


let marbleImages = [];
let skillImages = {};
let shooterImage = null;
let fireAimImage = null;
let electricConnectImage = null;
let electricStartPointImage = null;
let electricLinkEls = [];
let electricStartEl = null;
let startGateImage = null;
let sounds = { shoot: null, destroy: null, hurt: null, freeze: null, explosiveSkill: null, electricSkillExplode: null, electricConnect: null, click: null, music: null, music2: null, music3: null, music4: null, music5: null };
let musicVolume = 1;
let sfxVolume = 1;

let path = [];
let pathDistances = [];
let pathLength = 0;
let balls = [];
let projectile = null;
let nextColor = 0;
let loadedSkillShot = null;
let skillStates = {};
let skillHover = { type: null, time: 0 };
let skillPointerDown = null;
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
let settingsReturnTarget = "menu";
let startGateStaticLocked = false;
let startGateStaticSource = null;
let iceFreeze = { active: false, time: 0, duration: ICE_FREEZE_DURATION, flash: 0, ending: false, fadeOut: 0, released: false, releaseDelay: 0 };
let iceThaw = { active: false, time: 0, duration: 1.25 };
let fireAimFades = [];
let electricSkill = { active: false, links: [], remove: [], timer: 0, chainStep: 0, explodeStep: 0, exploding: false, wait: 0, done: false, startIndex: -1 };
let preloadedImages = new Map();
let resourceObjectUrls = new Map();
let resourceLoadInProgress = false;
let gameLoopStarted = false;
let buttonClickSoundsReady = false;
let volumeSlidersReady = false;
let orientationPausedGame = false;

const shooter = {
  x: 762,
  y: 427,
  angle: 0
};


function getResourceExtension(src) {
  const clean = src.split("?")[0];
  return clean.includes(".") ? clean.split(".").pop().toLowerCase() : "";
}

function getResourceLabel(src) {
  return src.split("/").pop();
}

function assetUrl(src) {
  return resourceObjectUrls.get(src) || src;
}

function showLoadingScreen() {
  if (!loadingScreen) return;
  loadingScreen.classList.remove("hidden", "loading-error");
  if (loadingRetryBtn) loadingRetryBtn.classList.add("hidden");
  if (loadingProgressBar) loadingProgressBar.style.width = "0%";
  if (loadingStatus) loadingStatus.textContent = "Downloading resources... 0%";
  if (loadingHint) loadingHint.textContent = "Preparing game files...";
}

function hideLoadingScreen() {
  if (loadingScreen) loadingScreen.classList.add("hidden");
}

function updateLoadingProgress(done, total, label = "") {
  const safeTotal = Math.max(1, total);
  const percent = Math.max(0, Math.min(100, Math.round((done / safeTotal) * 100)));
  if (loadingProgressBar) loadingProgressBar.style.width = `${percent}%`;
  if (loadingStatus) {
    loadingStatus.textContent = percent >= 100
      ? "Resources ready"
      : `Downloading resources... ${percent}%`;
  }
  if (loadingHint) {
    loadingHint.textContent = label ? `Loaded: ${label}` : "Preparing game files...";
  }
}

function showLoadingError(failedResources) {
  if (loadingScreen) loadingScreen.classList.add("loading-error");
  if (loadingStatus) loadingStatus.textContent = "Download failed";
  if (loadingHint) {
    const labels = failedResources.slice(0, 3).map(getResourceLabel);
    const extra = failedResources.length > 3 ? ` +${failedResources.length - 3} more` : "";
    loadingHint.textContent = `Could not load: ${labels.join(", ")}${extra}. Tap Retry.`;
  }
  if (loadingRetryBtn) loadingRetryBtn.classList.remove("hidden");
}

function revokeResourceObjectUrls() {
  for (const url of resourceObjectUrls.values()) {
    try { URL.revokeObjectURL(url); } catch (error) {}
  }
  resourceObjectUrls.clear();
  preloadedImages.clear();
}

function preloadDirectImage(src) {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.onload = () => {
      preloadedImages.set(src, image);
      resolve();
    };
    image.onerror = () => reject(new Error(`Image failed: ${src}`));
    image.src = src;
  });
}

function preloadDirectAudio(src) {
  return new Promise((resolve, reject) => {
    const audio = new Audio();
    let settled = false;
    let timer = 0;

    const finish = (ok) => {
      if (settled) return;
      settled = true;
      audio.removeEventListener("canplaythrough", ready);
      audio.removeEventListener("loadeddata", ready);
      audio.removeEventListener("error", failed);
      if (timer) clearTimeout(timer);
      if (ok) resolve();
      else reject(new Error(`Audio failed: ${src}`));
    };
    const ready = () => finish(true);
    const failed = () => finish(false);

    audio.preload = "auto";
    audio.addEventListener("canplaythrough", ready);
    audio.addEventListener("loadeddata", ready);
    audio.addEventListener("error", failed);
    audio.src = src;
    audio.load();
    timer = setTimeout(() => finish(audio.readyState >= 2), 15000);
  });
}

async function preloadResource(src) {
  const ext = getResourceExtension(src);

  if (location.protocol === "file:") {
    if (IMAGE_EXTENSIONS.has(ext)) return preloadDirectImage(src);
    if (AUDIO_EXTENSIONS.has(ext)) return preloadDirectAudio(src);
    return;
  }

  const response = await fetch(src, { cache: "force-cache" });
  if (!response.ok) throw new Error(`HTTP ${response.status}: ${src}`);
  const blob = await response.blob();
  const objectUrl = URL.createObjectURL(blob);
  resourceObjectUrls.set(src, objectUrl);

  if (IMAGE_EXTENSIONS.has(ext)) {
    const image = new Image();
    image.src = objectUrl;
    if (typeof image.decode === "function") {
      try { await image.decode(); }
      catch (error) {
        await new Promise((resolve, reject) => {
          image.onload = resolve;
          image.onerror = reject;
        });
      }
    } else {
      await new Promise((resolve, reject) => {
        image.onload = resolve;
        image.onerror = reject;
      });
    }
    preloadedImages.set(src, image);
  }
}

async function preloadAllResources() {
  if (resourceLoadInProgress) return false;
  resourceLoadInProgress = true;
  showLoadingScreen();
  revokeResourceObjectUrls();

  const total = RESOURCE_MANIFEST.length;
  let nextIndex = 0;
  let completed = 0;
  const failed = [];
  updateLoadingProgress(0, total);

  async function worker() {
    while (true) {
      const index = nextIndex++;
      if (index >= total) return;
      const src = RESOURCE_MANIFEST[index];
      try {
        await preloadResource(src);
      } catch (error) {
        console.error(error);
        failed.push(src);
      }
      completed += 1;
      updateLoadingProgress(completed, total, getResourceLabel(src));
    }
  }

  const workers = Array.from({ length: Math.min(RESOURCE_LOAD_CONCURRENCY, total) }, () => worker());
  await Promise.all(workers);

  if (failed.length > 0) {
    resourceLoadInProgress = false;
    showLoadingError(failed);
    return false;
  }

  if (document.fonts && document.fonts.load) {
    try {
      await Promise.all([
        document.fonts.load('18px "Pixelmax"', "SoulShot Quest"),
        document.fonts.load('18px "ZXPIX"', "Downloading resources")
      ]);
    } catch (error) {
      console.warn("Font readiness check failed; downloaded font files are still cached.", error);
    }
  }

  updateLoadingProgress(total, total, "All resources ready");
  resourceLoadInProgress = false;
  return true;
}

function loadImage(src) {
  const cached = preloadedImages.get(src);
  if (cached) return Promise.resolve(cached);
  return preloadDirectImage(src).then(() => preloadedImages.get(src) || null).catch(() => null);
}

function restartGifElement(element, src) {
  if (!element) return;
  element.src = "";
  void element.offsetWidth;
  element.src = assetUrl(src);
}

async function loadAssets() {
  shooterImage = await loadImage("assets/sprites/shooter.png");
  fireAimImage = await loadImage(FIRE_AIM_SRC);
  electricConnectImage = await loadImage(ELECTRIC_CONNECT_SRC);
  electricStartPointImage = await loadImage(ELECTRIC_START_POINT_SRC);
  startGateImage = null;
  startGateStaticSource = await loadImage("assets/sprites/start_gate.gif");

  marbleImages = [];
  for (let i = 1; i <= 6; i++) {
    marbleImages.push(await loadImage(`assets/sprites/marble${i}.png`));
  }

  skillImages = {};
  for (const type of SKILL_ORDER) {
    const info = SKILL_TYPES[type];
    skillImages[type] = {
      icon: await loadImage(info.icon),
      inactive: await loadImage(info.inactive),
      active: await loadImage(info.active),
      shoot: await loadImage(info.shoot)
    };
  }

  if (animatedBackground) animatedBackground.src = assetUrl("assets/sprites/background.png");
  if (startGateGif) startGateGif.src = assetUrl("assets/sprites/start_gate.gif");
  if (characterSprite) characterSprite.src = assetUrl("assets/sprites/character.gif");
  if (modeIcon) modeIcon.src = assetUrl("assets/sprites/mode1.png");
  setupAudio();
}

function setupAudio() {
  sounds.shoot = makeAudio("assets/sounds/shoot.wav", { volume: 0.55, type: "sfx" });
  sounds.destroy = makeAudio("assets/sounds/destroy.wav", { volume: 0.7, type: "sfx" });
  sounds.hurt = makeAudio("assets/sounds/hurt.wav", { volume: 0.85, type: "sfx" });
  sounds.freeze = makeAudio("assets/sounds/Freezescreen.WAV", { volume: 0.75, type: "sfx" });
  sounds.explosiveSkill = makeAudio("assets/sounds/explosiveskillsound.WAV", { volume: 0.85, type: "sfx" });
  sounds.electricSkillExplode = makeAudio("assets/sounds/Electricskillexplode.WAV", { volume: 0.85, type: "sfx" });
  sounds.electricConnect = makeAudio("assets/sounds/electricconnect.WAV", { volume: 0.78, type: "sfx" });
  sounds.click = makeAudio("assets/sounds/click.wav", { volume: 0.7, type: "sfx" });
  sounds.music = makeAudio("assets/sounds/music.wav", { volume: 0.45, loop: true, type: "music" });
  sounds.music2 = makeAudio("assets/sounds/Music2.wav", { volume: 0.45, loop: true, type: "music" });
  sounds.music3 = makeAudio("assets/sounds/music3.wav", { volume: 0.42, loop: true, type: "music" });
  sounds.music4 = makeAudio("assets/sounds/music4.wav", { volume: 0.38, loop: true, type: "music" });
  sounds.music5 = makeAudio("assets/sounds/music5.wav", { volume: 0.45, loop: true, type: "music" });
  updateAllAudioVolumes();
}

function makeAudio(src, options = {}) {
  const audio = new Audio(assetUrl(src));
  audio.preload = "auto";
  audio.baseVolume = options.volume ?? 1;
  audio.audioType = options.type || "sfx";
  audio.volume = audio.baseVolume;
  audio.loop = Boolean(options.loop);
  return audio;
}

function applyAudioVolume(audio) {
  if (!audio) return;
  const master = audio.audioType === "music" ? musicVolume : sfxVolume;
  audio.volume = Math.max(0, Math.min(1, (audio.baseVolume ?? 1) * master));
}

function updateAllAudioVolumes() {
  for (const key in sounds) applyAudioVolume(sounds[key]);
}

function playSound(audio, clone = false) {
  if (!audio) return;
  try {
    applyAudioVolume(audio);
    const sound = clone ? audio.cloneNode(true) : audio;
    sound.baseVolume = audio.baseVolume;
    sound.audioType = audio.audioType;
    applyAudioVolume(sound);
    sound.currentTime = 0;
    sound.play().catch(() => {});
    return sound;
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
    applyAudioVolume(track);
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
  animatedBackground.src = assetUrl(gameMode === "menu"
    ? "assets/sprites/background3.png"
    : gameMode === "infinite"
      ? "assets/sprites/background2.png"
      : "assets/sprites/background.png");
}

function updateModeIcon() {
  if (!modeIcon) return;
  modeIcon.classList.remove("infinite-mode-icon");

  if (gameMode === "infinite") {
    modeIcon.src = assetUrl("assets/sprites/mode5.png");
    modeIcon.classList.add("infinite-mode-icon");
    modeIcon.classList.remove("hidden");
    return;
  }

  if (gameMode === "level") {
    modeIcon.src = assetUrl(`assets/sprites/mode${currentLevelIndex + 1}.png`);
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
  hideSettingsPanel();
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
  if (settingsPanel) settingsPanel.classList.add("hidden");
  creditsPanel.classList.remove("hidden");
}

function hideCreditsPanel() {
  if (!creditsPanel) return;
  creditsPanel.classList.add("hidden");
}

function showSettingsPanel(from = "menu") {
  if (!settingsPanel) return;
  settingsReturnTarget = from;
  hideCreditsPanel();
  levelSelect.classList.add("hidden");
  mainMenu.classList.add("hidden");
  if (from === "pause") messagePanel.classList.add("hidden");
  settingsPanel.classList.remove("hidden");
  updateVolumeSliderUI("music");
  updateVolumeSliderUI("sfx");
}

function hideSettingsPanel() {
  if (!settingsPanel) return;
  settingsPanel.classList.add("hidden");
}

function returnFromSettings() {
  hideSettingsPanel();
  if (settingsReturnTarget === "pause" && gameMode !== "menu" && paused && !gameEnded) {
    messagePanel.classList.remove("hidden");
  } else {
    mainMenu.classList.remove("hidden");
  }
}

function setVolume(kind, value) {
  const fixed = Math.max(0, Math.min(1, value));
  if (kind === "music") musicVolume = fixed;
  else sfxVolume = fixed;
  updateAllAudioVolumes();
  updateVolumeSliderUI(kind);
}

function updateVolumeSliderUI(kind) {
  const volume = kind === "music" ? musicVolume : sfxVolume;
  const fill = kind === "music" ? musicVolumeFill : sfxVolumeFill;
  const knob = kind === "music" ? musicVolumeKnob : sfxVolumeKnob;
  const text = kind === "music" ? musicVolumeText : sfxVolumeText;

  if (knob) {
    const knobW = knob.offsetWidth || 34;
    const px = (0.5 - volume) * knobW;
    knob.style.left = `calc(${volume * 100}% + ${px}px)`;

    if (fill) {
      const sliderW = fill.parentElement ? fill.parentElement.clientWidth : 1;
      const cover = ((0.5 - volume) * knobW + knobW * 0.3 - 16) / Math.max(1, sliderW) * 100;
      const shown = Math.max(0, Math.min(100, volume * 100 + cover));
      fill.style.clipPath = `inset(0 ${100 - shown}% 0 0)`;
    }
  } else if (fill) {
    fill.style.clipPath = `inset(0 ${100 - volume * 100}% 0 0)`;
  }
  if (text) text.textContent = `${Math.round(volume * 100)}`;
}

function setupVolumeSlider(kind, slider, knob) {
  if (!slider) return;
  let dragging = false;

  function apply(event) {
    const rect = slider.getBoundingClientRect();
    const clientX = event.touches ? event.touches[0].clientX : event.clientX;
    const value = (clientX - rect.left) / rect.width;
    setVolume(kind, value);
  }

  slider.addEventListener("pointerdown", (event) => {
    dragging = true;
    if (knob) knob.classList.add("dragging");
    slider.setPointerCapture?.(event.pointerId);
    apply(event);
  });

  slider.addEventListener("pointermove", (event) => {
    if (!dragging) return;
    apply(event);
  });

  function stopDrag(event) {
    dragging = false;
    if (knob) knob.classList.remove("dragging");
    try { slider.releasePointerCapture?.(event.pointerId); } catch (error) {}
  }

  slider.addEventListener("pointerup", stopDrag);
  slider.addEventListener("pointercancel", stopDrag);
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

function randomSkillType() {
  return SKILL_ORDER[Math.floor(Math.random() * SKILL_ORDER.length)];
}

function resetSkills() {
  skillStates = {};
  for (const type of SKILL_ORDER) {
    skillStates[type] = { active: false };
  }
  loadedSkillShot = null;
  updateSkillCancelTip();
  removeElectricLinkDom();
  skillHover = { type: null, time: 0 };
  endIceFreeze();
}

function activateSkill(type) {
  if (!skillStates[type]) return;
  skillStates[type].active = true;
}

function placeLevelSkillBalls() {
  const count = Math.min(3 + currentLevelIndex, Math.floor(balls.length / 10));
  const used = new Set();
  for (let i = 0; i < count; i++) {
    let idx = 8 + Math.floor(Math.random() * Math.max(1, balls.length - 16));
    let guard = 0;
    while (used.has(idx) && guard < 20) {
      idx = 8 + Math.floor(Math.random() * Math.max(1, balls.length - 16));
      guard++;
    }
    used.add(idx);
    const old = balls[idx];
    if (old) balls[idx] = makeSkillBall(randomSkillType(), old.distance);
  }
}

function makeBall(color, distance) {
  return {
    kind: "marble",
    color,
    distance,
    visualDistance: distance,
    rollOffset: Math.random() * Math.PI * 2,
    merge: null,
    checkAfterMerge: false
  };
}

function makeSkillBall(type, distance) {
  return {
    kind: "skill",
    skillType: type,
    color: -1,
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
  document.body.classList.toggle("impossible-mode", !!currentLevel.impossible);
  setGameplayBackground();
  updateModeIcon();
  setupNewRun();

  for (let i = 0; i < currentLevel.totalBalls; i++) {
    balls.push(makeBall(randomColor(currentLevel.colors), currentLevel.startLead - i * BALL_SPACING));
  }

  placeLevelSkillBalls();
  nextColor = randomColor(currentLevel.colors);
  showGameOnly();
}

function startInfinite() {
  gameMode = "infinite";
  document.body.classList.remove("impossible-mode");
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
  resetSkills();
  startGateStaticLocked = false;
  if (startGateGif) restartGifElement(startGateGif, "assets/sprites/start_gate.gif");
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
  document.body.classList.remove("impossible-mode");
  document.body.classList.add("menu-active");
  hideCreditsPanel();
  hideSettingsPanel();
  gameMode = "menu";
  setGameplayBackground();
  updateModeIcon();
  paused = true;
  gameEnded = true;
  balls = [];
  projectile = null;
  screenShake = { time: 0, duration: 0, amount: 0 };
  resetSkills();
  startGateStaticLocked = false;
  if (startGateGif) restartGifElement(startGateGif, "assets/sprites/start_gate.gif");
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

function getMousePosition(event) {
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
    showMessage("Paused", "Click Resume to continue.", { resume: true, retry: true, settings: true, next: false, menu: true });
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
  messagePanel.classList.remove("game-over-panel", "level-clear-panel", "level-clear-last-panel");
  if (title === "Level Clear") messagePanel.classList.add("level-clear-panel");
  messageTitle.textContent = title;
  messageText.textContent = text;
  resumeBtn.style.display = buttons.resume ? "inline-block" : "none";
  retryBtn.style.display = buttons.retry ? "inline-block" : "none";
  if (settingsPauseBtn) settingsPauseBtn.style.display = buttons.settings ? "inline-block" : "none";
  nextLevelBtn.style.display = buttons.next ? "inline-block" : "none";
  menuBtn.style.display = buttons.menu ? "inline-block" : "none";
  messagePanel.classList.remove("hidden");
}

function shoot() {
  if (paused || gameEnded || gameMode === "menu" || projectile) return;

  const dx = mouse.x - shooter.x;
  const dy = mouse.y - shooter.y;
  const length = Math.hypot(dx, dy) || 1;
  const skillShot = loadedSkillShot;
  const color = nextColor;
  const fireTarget = skillShot === "fire" ? getFireAimPoint() : null;

  playSound(sounds.shoot);

  projectile = {
    kind: skillShot ? "skill" : "marble",
    skillType: skillShot,
    x: shooter.x + (dx / length) * 45,
    y: shooter.y + (dy / length) * 45,
    vx: (dx / length) * PROJECTILE_SPEED,
    vy: (dy / length) * PROJECTILE_SPEED,
    color,
    roll: 0,
    fireTarget
  };

  if (skillShot === "fire" && fireTarget) {
    fireAimFades.push({ x: fireTarget.x, y: fireTarget.y, time: 0.34, duration: 0.34 });
  }

  if (skillShot) {
    loadedSkillShot = null;
    updateSkillCancelTip();
  }
  else nextColor = randomColor(currentLevel.colors);
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

  updateIceFreeze(delta);
  updateElectricSkill(delta);
  updateElectricLinkDom();
  updateFireAimFades(delta);

  if (gameMode === "infinite" && (!iceFreeze.active || iceFreeze.released) && !electricSkill.active) {
    infiniteTime += delta;
    const colorCount = Math.min(6, 4 + Math.floor(infiniteTime / 75));
    currentLevel.colors = colorCount;
  }

  if ((!iceFreeze.active || iceFreeze.released) && !electricSkill.active) {
    iceThaw.active = false;

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
  }

  if (projectile) {
    projectile.x += projectile.vx * delta;
    projectile.y += projectile.vy * delta;
    if (!iceFreeze.active) projectile.roll += delta * 8.5;

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

  const useSkill = gameMode === "infinite" && infiniteSpawned > 10 && Math.random() < 0.075;
  balls.push(useSkill ? makeSkillBall(randomSkillType(), distance) : makeBall(randomColor(currentLevel.colors), distance));
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
      if (projectile.kind === "skill") {
        if (projectile.skillType === "ice") {
          createSkillExplosion(projectile.x, projectile.y, projectile.skillType);
          playSound(sounds.freeze, true);
          startIceFreeze();
        } else if (projectile.skillType === "fire") {
          const boom = projectile.fireTarget || getBallPoint(balls[i]);
          playSound(sounds.explosiveSkill, true);
          useFireSkillExplosion(boom.x, boom.y);
        } else {
          triggerElectricSkill(i, projectile.x, projectile.y);
        }
        projectile = null;
        return;
      }

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
  if (!balls[index] || balls[index].kind !== "marble") return;

  const color = balls[index].color;
  let start = index;
  let end = index;

  while (start > 0 && balls[start - 1].kind === "marble" && balls[start - 1].color === color) start--;
  while (end < balls.length - 1 && balls[end + 1].kind === "marble" && balls[end + 1].color === color) end++;

  const count = end - start + 1;
  if (count >= 3) {
    let removeStart = start;
    let removeEnd = end;
    const skillTypesDestroyed = [];

    if (balls[start - 1] && balls[start - 1].kind === "skill") {
      removeStart = start - 1;
      skillTypesDestroyed.push(balls[start - 1].skillType);
    }
    if (balls[end + 1] && balls[end + 1].kind === "skill") {
      removeEnd = end + 1;
      skillTypesDestroyed.push(balls[end + 1].skillType);
    }

    const destroyedPositions = [];
    for (let i = removeStart; i <= removeEnd; i++) {
      const point = getBallPoint(balls[i]);
      point.skillType = balls[i] && balls[i].kind === "skill" ? balls[i].skillType : null;
      destroyedPositions.push(point);
    }

    const removedCount = removeEnd - removeStart + 1;
    balls.splice(removeStart, removedCount);
    for (const type of skillTypesDestroyed) activateSkill(type);

    playSound(sounds.destroy);
    createExplosionGroup(destroyedPositions);
    startScreenShake(12, 0.24);
    score += count * 100 + Math.max(0, count - 3) * 70 + skillTypesDestroyed.length * 250;

    if (!iceFreeze.active) pullFrontSegmentBack(removeStart, removedCount);

    const chainIndex = Math.min(removeStart, balls.length - 1);
    if (chainIndex > 0 && balls[chainIndex] && balls[chainIndex - 1] && balls[chainIndex].kind === "marble" && balls[chainIndex - 1].kind === "marble" && balls[chainIndex - 1].color === balls[chainIndex].color) {
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

function closeAllGapsBackward() {
  if (balls.length < 2) return;

  for (let i = 1; i < balls.length; i++) {
    const gap = balls[i - 1].distance - balls[i].distance - BALL_SPACING;
    if (gap > 0.1) {
      for (let j = 0; j < i; j++) {
        balls[j].distance -= gap;
      }
    }
  }
}

function getFireAimPoint() {
  const dx = mouse.x - shooter.x;
  const dy = mouse.y - shooter.y;
  const length = Math.hypot(dx, dy) || 1;
  const ux = dx / length;
  const uy = dy / length;
  const sx = shooter.x + ux * 45;
  const sy = shooter.y + uy * 45;

  let best = null;
  for (const ball of balls) {
    const p = getBallPoint(ball);
    const vx = p.x - sx;
    const vy = p.y - sy;
    const t = vx * ux + vy * uy;
    if (t < 0) continue;
    const px = sx + ux * t;
    const py = sy + uy * t;
    const side = Math.hypot(p.x - px, p.y - py);
    if (side <= BALL_RADIUS * 1.8 && (!best || t < best.t)) {
      best = { x: p.x, y: p.y, t };
    }
  }

  if (best) return best;

  const dist = Math.min(Math.hypot(mouse.x - sx, mouse.y - sy), 430);
  return { x: sx + ux * dist, y: sy + uy * dist, t: dist };
}

function updateFireAimFades(delta) {
  for (const item of fireAimFades) item.time -= delta;
  fireAimFades = fireAimFades.filter(item => item.time > 0);
}

function useFireSkillExplosion(x, y) {
  createSkillExplosion(x, y, "fire");
  showQuickWhiteFlash();
  startScreenShake(22, 0.34);

  const destroyedPositions = [];
  const activated = [];
  const kept = [];

  for (const ball of balls) {
    const p = getBallPoint(ball);
    if (Math.hypot(p.x - x, p.y - y) <= FIRE_SKILL_RADIUS) {
      p.skillType = ball.kind === "skill" ? ball.skillType : null;
      destroyedPositions.push(p);
      if (ball.kind === "skill") activated.push(ball.skillType);
    } else {
      kept.push(ball);
    }
  }

  if (destroyedPositions.length) {
    balls = kept;
    closeAllGapsBackward();
    for (const type of activated) activateSkill(type);
    createExplosionGroup(destroyedPositions);
    playSound(sounds.destroy, true);
    score += destroyedPositions.length * 120;
  }
}

function showQuickWhiteFlash() {
  const shell = document.getElementById("gameShell");
  if (!shell) return;
  const flash = document.createElement("img");
  flash.className = "quick-white-flash";
  flash.src = assetUrl("assets/sprites/White.png");
  shell.appendChild(flash);
  requestAnimationFrame(() => { flash.style.opacity = "0"; });
  window.setTimeout(() => flash.remove(), FIRE_FLASH_DURATION * 1000 + 90);
}

function createExplosionGroup(positions) {
  for (let i = 0; i < positions.length; i++) {
    if (i % 2 === 0 || positions.length <= 4 || positions[i].skillType) {
      if (positions[i].skillType) createDestroyedSkillMarbleExplosion(positions[i].x, positions[i].y, positions[i].skillType);
      else createExplosion(positions[i].x, positions[i].y);
    }
  }
}

function createDestroyedSkillMarbleExplosion(x, y, type) {
  const src = type === "ice" ? ICE_EXPLOSION_SRC : EXPLOSION_SRC;
  createExplosion(x, y, src, 1);
}

function createSkillExplosion(x, y, type) {
  const scale = type === "fire" ? FIRE_SKILL_EXPLOSION_SCALE : SKILL_EXPLOSION_SCALE;
  createExplosion(x, y, SKILL_EXPLOSION_SRC[type] || EXPLOSION_SRC, scale);
}

function createExplosion(x, y, src = EXPLOSION_SRC, scale = 1) {
  const rect = canvas.getBoundingClientRect();
  const size = ((EXPLOSION_SIZE * scale) / GAME_WIDTH) * rect.width;
  const screenX = (x / GAME_WIDTH) * rect.width;
  const screenY = (y / GAME_HEIGHT) * rect.height;

  const img = document.createElement("img");
  img.className = "explosion-gif";
  img.src = assetUrl(src);
  img.style.left = `${screenX}px`;
  img.style.top = `${screenY}px`;
  img.style.width = `${size}px`;
  img.style.height = `${size}px`;

  explosionLayer.appendChild(img);
  window.setTimeout(() => img.remove(), EXPLOSION_DURATION);
}



function triggerElectricSkill(hitIndex, x, y) {
  if (hitIndex < 0 || hitIndex >= balls.length) return;

  createSkillExplosion(x, y, "electric");
  showQuickWhiteFlash();
  playSound(sounds.electricSkillExplode, true);
  startScreenShake(13, 0.28);

  const removeSet = new Set([hitIndex]);
  const linkGroups = [];
  const explodeGroups = [[hitIndex]];

  for (let d = 1; d <= ELECTRIC_CHAIN_RANGE; d++) {
    const groupLinks = [];
    const groupExplode = [];
    const left = hitIndex - d;
    const right = hitIndex + d;

    if (left >= 0) {
      removeSet.add(left);
      groupExplode.push(left);
      groupLinks.push([left + 1, left]);
    }

    if (right < balls.length) {
      removeSet.add(right);
      groupExplode.push(right);
      groupLinks.push([right - 1, right]);
    }

    if (groupLinks.length) linkGroups.push(groupLinks);
    if (groupExplode.length) explodeGroups.push(groupExplode);
  }

  for (const ball of balls) {
    const drawDistance = typeof ball.visualDistance === "number" ? ball.visualDistance : ball.distance;
    ball.electricFreezeRoll = (drawDistance / BALL_RADIUS) + (ball.rollOffset || 0);
    ball.electricGone = false;
  }

  electricSkill = {
    active: true,
    links: [],
    pendingLinkGroups: linkGroups,
    remove: [...removeSet].sort((a, b) => a - b),
    explodeGroups,
    timer: 0,
    chainStep: 0,
    explodeStep: 0,
    exploding: false,
    wait: 0,
    done: false,
    startIndex: hitIndex
  };
}

function updateElectricSkill(delta) {
  if (!electricSkill.active) return;

  electricSkill.timer += delta;

  if (!electricSkill.exploding) {
    while (electricSkill.chainStep < electricSkill.pendingLinkGroups.length && electricSkill.timer >= (electricSkill.chainStep + 1) * ELECTRIC_CHAIN_STEP) {
      const group = electricSkill.pendingLinkGroups[electricSkill.chainStep];
      for (const pair of group) {
        electricSkill.links.push(pair);
        playSound(sounds.electricConnect, true);
      }
      electricSkill.chainStep++;
    }

    if (electricSkill.chainStep >= electricSkill.pendingLinkGroups.length) {
      electricSkill.wait += delta;
      if (electricSkill.wait >= 0.50) {
        electricSkill.exploding = true;
        electricSkill.timer = 0;
        electricSkill.explodeStep = 0;
      }
    }
    return;
  }

  while (electricSkill.explodeStep < electricSkill.explodeGroups.length && electricSkill.timer >= electricSkill.explodeStep * ELECTRIC_EXPLODE_STEP) {
    const group = electricSkill.explodeGroups[electricSkill.explodeStep];

    for (const idx of group) {
      const ball = balls[idx];
      if (!ball || ball.electricGone) continue;

      const p = getBallPoint(ball);
      createExplosion(p.x, p.y);
      playSound(sounds.destroy, true);
      ball.electricGone = true;
    }

    electricSkill.links = electricSkill.links.filter(pair => !group.includes(pair[0]) && !group.includes(pair[1]));
    electricSkill.explodeStep++;
  }

  if (electricSkill.explodeStep >= electricSkill.explodeGroups.length && !electricSkill.done) {
    electricSkill.done = true;
    window.setTimeout(() => {
      const activated = [];
      balls = balls.filter(ball => {
        if (!ball || !ball.electricGone) return true;
        if (ball.kind === "skill") activated.push(ball.skillType);
        return false;
      });
      for (const type of activated) activateSkill(type);
      closeAllGapsBackward();
      removeElectricLinkDom();
      for (const ball of balls) {
        delete ball.electricFreezeRoll;
        delete ball.electricGone;
      }
      electricSkill = { active: false, links: [], remove: [], timer: 0, chainStep: 0, explodeStep: 0, exploding: false, wait: 0, done: false, startIndex: -1 };
    }, 120);
  }
}

function removeElectricLinkDom() {
  for (const el of electricLinkEls) el.remove();
  electricLinkEls = [];
  if (electricStartEl) {
    electricStartEl.remove();
    electricStartEl = null;
  }
}

function updateElectricLinkDom() {
  const layer = document.getElementById("skillLayer");
  if (!layer || !electricSkill.active) {
    removeElectricLinkDom();
    return;
  }

  const rect = canvas.getBoundingClientRect();
  const sx = rect.width / GAME_WIDTH;
  const sy = rect.height / GAME_HEIGHT;

  while (electricLinkEls.length < electricSkill.links.length) {
    const img = document.createElement("img");
    img.className = "electric-link-gif";
    img.src = assetUrl(ELECTRIC_CONNECT_SRC);
    layer.appendChild(img);
    electricLinkEls.push(img);
  }
  while (electricLinkEls.length > electricSkill.links.length) {
    const img = electricLinkEls.pop();
    if (img) img.remove();
  }

  for (let i = 0; i < electricSkill.links.length; i++) {
    const pair = electricSkill.links[i];
    const a = balls[pair[0]];
    const b = balls[pair[1]];
    const img = electricLinkEls[i];

    if (!a || !b || a.electricGone || b.electricGone) {
      img.style.display = "none";
      continue;
    }

    const p1 = getBallDrawPosition(a);
    const p2 = getBallDrawPosition(b);
    const x1 = p1.x * sx;
    const y1 = p1.y * sy;
    const x2 = p2.x * sx;
    const y2 = p2.y * sy;
    const dx = x2 - x1;
    const dy = y2 - y1;
    const len = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx);
    const h = BALL_RADIUS * 1.75 * sy;

    img.style.display = "block";
    img.style.left = `${(x1 + x2) / 2}px`;
    img.style.top = `${(y1 + y2) / 2}px`;
    img.style.width = `${len + BALL_RADIUS * sx}px`;
    img.style.height = `${h}px`;
    img.style.transform = `translate(-50%, -50%) rotate(${angle}rad)`;
  }

  const startIndex = electricSkill.startIndex;
  const startBall = balls[startIndex];
  if (startBall && !startBall.electricGone) {
    if (!electricStartEl) {
      electricStartEl = document.createElement("img");
      electricStartEl.className = "electric-start-gif";
      electricStartEl.src = assetUrl(ELECTRIC_START_POINT_SRC);
      layer.appendChild(electricStartEl);
    }
    const p = getBallDrawPosition(startBall);
    electricStartEl.style.display = "block";
    electricStartEl.style.left = `${p.x * sx}px`;
    electricStartEl.style.top = `${p.y * sy}px`;
    electricStartEl.style.width = `${BALL_RADIUS * 3.2 * sx}px`;
    electricStartEl.style.height = `${BALL_RADIUS * 3.2 * sy}px`;
  } else if (electricStartEl) {
    electricStartEl.style.display = "none";
  }
}

function drawElectricLinks() {
  if (electricLinkEls.length) return;
  if (!electricSkill.active || !electricSkill.links || !electricSkill.links.length) return;

  ctx.save();
  ctx.shadowColor = "rgba(255, 235, 0, 1)";
  ctx.shadowBlur = 26;
  ctx.globalAlpha = electricSkill.exploding ? 0.75 : 1;

  for (const pair of electricSkill.links) {
    const a = balls[pair[0]];
    const b = balls[pair[1]];
    if (!a || !b || a.electricGone || b.electricGone) continue;

    const p1 = getBallDrawPosition(a);
    const p2 = getBallDrawPosition(b);
    const dx = p2.x - p1.x;
    const dy = p2.y - p1.y;
    const len = Math.hypot(dx, dy);
    const angle = Math.atan2(dy, dx);

    ctx.save();
    ctx.translate((p1.x + p2.x) / 2, (p1.y + p2.y) / 2);
    ctx.rotate(angle);

    const h = BALL_RADIUS * 1.4;
    if (electricConnectImage) {
      ctx.drawImage(electricConnectImage, -len / 2 - BALL_RADIUS * 0.25, -h / 2, len + BALL_RADIUS * 0.5, h);
    } else {
      ctx.strokeStyle = "rgba(255, 240, 0, 1)";
      ctx.lineWidth = 7;
      ctx.beginPath();
      ctx.moveTo(-len / 2, 0);
      ctx.lineTo(len / 2, 0);
      ctx.stroke();
    }

    ctx.restore();
  }

  ctx.restore();
}
function startIceFreeze() {
  iceFreeze.active = true;
  iceFreeze.time = ICE_FREEZE_DURATION;
  iceFreeze.duration = ICE_FREEZE_DURATION;
  iceFreeze.flash = ICE_FLASH_DURATION;
  iceFreeze.ending = false;
  iceFreeze.fadeOut = 0;
  iceFreeze.released = false;
  iceFreeze.releaseDelay = 0;
  iceThaw.active = false;

  for (const ball of balls) {
    const drawDistance = typeof ball.visualDistance === "number" ? ball.visualDistance : ball.distance;
    ball.freezeRoll = (drawDistance / BALL_RADIUS) + (ball.rollOffset || 0);
  }

  showIceFreezeDom();
}

function closeFrozenGapsBeforeRelease() {
  if (balls.length < 2) return;

  for (let i = 1; i < balls.length; i++) {
    const gap = balls[i - 1].distance - balls[i].distance - BALL_SPACING;

    if (gap > 0.1) {
      for (let j = 0; j < i; j++) {
        balls[j].distance -= gap;
      }
    }
  }
}

function updateIceFreeze(delta) {
  if (!iceFreeze.active) return;

  iceFreeze.flash = Math.max(0, iceFreeze.flash - delta);

  if (!iceFreeze.ending) {
    iceFreeze.time = Math.max(0, iceFreeze.time - delta);
    if (iceFreeze.time <= 0) {
      iceFreeze.ending = true;
      iceFreeze.fadeOut = 2.0;
      iceFreeze.releaseDelay = 0.55;
      closeFrozenGapsBeforeRelease();
      iceFreeze.released = false;
      iceThaw.active = false;
    }
  } else {
    iceFreeze.fadeOut = Math.max(0, iceFreeze.fadeOut - delta);

    if (!iceFreeze.released) {
      iceFreeze.releaseDelay = Math.max(0, iceFreeze.releaseDelay - delta);
      if (iceFreeze.releaseDelay <= 0) {
        iceFreeze.released = true;
        for (const ball of balls) delete ball.freezeRoll;
      }
    }

    if (iceFreeze.fadeOut <= 0) {
      iceFreeze.active = false;
      finishIceFreezeDom();
    }
  }

  updateIceFreezeDom();
}

function showIceFreezeDom() {
  const shell = document.getElementById("gameShell");
  if (!shell) return;

  let flash = document.getElementById("iceWhiteFlash");
  if (!flash) {
    flash = document.createElement("img");
    flash.id = "iceWhiteFlash";
    flash.src = assetUrl("assets/sprites/White.png");
    shell.appendChild(flash);
  }

  let screen = document.getElementById("iceFreezeScreen");
  if (!screen) {
    screen = document.createElement("img");
    screen.id = "iceFreezeScreen";
    screen.src = assetUrl("assets/sprites/Screenfreeze.png");
    shell.appendChild(screen);
  }

  let timer = document.getElementById("iceFreezeTimer");
  if (!timer) {
    timer = document.createElement("div");
    timer.id = "iceFreezeTimer";
    shell.appendChild(timer);
  }

  flash.classList.remove("hidden");
  screen.classList.remove("hidden", "fade-out");
  timer.classList.remove("hidden");
  updateIceFreezeDom();
}

function updateIceFreezeDom() {
  const flash = document.getElementById("iceWhiteFlash");
  const screen = document.getElementById("iceFreezeScreen");
  const timer = document.getElementById("iceFreezeTimer");

  if (flash) {
    const t = 1 - (iceFreeze.flash / ICE_FLASH_DURATION);
    flash.style.opacity = `${Math.max(0, Math.min(1, Math.sin(t * Math.PI) * 0.95))}`;
    if (iceFreeze.flash <= 0) flash.classList.add("hidden");
  }

  if (screen) {
    let opacity = 0.78;
    if (!iceFreeze.ending) {
      const fade = Math.min(1, (ICE_FREEZE_DURATION - iceFreeze.time) / 1.6);
      opacity = 0.78 * fade;
    } else {
      opacity = 0.78 * Math.max(0, Math.min(1, iceFreeze.fadeOut / 2.0));
    }
    screen.style.opacity = `${opacity}`;
  }

  if (timer) {
    const shownTime = iceFreeze.ending ? 0 : iceFreeze.time;
    timer.textContent = `${Math.ceil(shownTime)}`;
    timer.style.opacity = shownTime > 0 ? "0.96" : "0";
  }
}

function finishIceFreezeDom() {
  iceFreeze.time = 0;
  iceFreeze.flash = 0;
  iceFreeze.ending = false;
  iceFreeze.fadeOut = 0;

  const flash = document.getElementById("iceWhiteFlash");
  const screen = document.getElementById("iceFreezeScreen");
  const timer = document.getElementById("iceFreezeTimer");

  if (flash) flash.classList.add("hidden");
  if (timer) timer.classList.add("hidden");
  if (screen) {
    screen.style.opacity = "0";
    screen.classList.add("hidden");
  }
  for (const ball of balls) delete ball.freezeRoll;
  worldLayer.style.transform = "translate(0px, 0px)";
}

function endIceFreeze() {
  iceFreeze.active = false;
  finishIceFreezeDom();
}

function showGameOverOverlay() {
  const oldOverlay = document.getElementById("gameOverOverlay");
  if (oldOverlay) oldOverlay.remove();

  const overlay = document.createElement("img");
  overlay.id = "gameOverOverlay";
  overlay.src = assetUrl("assets/sprites/gameover.png");
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
  } else if (iceFreeze.active && iceFreeze.flash <= 0) {
    const x = (Math.random() * 2 - 1) * 1.8;
    const y = (Math.random() * 2 - 1) * 1.2;
    worldLayer.style.transform = `translate(${x}px, ${y}px)`;
  } else {
    worldLayer.style.transform = "translate(0px, 0px)";
  }
}


function gameOver() {
  endIceFreeze();
  stopGameMusic();
  gameEnded = true;
  paused = true;
  startScreenShake(30, 0.72);
  const hurtSound = playSound(sounds.hurt, true);
  const startGameOverMusic = () => { if (gameEnded) playGameOverMusic(); };
  if (hurtSound) {
    hurtSound.addEventListener("ended", startGameOverMusic, { once: true });
    window.setTimeout(startGameOverMusic, 1400);
  } else {
    window.setTimeout(startGameOverMusic, 700);
  }
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
    : `You cleared Impossible mode! Final Score: ${score}`;

  showMessage("Level Clear", text, {
    resume: false,
    retry: true,
    next: hasNext,
    menu: true
  });
  if (!hasNext) messagePanel.classList.add("level-clear-last-panel");
}

function draw() {
  ctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  sctx.clearRect(0, 0, GAME_WIDTH, GAME_HEIGHT);
  ctx.imageSmoothingEnabled = false;
  sctx.imageSmoothingEnabled = false;

  
  
  if (gameMode === "menu") {
    updateSkillDom(false);
    return;
  }

  drawTrack();
  drawBalls();
  drawElectricLinks();
  drawFireAimIndicators();
  drawStartGate();
  drawProjectile();

  updateCharacterSpritePosition();
  drawShooter();
  drawAimReticle();
  drawSkills();
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
    if (ball.electricGone) continue;
    const drawDistance = typeof ball.visualDistance === "number" ? ball.visualDistance : ball.distance;

    
    
    if (drawDistance < START_PORTAL_DISTANCE - BALL_RADIUS * 0.45) continue;
    if (drawDistance > pathLength + 50) continue;

    const p = getBallDrawPosition(ball);
    const rollAngle = electricSkill.active && typeof ball.electricFreezeRoll === "number"
      ? ball.electricFreezeRoll
      : (iceFreeze.active && !iceFreeze.released && typeof ball.freezeRoll === "number"
        ? ball.freezeRoll
        : (drawDistance / BALL_RADIUS) + (ball.rollOffset || 0));
    if (ball.kind === "skill") drawSkillBall(p.x, p.y, ball.skillType, BALL_RADIUS * 2.15, ctx, rollAngle);
    else drawMarble(p.x, p.y, ball.color, BALL_RADIUS * 2.15, ctx, rollAngle);
    if (iceFreeze.active && !iceFreeze.released) drawFrozenTint(p.x, p.y, BALL_RADIUS * 2.15);
  }
}

function drawFrozenTint(x, y, size) {
  ctx.save();
  ctx.globalCompositeOperation = "source-over";
  ctx.fillStyle = "rgba(85, 225, 255, 0.20)";
  ctx.shadowColor = "rgba(105, 235, 255, 1)";
  ctx.shadowBlur = size * 0.22;
  ctx.beginPath();
  ctx.arc(x, y, size * 0.48, 0, Math.PI * 2);
  ctx.fill();
  ctx.restore();
}

function drawFireAimIndicators() {
  if (loadedSkillShot === "fire" && !paused && !gameEnded && gameMode !== "menu") {
    const p = getFireAimPoint();
    drawFireAimImage(p.x, p.y, 0.95);
  }

  for (const item of fireAimFades) {
    const opacity = Math.max(0, item.time / item.duration);
    drawFireAimImage(item.x, item.y, opacity);
  }
}

function drawFireAimImage(x, y, opacity) {
  ctx.save();
  ctx.globalAlpha = opacity;
  ctx.shadowColor = "rgba(255, 125, 30, 0.9)";
  ctx.shadowBlur = 18;
  if (fireAimImage) {
    drawImageNoStretch(ctx, fireAimImage, x - FIRE_AIM_SIZE / 2, y - FIRE_AIM_SIZE / 2, FIRE_AIM_SIZE, FIRE_AIM_SIZE);
  } else {
    ctx.strokeStyle = "rgba(255, 125, 30, 0.9)";
    ctx.lineWidth = 5;
    ctx.beginPath();
    ctx.arc(x, y, FIRE_SKILL_RADIUS, 0, Math.PI * 2);
    ctx.stroke();
  }
  ctx.restore();
}

function drawProjectile() {
  if (!projectile) return;
  if (projectile.kind === "skill") drawSkillBall(projectile.x, projectile.y, projectile.skillType, BALL_RADIUS * 2.35, ctx, projectile.roll, true);
  else drawMarble(projectile.x, projectile.y, projectile.color, BALL_RADIUS * 2.05, ctx, projectile.roll);
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
  if (loadedSkillShot) drawSkillBall(nextX, nextY, loadedSkillShot, BALL_RADIUS * 2.65, sctx, 0, true);
  else {
    const gunEggSize = currentLevel && currentLevel.impossible ? BALL_RADIUS * 2.15 : BALL_RADIUS * 1.55;
    if (currentLevel && currentLevel.impossible) {
      sctx.save();
      sctx.shadowColor = "rgba(255,255,255,0.95)";
      sctx.shadowBlur = 12;
      drawMarble(nextX, nextY, nextColor, gunEggSize, sctx, 0);
      sctx.restore();
    } else {
      drawMarble(nextX, nextY, nextColor, gunEggSize, sctx, 0);
    }
  }
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
  const glow = loadedSkillShot ? getSkillGlow(loadedSkillShot) : getMarbleGlow(nextColor);

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


function getSkillGlow(type) {
  const info = SKILL_TYPES[type] || SKILL_TYPES.electric;
  return { shadow: info.glow, line: info.glow, fallback: info.glow };
}

function drawImageNoStretch(renderCtx, image, x, y, boxW, boxH) {
  if (!image) return;
  const iw = image.naturalWidth || image.width || boxW;
  const ih = image.naturalHeight || image.height || boxH;
  const scale = Math.min(boxW / iw, boxH / ih);
  const w = iw * scale;
  const h = ih * scale;
  renderCtx.drawImage(image, x + (boxW - w) / 2, y + (boxH - h) / 2, w, h);
}

function drawSkillBall(x, y, type, size, renderCtx = ctx, rotation = 0, shootLook = false) {
  const data = skillImages[type] || {};
  const image = shootLook ? data.shoot || data.icon : data.icon;
  const glow = getSkillGlow(type);
  const half = size / 2;
  const flicker = 0.74 + Math.sin(performance.now() / 360) * 0.18;

  renderCtx.save();

  const aura = renderCtx.createRadialGradient(x, y, half * 0.12, x, y, half * (shootLook ? 2.05 : 2.65));
  aura.addColorStop(0, glow.line.replace("1)", `${0.92 * flicker})`));
  aura.addColorStop(0.38, glow.line.replace("1)", `${0.55 * flicker})`));
  aura.addColorStop(1, "rgba(0, 0, 0, 0)");
  renderCtx.fillStyle = aura;
  renderCtx.beginPath();
  renderCtx.arc(x, y, half * (shootLook ? 2.0 : 2.55), 0, Math.PI * 2);
  renderCtx.fill();

  if (!shootLook) {
    renderCtx.strokeStyle = glow.line;
    renderCtx.lineWidth = Math.max(4, size * 0.09);
    renderCtx.shadowColor = glow.shadow;
    renderCtx.shadowBlur = 30 * flicker;
    renderCtx.beginPath();
    renderCtx.arc(x, y, half * 1.02, 0, Math.PI * 2);
    renderCtx.stroke();
  }

  renderCtx.shadowColor = glow.shadow;
  renderCtx.shadowBlur = shootLook ? 18 * flicker : 48 * flicker;

  if (image) {
    renderCtx.translate(x, y);
    renderCtx.rotate(rotation);
    drawImageNoStretch(renderCtx, image, -half, -half, size, size);
  } else {
    renderCtx.fillStyle = glow.fallback;
    renderCtx.beginPath();
    renderCtx.arc(x, y, half, 0, Math.PI * 2);
    renderCtx.fill();
  }
  renderCtx.restore();
}

function getSkillSlots() {
  const startX = 300;
  const y = 393;

  return SKILL_ORDER.map((type, i) => ({
    type,
    x: startX + i * SKILL_SLOT_GAP,
    y,
    size: SKILL_SIZE
  }));
}

function getSkillAtPoint(x, y) {
  for (const slot of getSkillSlots()) {
    if (Math.abs(x - slot.x) <= slot.size / 2 && Math.abs(y - slot.y) <= slot.size / 2) return slot.type;
  }
  return null;
}

function updateSkillDom(show = true) {
  const rect = canvas.getBoundingClientRect();
  const sx = rect.width / GAME_WIDTH;
  const sy = rect.height / GAME_HEIGHT;

  if (!show) {
    for (const type of SKILL_ORDER) {
      const el = skillSlotEls[type];
      if (el) el.classList.add("hidden");
    }
    if (skillTooltipEl) skillTooltipEl.classList.add("hidden");
    return;
  }

  const now = performance.now();
  const hovered = getSkillAtPoint(mouse.x, mouse.y);
  if (hovered !== skillHover.type) skillHover = { type: hovered, time: now / 1000 };

  for (const slot of getSkillSlots()) {
    const el = skillSlotEls[slot.type];
    if (!el) continue;

    const active = skillStates[slot.type] && skillStates[slot.type].active;
    const loadedHere = loadedSkillShot === slot.type;
    const hoveredSlot = hovered === slot.type;
    const info = SKILL_TYPES[slot.type];

    el.classList.remove("hidden", "active-skill", "hover-skill", "cancel-skill-hover");
    if (active || loadedHere) el.classList.add("active-skill");
    if (active && hoveredSlot) el.classList.add("hover-skill");
    if (loadedHere && hoveredSlot) el.classList.add("cancel-skill-hover");

    const wantedSrc = (active || loadedHere) ? info.active : info.inactive;
    if (el.dataset.src !== wantedSrc) {
      el.src = "";
      el.src = assetUrl(wantedSrc);
      el.dataset.src = wantedSrc;
    }

    el.style.left = `${slot.x * sx}px`;
    el.style.top = `${slot.y * sy}px`;
    el.style.height = `${slot.size * sy}px`;
    el.style.width = "auto";
    el.style.setProperty("--skill-glow", info.glow);
  }

  if (hovered && (now / 1000 - skillHover.time) >= SKILL_HOVER_DELAY) showSkillTooltip(hovered, rect);
  else if (skillTooltipEl) skillTooltipEl.classList.add("hidden");
}

function drawSkills() {
  updateSkillDom(true);
}

function showSkillTooltip(type, rect) {
  const info = SKILL_TYPES[type];
  if (!info || !skillTooltipEl) return;

  skillTooltipName.textContent = info.name;
  skillTooltipDesc.textContent = info.desc;
  skillTooltipEl.style.setProperty("--skill-name-glow", info.glow);

  const sx = rect.width / GAME_WIDTH;
  const sy = rect.height / GAME_HEIGHT;
  skillTooltipEl.style.left = `${215 * sx}px`;
  skillTooltipEl.style.top = `${461 * sy}px`;
  skillTooltipEl.style.width = `${455 * sx}px`;
  skillTooltipEl.style.minHeight = `${118 * sy}px`;
  skillTooltipEl.classList.remove("hidden");
}

function wrapCanvasTextCentered(renderCtx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (renderCtx.measureText(test).width > maxWidth && line) {
      renderCtx.fillText(line, x, y);
      line = word;
      y += lineHeight;
    } else line = test;
  }
  if (line) renderCtx.fillText(line, x, y);
}

function wrapCanvasText(renderCtx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (renderCtx.measureText(test).width > maxWidth && line) {
      renderCtx.fillText(line, x, y);
      line = word;
      y += lineHeight;
    } else line = test;
  }
  if (line) renderCtx.fillText(line, x, y);
}

function updateSkillCancelTip() {
  if (!skillCancelTip) return;
  if (loadedSkillShot) {
    const slot = getSkillSlots().find(s => s.type === loadedSkillShot);
    const rect = canvas.getBoundingClientRect();
    const sx = rect.width / GAME_WIDTH;
    const sy = rect.height / GAME_HEIGHT;
    if (slot) {
      skillCancelTip.style.left = `${slot.x * sx}px`;
      skillCancelTip.style.top = `${(slot.y - slot.size * 0.72) * sy}px`;
    }
    skillCancelTip.textContent = isTouchDevice() ? "Tap here to Cancel" : "Click here to Cancel";
    skillCancelTip.classList.remove("hidden");
  } else {
    skillCancelTip.classList.add("hidden");
  }
}

function cancelLoadedSkill() {
  if (!loadedSkillShot) return;
  const type = loadedSkillShot;
  loadedSkillShot = null;
  if (skillStates[type]) skillStates[type].active = true;
  updateSkillCancelTip();
}

function useSkill(type) {
  if (!skillStates[type] || !skillStates[type].active || projectile) return false;
  skillStates[type].active = false;
  loadedSkillShot = type;
  updateSkillCancelTip();
  return true;
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
  
  overlay.style.backgroundImage = `url("${assetUrl("assets/sprites/black.png")}")`;
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
  mouse = getMousePosition(event);
}, { passive: false });

canvas.addEventListener("pointerdown", (event) => {
  if (event.pointerType === "touch") event.preventDefault();
  mouse = getMousePosition(event);
  const skill = getSkillAtPoint(mouse.x, mouse.y);
  if (loadedSkillShot && skill === loadedSkillShot) {
    cancelLoadedSkill();
    return;
  }
  if (skill && useSkill(skill)) return;
  shoot();
}, { passive: false });

canvas.addEventListener("contextmenu", (event) => event.preventDefault());

pauseBtn.addEventListener("click", () => {
  if (gameEnded) retryCurrentRun();
  else setPaused(!paused);
});

resumeBtn.addEventListener("click", () => setPaused(false));
retryBtn.addEventListener("click", retryCurrentRun);
nextLevelBtn.addEventListener("click", startNextLevel);
menuBtn.addEventListener("click", () => startWithScreenTransition(showMainMenu));
if (skillCancelTip) skillCancelTip.addEventListener("click", (event) => { event.stopPropagation(); cancelLoadedSkill(); });


function setupButtonClickSounds() {
  if (buttonClickSoundsReady) return;
  buttonClickSoundsReady = true;
  document.addEventListener("click", (event) => {
    const clickable = event.target.closest("button, .credits-link, .volume-slider");
    if (!clickable || clickable.disabled) return;
    playSound(sounds.click);
  });
}

if (settingsOpenBtn) settingsOpenBtn.addEventListener("click", () => showSettingsPanel("menu"));
if (settingsPauseBtn) settingsPauseBtn.addEventListener("click", () => showSettingsPanel("pause"));
if (settingsReturnBtn) settingsReturnBtn.addEventListener("click", returnFromSettings);
if (creditsOpenBtn) creditsOpenBtn.addEventListener("click", showCreditsPanel);
if (creditsReturnBtn) creditsReturnBtn.addEventListener("click", () => { hideCreditsPanel(); if (settingsPanel) settingsPanel.classList.remove("hidden"); });
if (creditsPanel) creditsPanel.addEventListener("click", (event) => {
  if (event.target === creditsPanel) {
    hideCreditsPanel();
    if (settingsPanel) settingsPanel.classList.remove("hidden");
  }
});

levelModeBtn.addEventListener("click", () => {
  hideCreditsPanel();
  hideSettingsPanel();
  mainMenu.classList.add("hidden");
  levelSelect.classList.remove("hidden");
});

infiniteModeBtn.addEventListener("click", () => {
  hideCreditsPanel();
  hideSettingsPanel();
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
    if (settingsPanel) settingsPanel.classList.remove("hidden");
    return;
  }
  if (event.key === "Escape" && settingsPanel && !settingsPanel.classList.contains("hidden")) {
    returnFromSettings();
    return;
  }
  if (event.key === "Escape" && gameMode !== "menu") setPaused(true);
});

function isTouchDevice() {
  return window.matchMedia("(pointer: coarse)").matches || navigator.maxTouchPoints > 0;
}

function fitGameToViewport() {
  if (!gameShell) return;
  const viewport = window.visualViewport;
  const viewportWidth = Math.max(1, viewport ? viewport.width : window.innerWidth);
  const viewportHeight = Math.max(1, viewport ? viewport.height : window.innerHeight);
  const scale = Math.min(viewportWidth / GAME_WIDTH, viewportHeight / GAME_HEIGHT);
  gameShell.style.width = `${Math.max(1, GAME_WIDTH * scale)}px`;
  gameShell.style.height = `${Math.max(1, GAME_HEIGHT * scale)}px`;
}

function updateOrientationLock() {
  const locked = isTouchDevice() && window.matchMedia("(orientation: portrait)").matches;
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

function updateMobilePresentation() {
  fitGameToViewport();
  updateOrientationLock();
  if (skillCancelTip && isTouchDevice() && loadedSkillShot) skillCancelTip.textContent = "Tap here to Cancel";
}

window.addEventListener("resize", updateMobilePresentation);
window.addEventListener("orientationchange", () => window.setTimeout(updateMobilePresentation, 80));
if (window.visualViewport) window.visualViewport.addEventListener("resize", updateMobilePresentation);

async function start() {
  updateMobilePresentation();
  const resourcesReady = await preloadAllResources();
  if (!resourcesReady) return;

  buildPath();
  await loadAssets();
  setupButtonClickSounds();

  if (!volumeSlidersReady) {
    volumeSlidersReady = true;
    setupVolumeSlider("music", musicVolumeSlider, musicVolumeKnob);
    setupVolumeSlider("sfx", sfxVolumeSlider, sfxVolumeKnob);
  }
  updateVolumeSliderUI("music");
  updateVolumeSliderUI("sfx");
  updateMobilePresentation();
  showStartScreen();
  hideLoadingScreen();

  if (window.location.search.includes("autostart=1")) {
    if (startScreen) startScreen.classList.add("hidden");
    startLevel(0);
  }

  lastTime = performance.now();
  if (!gameLoopStarted) {
    gameLoopStarted = true;
    requestAnimationFrame(loop);
  }
}

if (loadingRetryBtn) {
  loadingRetryBtn.addEventListener("click", () => start());
}

start();