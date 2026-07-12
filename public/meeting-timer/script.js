'use strict';

/* ===== State ===== */
let timeLeft = 0;          // seconds
let isRunning = false;
let alarmActive = false;
let timerInterval = null;
let alarmIntervalId = null;
let audioCtx = null;
let appData = { jokes: [], wisdom: [] };
let blinkTimerId = null;

/* ===== Data load ===== */
fetch('/meeting-timer/data.json')
  .then(r => r.json())
  .then(d => { appData = d; })
  .catch(() => {
    // fallback if fetch fails
    appData = {
      jokes: ['布団がふっとんだ！', 'アルミ缶の上にあるみかん。', '会議の終わり？じゃあケツ論だな。'],
      wisdom: ['「完璧を目指すより、まず終わらせろ。Done is better than perfect。」']
    };
  });

/* ===== Audio Context ===== */
function getCtx() {
  if (!audioCtx) {
    audioCtx = new (window.AudioContext || window.webkitAudioContext)();
  }
  // Resume if suspended (browser autoplay policy)
  if (audioCtx.state === 'suspended') audioCtx.resume();
  return audioCtx;
}

function playTone(freq, type, startTime, duration, volume = 0.25) {
  const ctx = getCtx();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = type;
  osc.frequency.value = freq;
  gain.gain.setValueAtTime(volume, startTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
  osc.start(startTime);
  osc.stop(startTime + duration + 0.02);
}

function playAlarmBeep() {
  const ctx = getCtx();
  const now = ctx.currentTime;
  playTone(880, 'square', now,        0.18, 0.3);
  playTone(660, 'square', now + 0.28, 0.18, 0.25);
}

function startAlarmSound() {
  playAlarmBeep();
  alarmIntervalId = setInterval(playAlarmBeep, 750);
}

function stopAlarmSound() {
  if (alarmIntervalId) {
    clearInterval(alarmIntervalId);
    alarmIntervalId = null;
  }
}

function playWindSound() {
  const ctx = getCtx();
  const sec = 2.5;
  const buf = ctx.createBuffer(1, ctx.sampleRate * sec, ctx.sampleRate);
  const data = buf.getChannelData(0);
  for (let i = 0; i < data.length; i++) data[i] = (Math.random() * 2 - 1) * 0.4;

  const src = ctx.createBufferSource();
  src.buffer = buf;

  const hpf = ctx.createBiquadFilter();
  hpf.type = 'highpass';
  hpf.frequency.value = 700;

  const gain = ctx.createGain();
  const now = ctx.currentTime;
  gain.gain.setValueAtTime(0.6, now);
  gain.gain.linearRampToValueAtTime(0, now + sec);

  src.connect(hpf);
  hpf.connect(gain);
  gain.connect(ctx.destination);
  src.start(now);
}

function playJokeSound() {
  const ctx = getCtx();
  const now = ctx.currentTime;
  // Wah-wah descending
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.type = 'sawtooth';
  osc.frequency.setValueAtTime(420, now);
  osc.frequency.linearRampToValueAtTime(220, now + 0.35);
  osc.frequency.linearRampToValueAtTime(310, now + 0.55);
  osc.frequency.linearRampToValueAtTime(110, now + 1.0);
  gain.gain.setValueAtTime(0.18, now);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.1);
  osc.start(now);
  osc.stop(now + 1.1);
}

function playWisdomSound() {
  const ctx = getCtx();
  // C major arpeggio chime
  [523.25, 659.25, 783.99, 1046.50].forEach((freq, i) => {
    const t = ctx.currentTime + i * 0.18;
    playTone(freq, 'sine', t, 1.2, 0.22);
  });
}

/* ===== Timer ===== */
function addTime(minutes) {
  // Resume audio context on first user gesture
  getCtx();
  timeLeft += minutes * 60;
  updateDisplay();
  if (!alarmActive) {
    setBubble('やる気満々だな！<small>スタートを押してくれ</small>');
    if (!isRunning) setCatState('idle');
  }
}

function handleStartBtn() {
  if (alarmActive) {
    // ストップ（アラーム解除 → 一言表示）
    stopAlarmNow();
  } else if (isRunning) {
    pauseTimer();
  } else {
    if (timeLeft > 0) startTimer();
  }
}

function startTimer() {
  isRunning = true;
  updateStartBtn();
  setCatState('running');
  setBubble('会議スタート！<small>いってらっしゃい！</small>');
  setStatus('running', '⏱ カウントダウン中...');

  timerInterval = setInterval(() => {
    if (timeLeft > 0) {
      timeLeft--;
      updateDisplay();
      // Warn at 1 minute left
      if (timeLeft === 60 && !alarmActive) {
        setBubble('あと1分だぞ！<small>そろそろまとめろ！</small>');
      }
      if (timeLeft === 10 && !alarmActive) {
        setBubble('10秒！<small>ケツ論を言え！</small>');
      }
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      isRunning = false;
      onTimerEnd();
    }
  }, 1000);
}

function pauseTimer() {
  isRunning = false;
  clearInterval(timerInterval);
  timerInterval = null;
  updateStartBtn();
  setCatState('idle');
  setStatus('', '⏸ 一時停止中');
  setBubble('ちょっと休憩か？<small>スタートで再開するぞ</small>');
}

function resetTimer() {
  if (alarmActive) stopAlarmSound();
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
  alarmActive = false;
  isRunning = false;
  timeLeft = 0;
  updateDisplay();
  updateStartBtn();
  setCatState('idle');
  setStatus('', '時間をセットしてください');
  setBubble('会議を始めましょう！<small>時間をセットしてください</small>');
}

function onTimerEnd() {
  alarmActive = true;
  startAlarmSound();
  setCatState('alarm');
  setStatus('alarm', '⏰ 時間です！ストップを押してください');
  setBubble('時間だ！！<small>ストップを押してくれ！</small>');
  updateStartBtn();
  // Flash timer red
  document.getElementById('timerDisplay').classList.add('alarm-pulse');
}

function stopAlarmNow() {
  stopAlarmSound();
  alarmActive = false;
  document.getElementById('timerDisplay').classList.remove('alarm-pulse');
  updateStartBtn();
  setStatus('', '');
  // Wind effect then show remark
  playWindSound();
  setTimeout(() => showRemark(), 600);
}

/* ===== Closing remark (強制終了) ===== */
function showClosingRemark() {
  getCtx(); // ensure audio context
  if (alarmActive) stopAlarmSound();
  if (timerInterval) { clearInterval(timerInterval); timerInterval = null; }
  alarmActive = false;
  isRunning = false;
  document.getElementById('timerDisplay').classList.remove('alarm-pulse');
  updateStartBtn();
  playWindSound();
  setTimeout(() => showRemark(), 600);
}

/* ===== Remark picker ===== */
function showRemark() {
  const isWisdom = Math.random() < 0.09; // 9% chance
  const pool = isWisdom ? appData.wisdom : appData.jokes;
  const text = pool[Math.floor(Math.random() * pool.length)] || 'また会おう！';
  openModal(isWisdom, text);
}

/* ===== Modal ===== */
function openModal(isWisdom, text) {
  const overlay = document.getElementById('modal');
  const box = document.getElementById('modalBox');
  const badge = document.getElementById('modalBadge');
  const modalImg = document.getElementById('modalImg');
  const msgEl = document.getElementById('modalText');

  msgEl.textContent = text;

  // モーダル用のランダム猫写真
  if (modalImg) modalImg.src = randomCatImg();

  if (isWisdom) {
    badge.textContent = '✨ 今日のいい話';
    badge.className = 'modal-badge wisdom';
    box.className = 'modal-box wisdom-mode';
    setCatState('wisdom');
    setBubble('今日はいいことを言うぞ！');
    playWisdomSound();
  } else {
    badge.textContent = '🐱 おやじギャグ（AI生成）';
    badge.className = 'modal-badge';
    box.className = 'modal-box';
    setCatState('joke');
    setBubble('いくぞ！ダジャレだ！');
    playJokeSound();
  }

  overlay.classList.add('show');
}

function closeModal() {
  document.getElementById('modal').classList.remove('show');
  setCatState('idle');
  timeLeft = 0;
  updateDisplay();
  setStatus('', '時間をセットしてください');
  setBubble('お疲れ様でした！<small>また会議しようぞ</small>');
}

/* ===== UI helpers ===== */
function updateDisplay() {
  const m = Math.floor(timeLeft / 60).toString().padStart(2, '0');
  const s = (timeLeft % 60).toString().padStart(2, '0');
  document.getElementById('timerDisplay').textContent = `${m}:${s}`;
}

function updateStartBtn() {
  const btn = document.getElementById('startBtn');
  if (alarmActive) {
    btn.textContent = 'ストップ ■';
    btn.className = 'btn btn-start alarm-mode';
  } else if (isRunning) {
    btn.textContent = '⏸ ポーズ';
    btn.className = 'btn btn-start';
  } else {
    btn.textContent = '▶ スタート';
    btn.className = 'btn btn-start';
  }
}

function setStatus(type, msg) {
  const el = document.getElementById('timerStatus');
  el.textContent = msg;
  el.className = 'timer-status' + (type ? ' ' + type : '');
}

function setBubble(html) {
  document.getElementById('bubbleText').innerHTML = html;
}

/* ===== Cat images ===== */
const CAT_IMGS = Array.from({length: 12}, (_, i) => `/meeting-timer/cat_pic/cat${i+1}.png`);

// Preload all images on startup
function preloadCatImages() {
  CAT_IMGS.forEach(src => { const img = new Image(); img.src = src; });
}

function randomCatImg(exclude = null) {
  const pool = exclude ? CAT_IMGS.filter(s => s !== exclude) : CAT_IMGS;
  return pool[Math.floor(Math.random() * pool.length)];
}

/* ===== Cat state ===== */
function setCatState(state) {
  const container = document.getElementById('catContainer');
  container.className = `cat-container state-${state}`;

  const mainImg = document.getElementById('catImg');
  if (!mainImg) return;

  switch (state) {
    case 'idle':
    case 'running':
      mainImg.src = '/meeting-timer/cat_pic/cat1.png';
      break;
    case 'alarm':
    case 'joke':
    case 'wisdom':
      mainImg.src = randomCatImg('/meeting-timer/cat_pic/cat1.png');
      break;
  }
}

/* ===== Init ===== */
document.addEventListener('DOMContentLoaded', () => {
  preloadCatImages();
  setCatState('idle');
  updateDisplay();
  updateStartBtn();
});
