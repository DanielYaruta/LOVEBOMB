const timerDisplay = document.getElementById('timerDisplay');
const startBtn = document.getElementById('startBtn');
const resetBtn = document.getElementById('resetBtn');
const minutesSelect = document.getElementById('minutesSelect');
const heartBurst = document.getElementById('heartBurst');

const messages = [
  'Love is coming...',
  'Сердце уже на подходе...',
  'Готовься, чувства взрываются...',
  'Любовь приближается с каждой секундой...',
  'Tick-tock, любовь не ждёт...'
];

let intervalId = null;
let totalSeconds = 0;
let initialSeconds = 0;
let messageIndex = 0;

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${minutes}:${secs < 10 ? '0' + secs : secs}`;
}

function startCountdown(minutes) {
  totalSeconds = minutes * 60;
  initialSeconds = totalSeconds;
  messageIndex = 0;

  timerDisplay.classList.remove('done');
  timerDisplay.textContent = formatTime(totalSeconds);

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
      alert(msg);
    }

    if (totalSeconds <= 0) {
      clearInterval(intervalId);
      timerDisplay.classList.add('done');
      timerDisplay.textContent = 'Бум!';
      triggerHeartExplosion();
    }
  }, 1000);
}

function resetCountdown() {
  clearInterval(intervalId);
  timerDisplay.classList.remove('done');
  timerDisplay.textContent = formatTime(parseInt(minutesSelect.value, 10) * 60);

  startBtn.disabled = false;
  minutesSelect.disabled = false;
  resetBtn.disabled = true;

  heartBurst.innerHTML = '';
}

function triggerHeartExplosion() {
  const heartCount = 40;

  for (let i = 0; i < heartCount; i++) {
    const heart = document.createElement('div');
    heart.className = 'falling-heart';
    heart.textContent = '♥';
    heart.style.left = Math.random() * 100 + '%';
    heart.style.animationDuration = (2 + Math.random() * 2) + 's';
    heart.style.animationDelay = (Math.random() * 1.2) + 's';
    heart.style.fontSize = (16 + Math.random() * 26) + 'px';
    heartBurst.appendChild(heart);
  }
}

startBtn.addEventListener('click', () => {
  const minutes = parseInt(minutesSelect.value, 10);
  startCountdown(minutes);
});

resetBtn.addEventListener('click', resetCountdown);

minutesSelect.addEventListener('change', () => {
  timerDisplay.textContent = formatTime(parseInt(minutesSelect.value, 10) * 60);
});

timerDisplay.textContent = formatTime(parseInt(minutesSelect.value, 10) * 60);
