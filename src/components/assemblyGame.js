import { ASSEMBLY_PARTS } from '../data/hardwareData.js';
import { MotherboardAssemblyScene } from '../three/motherboardAssembly.js';
import { soundFX } from '../audio/soundEffects.js';
import confetti from 'canvas-confetti';

export function renderAssemblyGame(container, onScoreAwarded) {
  let selectedPartId = null;
  let installedCount = 0;
  let assemblyScene = null;
  let totalParts = ASSEMBLY_PARTS.length;

  container.innerHTML = `
    <div class="assembly-layout">
      <!-- Üst Görev & İlerleme Çubuğu -->
      <div class="assembly-header-card">
        <div class="assembly-header-title">
          <h2>🧩 Etkinlik 3: 3D Anakart Yerleşim Oyunu (Montaj Simülasyonu)</h2>
          <p>İç donanım parçalarını seç ve 3D anakart üzerindeki doğru yuvasına yerleştir!</p>
        </div>

        <div class="assembly-stats-bar">
          <div class="stat-pill">
            <span class="stat-icon">⚙️</span>
            <span class="stat-label">Montaj Durumu:</span>
            <span class="stat-val" id="assembly-progress">0 / ${totalParts}</span>
          </div>
          <button class="game-action-btn" id="btn-reset-assembly">🔄 Sıfırla & Baştan Başla</button>
        </div>
      </div>

      <!-- Bilgi & İpucu Kutusu -->
      <div class="assembly-guide-banner" id="assembly-guide-banner">
        <span class="guide-icon">💡</span>
        <span class="guide-text" id="assembly-guide-text">
          Aşağıdaki parça tepsisinden takmak istediğin donanımı seç, ardından 3D anakart üzerindeki parlayan yuvaya tıkla!
        </span>
      </div>

      <!-- Ana Çalışma Masası -->
      <div class="assembly-workspace">
        <!-- 3D Anakart Sahnesi -->
        <div class="assembly-3d-viewport" id="assembly-3d-viewport"></div>

        <!-- 3D Kamera İpucu -->
        <div class="assembly-viewport-hint">
          <span>🖱️ Anakartı döndürmek için sürükleyin • Yakınlaştırmak için kaydırın</span>
        </div>
      </div>

      <!-- Alt Parça Tepsisi (Takılmayı Bekleyen Parçalar) -->
      <div class="assembly-tray-wrapper">
        <h3 class="tray-title">📦 Takılacak İç Donanım Parçaları:</h3>
        <div class="assembly-tray" id="assembly-tray">
          ${ASSEMBLY_PARTS.map(part => `
            <div class="assembly-tray-item" data-id="${part.id}" data-slot="${part.slotId}">
              <div class="tray-item-icon">${part.icon}</div>
              <div class="tray-item-info">
                <span class="tray-item-name">${part.name}</span>
                <span class="tray-slot-target">Hedef: ${part.slotName}</span>
              </div>
              <div class="tray-status-badge" id="status-${part.id}">Bekliyor</div>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- PC Açılış Kutlama Modalı -->
      <div class="round-complete-card hidden" id="pc-poweron-modal">
        <div class="complete-inner">
          <div class="trophy-bounce">⚡🖥️⚡</div>
          <h3>TEBRİKLER! BİLGİSAYAR ÇALIŞTI!</h3>
          <p>Tüm iç donanım parçalarını anakarta eksiksiz ve doğru monte ettin. Fanlar dönüyor ve sistem başarıyla açıldı!</p>
          <div class="complete-score-show">Kazanılan Başarı: <strong>+300</strong> ⭐</div>
          <button class="btn-play-again" id="btn-celebrate-again">🎉 Tekrar Montaj Yap</button>
        </div>
      </div>
    </div>
  `;

  const viewportEl = container.querySelector('#assembly-3d-viewport');
  const guideText = container.querySelector('#assembly-guide-text');
  const progressEl = container.querySelector('#assembly-progress');
  const trayItems = container.querySelectorAll('.assembly-tray-item');
  const powerOnModal = container.querySelector('#pc-poweron-modal');
  const resetBtn = container.querySelector('#btn-reset-assembly');
  const playAgainBtn = container.querySelector('#btn-celebrate-again');

  // 3D Sahneyi Başlat
  assemblyScene = new MotherboardAssemblyScene(viewportEl, {
    onSlotClicked: (slotId) => {
      handleSlotClicked(slotId);
    },
    onAllCompleted: () => {
      handleAllCompleted();
    }
  });

  // Parça Tepsisi Tıklaması
  trayItems.forEach(itemEl => {
    itemEl.addEventListener('click', () => {
      if (itemEl.classList.contains('installed')) return;

      soundFX.playClick();
      const partId = itemEl.dataset.id;
      selectPart(partId);
    });
  });

  function selectPart(partId) {
    selectedPartId = partId;
    const partData = ASSEMBLY_PARTS.find(p => p.id === partId);

    trayItems.forEach(el => {
      el.classList.toggle('selected', el.dataset.id === partId);
    });

    if (partData) {
      guideText.innerHTML = `<strong>${partData.name}</strong> seçildi. ${partData.hint}`;
      // İlgili yuvayı yeşilimsi vurgula
      assemblyScene.highlightSlot(partData.slotId, true);
    }
  }

  function handleSlotClicked(slotId) {
    if (!selectedPartId) {
      guideText.innerHTML = `⚠️ Lütfen önce aşağıdaki tepsiden takmak istediğiniz bir <strong>donanım parçasını</strong> seçin!`;
      soundFX.playWrong();
      return;
    }

    const partData = ASSEMBLY_PARTS.find(p => p.id === selectedPartId);
    const trayEl = container.querySelector(`.assembly-tray-item[data-id="${selectedPartId}"]`);
    const statusBadge = container.querySelector(`#status-${selectedPartId}`);

    const result = assemblyScene.tryInstallPart(selectedPartId, slotId);

    if (result.success) {
      // Doğru yerleşim!
      soundFX.playSnap();
      installedCount++;
      if (onScoreAwarded) onScoreAwarded(50);

      trayEl.classList.remove('selected');
      trayEl.classList.add('installed');
      statusBadge.textContent = '✓ Takıldı';
      statusBadge.classList.add('badge-installed');

      progressEl.textContent = `${installedCount} / ${totalParts}`;
      guideText.innerHTML = `✅ <strong>${partData.successMsg}</strong>`;

      selectedPartId = null;

      // Sıradaki takılmamış ilk parçayı otomatik ipucu olarak öner
      const nextUninstalled = ASSEMBLY_PARTS.find(p => {
        const el = container.querySelector(`.assembly-tray-item[data-id="${p.id}"]`);
        return el && !el.classList.contains('installed');
      });

      if (nextUninstalled) {
        setTimeout(() => {
          if (!selectedPartId) {
            guideText.innerHTML = `👉 Şimdi sırada <strong>${nextUninstalled.name}</strong> var. Parçaya tıklayıp yerleştirin!`;
          }
        }, 1500);
      }

    } else {
      // Yanlış yerleşim
      soundFX.playWrong();
      guideText.innerHTML = `❌ <strong>${result.message}</strong>`;

      trayEl.classList.add('tray-wrong-shake');
      setTimeout(() => {
        trayEl.classList.remove('tray-wrong-shake');
      }, 500);
    }
  }

  function handleAllCompleted() {
    soundFX.playPowerOn();
    setTimeout(() => {
      soundFX.playWin();
      confetti({
        particleCount: 150,
        spread: 90,
        origin: { y: 0.6 }
      });
      powerOnModal.classList.remove('hidden');
    }, 400);
  }

  function resetAssembly() {
    installedCount = 0;
    selectedPartId = null;
    progressEl.textContent = `0 / ${totalParts}`;
    guideText.innerHTML = `Aşağıdaki parça tepsisinden takmak istediğin donanımı seç, ardından 3D anakart üzerindeki yuvaya tıkla!`;
    powerOnModal.classList.add('hidden');

    trayItems.forEach(el => {
      el.classList.remove('installed', 'selected');
      const badge = el.querySelector('.tray-status-badge');
      badge.textContent = 'Bekliyor';
      badge.classList.remove('badge-installed');
    });

    if (assemblyScene) {
      assemblyScene.reset();
    }
  }

  resetBtn.addEventListener('click', () => {
    soundFX.playClick();
    resetAssembly();
  });

  playAgainBtn.addEventListener('click', () => {
    soundFX.playClick();
    resetAssembly();
  });

  return {
    destroy: () => {
      if (assemblyScene) {
        assemblyScene.destroy();
      }
    }
  };
}
