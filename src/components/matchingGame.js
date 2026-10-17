import { HARDWARE_ITEMS } from '../data/hardwareData.js';
import { soundFX } from '../audio/soundEffects.js';
import confetti from 'canvas-confetti';

export function renderMatchingGame(container, onScoreAwarded) {
  let roundItems = [];
  let selectedDefId = null;
  let selectedHwId = null;
  let matchesFound = 0;
  let score = 0;
  let streak = 0;

  function initRound() {
    // 16 parçadan rastgele 6 tanesini seç
    const shuffled = [...HARDWARE_ITEMS].sort(() => 0.5 - Math.random());
    roundItems = shuffled.slice(0, 6);
    matchesFound = 0;
    selectedDefId = null;
    selectedHwId = null;

    // Tanımları ve Parçaları ayrı ayrı karıştır
    const definitions = [...roundItems].sort(() => 0.5 - Math.random());
    const hardwareCards = [...roundItems].sort(() => 0.5 - Math.random());

    container.innerHTML = `
      <div class="game-container">
        <!-- Oyun Başlığı ve Bilgi Çubuğu -->
        <div class="game-header-bar">
          <div class="game-title-group">
            <h2 class="game-title">🎮 Etkinlik 1: Donanım Eşleştirme Oyunu</h2>
            <p class="game-subtitle">Tanımları oku ve doğru donanım parçasıyla eşleştir!</p>
          </div>

          <div class="game-stats">
            <div class="stat-pill">
              <span class="stat-icon">⭐</span>
              <span class="stat-label">Puan:</span>
              <span class="stat-val" id="match-score">${score}</span>
            </div>
            <div class="stat-pill">
              <span class="stat-icon">🔥</span>
              <span class="stat-label">Seri:</span>
              <span class="stat-val" id="match-streak">${streak}</span>
            </div>
            <div class="stat-pill">
              <span class="stat-icon">🎯</span>
              <span class="stat-label">İlerleme:</span>
              <span class="stat-val" id="match-progress">0 / 6</span>
            </div>
            <button class="game-action-btn" id="btn-new-round">🔄 Yeni Tur</button>
          </div>
        </div>

        <div class="matching-help-banner">
          <span>💡 <strong>İpucu:</strong> Bir tanıma tıklayın, ardından sağdaki eşleşen donanım kartına tıklayın!</span>
        </div>

        <!-- İki Sütunlu Eşleştirme Alanı -->
        <div class="matching-board">
          <!-- Sol Sütun: Tanımlar -->
          <div class="matching-column" id="col-definitions">
            <h3 class="column-title">📖 Donanım Tanımları</h3>
            <div class="cards-stack">
              ${definitions.map(item => `
                <div class="match-card def-card" data-id="${item.id}" tabindex="0">
                  <div class="card-num-badge">?</div>
                  <div class="def-card-text">
                    <div class="def-analogy-chip">${item.analogyIcon} <em>${item.analogy}</em></div>
                    <p>${item.description}</p>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Sağ Sütun: Donanım Parçaları -->
          <div class="matching-column" id="col-hardware">
            <h3 class="column-title">💻 Donanım Parçaları</h3>
            <div class="cards-stack">
              ${hardwareCards.map(item => `
                <div class="match-card hw-card" data-id="${item.id}" tabindex="0">
                  <div class="hw-icon-circle" style="border-color: ${item.color};">
                    <span class="hw-emoji">${item.icon}</span>
                  </div>
                  <div class="hw-info-block">
                    <h4 class="hw-name">${item.name}</h4>
                    <span class="hw-category-tag ${item.category}">${item.categoryLabel}</span>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Tamamlama Modalı -->
        <div class="round-complete-card hidden" id="round-complete-card">
          <div class="complete-inner">
            <div class="trophy-bounce">🏆</div>
            <h3>Harika İş Çıkardın!</h3>
            <p>Tüm donanım birimlerini doğru tanımlarıyla kusursuz eşleştirdin!</p>
            <div class="complete-score-show">Kazanılan Puan: <strong>+${roundItems.length * 50}</strong> ⭐</div>
            <button class="btn-play-again" id="btn-play-again">🎉 Yeni Tur Başlat</button>
          </div>
        </div>
      </div>
    `;

    setupInteractions();
  }

  function setupInteractions() {
    const defCards = container.querySelectorAll('.def-card');
    const hwCards = container.querySelectorAll('.hw-card');
    const progressEl = container.querySelector('#match-progress');
    const scoreEl = container.querySelector('#match-score');
    const streakEl = container.querySelector('#match-streak');
    const newRoundBtn = container.querySelector('#btn-new-round');
    const completeCard = container.querySelector('#round-complete-card');
    const playAgainBtn = container.querySelector('#btn-play-again');

    newRoundBtn.addEventListener('click', () => {
      soundFX.playClick();
      initRound();
    });

    if (playAgainBtn) {
      playAgainBtn.addEventListener('click', () => {
        soundFX.playClick();
        initRound();
      });
    }

    // Tanım Kartı Tıklaması
    defCards.forEach(card => {
      card.addEventListener('click', () => {
        if (card.classList.contains('matched')) return;
        soundFX.playClick();

        defCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedDefId = card.dataset.id;

        checkMatch();
      });
    });

    // Donanım Kartı Tıklaması
    hwCards.forEach(card => {
      card.addEventListener('click', () => {
        if (card.classList.contains('matched')) return;
        soundFX.playClick();

        hwCards.forEach(c => c.classList.remove('selected'));
        card.classList.add('selected');
        selectedHwId = card.dataset.id;

        checkMatch();
      });
    });

    // Sürükle-Bırak (Drag & Drop) Desteği
    hwCards.forEach(hwCard => {
      hwCard.setAttribute('draggable', 'true');
      hwCard.addEventListener('dragstart', (e) => {
        if (hwCard.classList.contains('matched')) return;
        e.dataTransfer.setData('text/plain', hwCard.dataset.id);
        hwCard.classList.add('dragging');
      });
      hwCard.addEventListener('dragend', () => {
        hwCard.classList.remove('dragging');
      });
    });

    defCards.forEach(defCard => {
      defCard.addEventListener('dragover', (e) => {
        e.preventDefault();
        if (!defCard.classList.contains('matched')) {
          defCard.classList.add('drag-over');
        }
      });
      defCard.addEventListener('dragleave', () => {
        defCard.classList.remove('drag-over');
      });
      defCard.addEventListener('drop', (e) => {
        e.preventDefault();
        defCard.classList.remove('drag-over');
        if (defCard.classList.contains('matched')) return;

        const droppedHwId = e.dataTransfer.getData('text/plain');
        selectedDefId = defCard.dataset.id;
        selectedHwId = droppedHwId;
        checkMatch();
      });
    });

    function checkMatch() {
      if (!selectedDefId || !selectedHwId) return;

      const defCard = container.querySelector(`.def-card[data-id="${selectedDefId}"]`);
      const hwCard = container.querySelector(`.hw-card[data-id="${selectedHwId}"]`);

      if (!defCard || !hwCard) return;

      if (selectedDefId === selectedHwId) {
        // Doğru Eşleştirme!
        soundFX.playCorrect();
        streak++;
        score += 50 + streak * 10;
        matchesFound++;

        if (onScoreAwarded) {
          onScoreAwarded(50 + streak * 10);
        }

        defCard.classList.remove('selected');
        hwCard.classList.remove('selected');

        defCard.classList.add('matched');
        hwCard.classList.add('matched');

        // Onay Rozeti ekle
        defCard.querySelector('.card-num-badge').textContent = '✓';
        defCard.querySelector('.card-num-badge').classList.add('badge-success');

        scoreEl.textContent = score;
        streakEl.textContent = streak;
        progressEl.textContent = `${matchesFound} / ${roundItems.length}`;

        selectedDefId = null;
        selectedHwId = null;

        // Tur Bitti mi?
        if (matchesFound >= roundItems.length) {
          setTimeout(() => {
            soundFX.playWin();
            confetti({
              particleCount: 100,
              spread: 70,
              origin: { y: 0.6 }
            });
            completeCard.classList.remove('hidden');
          }, 500);
        }
      } else {
        // Yanlış Eşleştirme!
        soundFX.playWrong();
        streak = 0;
        streakEl.textContent = streak;

        defCard.classList.add('wrong');
        hwCard.classList.add('wrong');

        setTimeout(() => {
          defCard.classList.remove('wrong', 'selected');
          hwCard.classList.remove('wrong', 'selected');
          selectedDefId = null;
          selectedHwId = null;
        }, 600);
      }
    }
  }

  initRound();

  return {
    destroy: () => {}
  };
}
