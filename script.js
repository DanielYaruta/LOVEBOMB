const timerDisplay = document.getElementById('timerDisplay');
const messageLine = document.getElementById('messageLine');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const minutesSelect = document.getElementById('minutesSelect');
const heartBurst = document.getElementById('heartBurst');
const heartRain = document.getElementById('heartRain');

const messages = [
  'Love is coming...',
  'The universe is preparing a surprise...',
  'Brace yourself, emotions are about to detonate...',
  'Love is getting closer with every second...',
  'Tick-tock, love wont wait...'
];

const BURST_HEART_COUNT = 200;
const RAIN_HEART_COUNT = 100;
const MESSAGE_VISIBLE_MS = 2500;

let intervalId = null;
let totalSeconds = 0;
let messageIndex = 0;
let messageTimeoutId = null;

function fillMinuteOptions() {
  for (let i = 1; i <= 10; i++) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = `${i} мин`;
    if (i === 5) option.selected = true;
    minutesSelect.appendChild(option);
  }
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
}

function showScreenMessage(text) {
  clearTimeout(messageTimeoutId);
  messageLine.textContent = text;
  messageLine.classList.add('visible');

  messageTimeoutId = setTimeout(() => {
    messageLine.classList.remove('visible');
  }, MESSAGE_VISIBLE_MS);
}

function startCountdown(minutes) {
  totalSeconds = minutes * 60;
  messageIndex = 0;

  timerDisplay.classList.remove('done');
  timerDisplay.textContent = formatTime(totalSeconds);
  messageLine.classList.remove('visible');

  startBtn.disabled = true;
  minutesSelect.disabled = true;
  resetBtn.disabled = false;

  intervalId = setInterval(() => {
    totalSeconds--;

    if (totalSeconds >= 0) {
      timerDisplay.textContent = formatTime(totalSeconds);
    }

    const aMinutePassed = totalSeconds > 0 && totalSeconds % 60 === 0;
    if (aMinutePassed) {
      const msg = messages[messageIndex % messages.length];
      messageIndex++;
      showScreenMessage(msg);
    }

    if (totalSeconds <= 0) {
      clearInterval(intervalId);
      timerDisplay.classList.add('done');
      timerDisplay.textContent = 'BOOM!';
      showScreenMessage('Love Exploded!');
      triggerHeartBurst();
      triggerHeartRain();
    }
  }, 1000);
}

function resetCountdown() {
  clearInterval(intervalId);
  clearTimeout(messageTimeoutId);

  timerDisplay.classList.remove('done');
  timerDisplay.textContent = formatTime(parseInt(minutesSelect.value, 10) * 60);
  messageLine.classList.remove('visible');
  messageLine.textContent = '';

  startBtn.disabled = false;
  minutesSelect.disabled = false;
  resetBtn.disabled = true;

  heartBurst.innerHTML = '';
  heartRain.innerHTML = '';
}

function triggerHeartBurst() {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < BURST_HEART_COUNT; i++) {
    const heart = document.createElement('div');
    heart.className = 'burst-heart';
    heart.textContent = '♥';

    const angle = Math.random() * Math.PI * 2;
    const distance = 120 + Math.random() * 480;
    const dx = Math.cos(angle) * distance;
    const dy = Math.sin(angle) * distance;

    heart.style.setProperty('--dx', dx + 'px');
    heart.style.setProperty('--dy', dy + 'px');
    heart.style.setProperty('--rot', (Math.random() * 720 - 360) + 'deg');
    heart.style.fontSize = (8 + Math.random() * 20) + 'px';
    heart.style.animationDuration = (0.8 + Math.random() * 1.2) + 's';
    heart.style.animationDelay = (Math.random() * 0.3) + 's';

    fragment.appendChild(heart);
  }

  heartBurst.appendChild(fragment);
}

function triggerHeartRain() {
  const fragment = document.createDocumentFragment();

  for (let i = 0; i < RAIN_HEART_COUNT; i++) {
    const heart = document.createElement('div');
    heart.className = 'rain-heart';
    heart.textContent = '♥';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.fontSize = (10 + Math.random() * 22) + 'px';
    heart.style.animationDuration = (2 + Math.random() * 2.5) + 's';
    heart.style.animationDelay = (Math.random() * 2) + 's';

    fragment.appendChild(heart);
  }

  heartRain.appendChild(fragment);
}

startBtn.addEventListener('click', () => {
  const minutes = parseInt(minutesSelect.value, 10);
  startCountdown(minutes);
});

resetBtn.addEventListener('click', resetCountdown);

minutesSelect.addEventListener('change', () => {
  timerDisplay.textContent = formatTime(parseInt(minutesSelect.value, 10) * 60);
});

fillMinuteOptions();
timerDisplay.textContent = formatTime(parseInt(minutesSelect.value, 10) * 60);
