import { HARDWARE_ITEMS } from '../data/hardwareData.js';
import { soundFX } from '../audio/soundEffects.js';
import { speechManager } from '../audio/speechManager.js';
import confetti from 'canvas-confetti';

export function renderAquariumGame(container, onScoreAwarded) {
  let questions = [];
  let currentQIndex = 0;
  let score = 0;
  let streak = 0;
  let bubbles = [];
  let animationId = null;
  let isAnswerLocked = false;

  function initGame() {
    const shuffled = [...HARDWARE_ITEMS].sort(() => 0.5 - Math.random());
    questions = shuffled.slice(0, 10);
    currentQIndex = 0;
    score = 0;
    streak = 0;
    isAnswerLocked = false;

    renderGameShell();
    loadQuestion();
  }

  function renderGameShell() {
    container.innerHTML = `
      <div class="aquarium-game-wrapper">
        <!-- Üst Soru Paneli -->
        <div class="aquarium-question-card">
          <div class="q-card-top">
            <div class="q-badge">🐠 Akvaryum Görevi: Soru <span id="q-index-val">1</span> / 10</div>
            <div class="q-stats">
              <span class="stat-bubble">⭐ Puan: <strong id="aq-score">${score}</strong></span>
              <span class="stat-bubble">🔥 Seri: <strong id="aq-streak">${streak}</strong></span>
            </div>
            <button class="tts-small-btn" id="btn-read-question" title="Soruyu Sesli Oku">
              <span>🗣️ Oku</span>
            </button>
          </div>

          <div class="q-definition-content">
            <h3 class="q-prompt-title">Aşağıdaki tanıma uyan gerçek donanım baloncuğuna tıkla:</h3>
            <p class="q-definition-text" id="q-text">Tanım yükleniyor...</p>
          </div>
        </div>

        <!-- Akvaryum Sahnesi -->
        <div class="aquarium-tank" id="aquarium-tank">
          <!-- Güneş Işığı Huzmeleri -->
          <div class="sun-rays"></div>

          <!-- Taban Deniz Bitkileri -->
          <div class="seaweed seaweed-1">🌿</div>
          <div class="seaweed seaweed-2">🪸</div>
          <div class="seaweed seaweed-3">🌿</div>
          <div class="seaweed seaweed-4">🪸</div>

          <!-- Yüzen Baloncuklar Konteyneri -->
          <div class="bubbles-container" id="bubbles-container"></div>

          <!-- Anlık Geri Bildirim Toastı -->
          <div class="aquarium-feedback-banner hidden" id="aquarium-feedback"></div>
        </div>

        <!-- Oyun Sonu Tamamlama Kartı -->
        <div class="round-complete-card hidden" id="aquarium-complete-card">
          <div class="complete-inner">
            <div class="trophy-bounce">🌊</div>
            <h3>Harika Bir Dalgıçsın!</h3>
            <p>Akvaryumdaki tüm donanım parçalarını başarıyla tanıdın ve topladın!</p>
            <div class="complete-score-show">Toplam Skor: <strong id="final-aq-score">0</strong> ⭐</div>
            <button class="btn-play-again" id="btn-replay-aq">🎉 Tekrar Oyna</button>
          </div>
        </div>
      </div>
    `;

    container.querySelector('#btn-read-question').addEventListener('click', () => {
      const q = questions[currentQIndex];
      if (q) {
        soundFX.playClick();
        speechManager.speak(`Aşağıdaki tanıma uyan donanım hangisidir? ${q.description}`);
      }
    });

    container.querySelector('#btn-replay-aq').addEventListener('click', () => {
      soundFX.playClick();
      initGame();
    });
  }

  function loadQuestion() {
    if (currentQIndex >= questions.length) {
      endGame();
      return;
    }

    isAnswerLocked = false;
    const currentQ = questions[currentQIndex];

    const qIndexEl = container.querySelector('#q-index-val');
    const qTextEl = container.querySelector('#q-text');
    const feedbackBanner = container.querySelector('#aquarium-feedback');
    const bubblesContainer = container.querySelector('#bubbles-container');

    qIndexEl.textContent = currentQIndex + 1;
    qTextEl.textContent = `"${currentQ.description}"`;
    feedbackBanner.classList.add('hidden');
    bubblesContainer.innerHTML = '';

    speechManager.speak(currentQ.shortDescription || currentQ.description);

    const distractors = HARDWARE_ITEMS
      .filter(item => item.id !== currentQ.id)
      .sort(() => 0.5 - Math.random())
      .slice(0, 3);

    const candidates = [currentQ, ...distractors].sort(() => 0.5 - Math.random());

    const tank = container.querySelector('#aquarium-tank');
    const tankWidth = tank.clientWidth || 800;
    const tankHeight = tank.clientHeight || 450;

    bubbles = candidates.map((item, idx) => {
      const bubbleEl = document.createElement('div');
      bubbleEl.className = 'hardware-bubble';
      bubbleEl.dataset.id = item.id;
      bubbleEl.dataset.isCorrect = (item.id === currentQ.id) ? 'true' : 'false';

      bubbleEl.innerHTML = `
        <div class="bubble-inner">
          <div class="bubble-real-photo-wrap">
            <img src="${item.realPhotoUrl}" alt="${item.shortName}" class="bubble-real-img" />
          </div>
          <span class="bubble-title">${item.shortName}</span>
          <span class="bubble-cat">${item.categoryLabel}</span>
        </div>
        <div class="bubble-glare"></div>
      `;

      const startX = tankWidth + (idx * 170) + (Math.random() * 80);
      const startY = 40 + (idx * ((tankHeight - 170) / 4)) + (Math.random() * 20);
      const speed = 1.1 + Math.random() * 0.5;
      const waveFreq = 0.02 + Math.random() * 0.02;
      const waveAmp = 15 + Math.random() * 10;

      bubblesContainer.appendChild(bubbleEl);

      const bubbleObj = {
        element: bubbleEl,
        item: item,
        x: startX,
        y: startY,
        baseY: startY,
        speed: speed,
        waveFreq: waveFreq,
        waveAmp: waveAmp,
        step: Math.random() * 100,
        isCorrect: (item.id === currentQ.id)
      };

      bubbleEl.addEventListener('click', () => {
        handleBubbleClick(bubbleObj);
      });

      return bubbleObj;
    });

    startBubbleAnimation(tankWidth);
  }

  function startBubbleAnimation(tankWidth) {
    if (animationId) cancelAnimationFrame(animationId);

    const animate = () => {
      bubbles.forEach(b => {
        if (!isAnswerLocked) {
          b.x -= b.speed;
          b.step += b.waveFreq;
          b.y = b.baseY + Math.sin(b.step) * b.waveAmp;

          if (b.x < -180) {
            b.x = tankWidth + 40;
          }

          b.element.style.transform = `translate3d(${b.x}px, ${b.y}px, 0)`;
        }
      });

      animationId = requestAnimationFrame(animate);
    };

    animationId = requestAnimationFrame(animate);
  }

  function handleBubbleClick(bubbleObj) {
    if (isAnswerLocked) return;
    isAnswerLocked = true;

    const feedbackBanner = container.querySelector('#aquarium-feedback');
    const scoreEl = container.querySelector('#aq-score');
    const streakEl = container.querySelector('#aq-streak');

    if (bubbleObj.isCorrect) {
      soundFX.playPop();
      soundFX.playCorrect();

      bubbleObj.element.classList.add('bubble-correct');
      streak++;
      const earned = 100 + (streak * 20);
      score += earned;
      if (onScoreAwarded) onScoreAwarded(earned);

      scoreEl.textContent = score;
      streakEl.textContent = streak;

      feedbackBanner.innerHTML = `
        <span class="fb-icon">🎉</span>
        <span class="fb-text">Tebrikler! Doğru parça: <strong>${bubbleObj.item.name}</strong></span>
      `;
      feedbackBanner.className = 'aquarium-feedback-banner fb-success';

      setTimeout(() => {
        currentQIndex++;
        loadQuestion();
      }, 1000);

    } else {
      soundFX.playWrong();
      streak = 0;
      streakEl.textContent = streak;

      bubbleObj.element.classList.add('bubble-wrong');

      const correctBubble = bubbles.find(b => b.isCorrect);
      if (correctBubble) {
        correctBubble.element.classList.add('bubble-correct-highlight');
      }

      feedbackBanner.innerHTML = `
        <span class="fb-icon">❌</span>
        <span class="fb-text">Doğru cevap: <strong>${correctBubble ? correctBubble.item.name : ''}</strong></span>
      `;
      feedbackBanner.className = 'aquarium-feedback-banner fb-error';

      setTimeout(() => {
        currentQIndex++;
        loadQuestion();
      }, 2200);
    }
  }

  function endGame() {
    if (animationId) cancelAnimationFrame(animationId);
    speechManager.stop();
    soundFX.playWin();

    confetti({
      particleCount: 120,
      spread: 80,
      origin: { y: 0.5 }
    });

    const completeCard = container.querySelector('#aquarium-complete-card');
    const finalScoreEl = container.querySelector('#final-aq-score');
    finalScoreEl.textContent = score;
    completeCard.classList.remove('hidden');
  }

  initGame();

  return {
    destroy: () => {
      if (animationId) cancelAnimationFrame(animationId);
      speechManager.stop();
    }
  };
}
