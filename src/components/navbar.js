import { soundFX } from '../audio/soundEffects.js';
import { speechManager } from '../audio/speechManager.js';

export function renderNavbar(container, state, onNavigate) {
  container.innerHTML = `
    <header class="app-header">
      <div class="header-brand">
        <div class="brand-icon">💻</div>
        <div class="brand-text">
          <h1 class="brand-title">Donanım Dünyası 3D</h1>
          <span class="brand-subtitle">BTY.5.1.5. Bilgisayar Sistemlerini Çözümleyebilme</span>
        </div>
      </div>

      <nav class="nav-tabs" role="tablist">
        <button class="nav-tab ${state.currentTab === 'guide' ? 'active' : ''}" data-tab="guide">
          <span class="tab-icon">🖥️</span>
          <span class="tab-label">3D Donanım Rehberi</span>
        </button>
        <button class="nav-tab ${state.currentTab === 'matching' ? 'active' : ''}" data-tab="matching">
          <span class="tab-icon">🎮</span>
          <span class="tab-label">Etkinlik 1: Eşleştirme</span>
        </button>
        <button class="nav-tab ${state.currentTab === 'aquarium' ? 'active' : ''}" data-tab="aquarium">
          <span class="tab-icon">🐠</span>
          <span class="tab-label">Etkinlik 2: Akvaryum Oyunu</span>
        </button>
        <button class="nav-tab ${state.currentTab === 'assembly' ? 'active' : ''}" data-tab="assembly">
          <span class="tab-icon">🧩</span>
          <span class="tab-label">Etkinlik 3: 3D Montaj</span>
        </button>
      </nav>

      <div class="header-actions">
        <div class="score-badge" title="Toplam Kazanılan Yıldızlar">
          <span class="star-icon">⭐</span>
          <span class="score-value" id="global-score">${state.totalStars || 0}</span>
        </div>

        <button class="action-btn" id="btn-toggle-sound" title="Ses Efektlerini Aç/Kapat">
          <span class="btn-icon" id="sound-icon">${soundFX.isMuted() ? '🔇' : '🔊'}</span>
        </button>

        <button class="action-btn" id="btn-toggle-tts" title="Sesli Okumayı (TTS) Aç/Kapat">
          <span class="btn-icon" id="tts-icon">${speechManager.isEnabled() ? '🗣️' : '🤫'}</span>
        </button>

        <button class="action-btn" id="btn-info" title="Ders Kazanımları ve Bilgi">
          <span class="btn-icon">ℹ️</span>
        </button>
      </div>
    </header>

    <!-- Bilgi Modalı -->
    <div class="modal-overlay hidden" id="info-modal">
      <div class="modal-card">
        <div class="modal-header">
          <h2>📚 Ders Bilgisi & Kazanımlar</h2>
          <button class="modal-close" id="modal-close">&times;</button>
        </div>
        <div class="modal-body">
          <div class="info-section">
            <h3>🎯 Hedef Kitle & Ders</h3>
            <p><strong>Ders:</strong> Bilişim Teknolojileri ve Yazılım (BTY)</p>
            <p><strong>Sınıf Seviyesi:</strong> 5. Sınıf (10-12 Yaş)</p>
            <p><strong>Kazanım Kodu:</strong> BTY.5.1.5. Bilgisayar Sistemlerini Çözümleyebilme</p>
          </div>

          <div class="info-section">
            <h3>💡 Öğrenme Çıktıları</h3>
            <ul>
              <li><strong>a)</strong> Bilgisayar sistemlerinin temel bileşenlerini (İç ve Dış Donanımlar) belirler.</li>
              <li><strong>b)</strong> Giriş ve çıkış birimlerinin farkını kavrar ve parçalar arasındaki ilişkiyi açıklar.</li>
              <li><strong>c)</strong> 3D modeller üzerinden parçaların fiziksel yuvalarını ve anakart montajını deneyimler.</li>
            </ul>
          </div>

          <div class="info-section">
            <h3>🕹️ Nasıl Kullanılır?</h3>
            <p><strong>3D Donanım Rehberi:</strong> Parçaları 360° inceleyin, Türkçe seslendirmeyi dinleyin.</p>
            <p><strong>Eşleştirme Oyunu:</strong> Doğru tanımları doğru donanım görselleriyle eşleştirin.</p>
            <p><strong>Akvaryum Oyunu:</strong> Görev metnine uyan yüzen donanım baloncuklarını yakalayın.</p>
            <p><strong>3D Montaj Oyunu:</strong> Parçaları 3D anakart üzerindeki doğru yuvalarına takıp bilgisayarı çalıştırın!</p>
          </div>
        </div>
      </div>
    </div>
  `;

  // Sekme tıklamaları
  container.querySelectorAll('.nav-tab').forEach(tabBtn => {
    tabBtn.addEventListener('click', () => {
      soundFX.playClick();
      const targetTab = tabBtn.dataset.tab;
      onNavigate(targetTab);
    });
  });

  // Ses aç/kapat
  const btnSound = container.querySelector('#btn-toggle-sound');
  const soundIcon = container.querySelector('#sound-icon');
  btnSound.addEventListener('click', () => {
    const isMuted = soundFX.toggleMute();
    soundIcon.textContent = isMuted ? '🔇' : '🔊';
  });

  // TTS aç/kapat
  const btnTts = container.querySelector('#btn-toggle-tts');
  const ttsIcon = container.querySelector('#tts-icon');
  btnTts.addEventListener('click', () => {
    const isEnabled = speechManager.toggleSpeech();
    ttsIcon.textContent = isEnabled ? '🗣️' : '🤫';
  });

  // Modal aç/kapat
  const infoBtn = container.querySelector('#btn-info');
  const modal = container.querySelector('#info-modal');
  const modalClose = container.querySelector('#modal-close');

  infoBtn.addEventListener('click', () => {
    soundFX.playClick();
    modal.classList.remove('hidden');
  });

  modalClose.addEventListener('click', () => {
    soundFX.playClick();
    modal.classList.add('hidden');
  });

  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      modal.classList.add('hidden');
    }
  });
}
