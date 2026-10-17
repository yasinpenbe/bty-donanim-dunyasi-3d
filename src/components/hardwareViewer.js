import { HARDWARE_ITEMS, CATEGORIES } from '../data/hardwareData.js';
import { HardwareSceneManager } from '../three/sceneManager.js';
import { soundFX } from '../audio/soundEffects.js';
import { speechManager } from '../audio/speechManager.js';

export function renderHardwareViewer(container, initialHardwareId = 'cpu') {
  let selectedCategory = 'all';
  let selectedHardwareId = initialHardwareId;
  let sceneManager = null;
  let isSpeaking = false;

  container.innerHTML = `
    <div class="viewer-layout">
      <!-- Sol Panel: Kategori Filtreleri ve Donanım Listesi -->
      <aside class="viewer-sidebar">
        <div class="category-filters">
          ${CATEGORIES.map(cat => `
            <button class="cat-pill ${cat.id === 'all' ? 'active' : ''}" data-cat="${cat.id}">
              <span class="cat-icon">${cat.icon}</span>
              <span class="cat-name">${cat.label}</span>
            </button>
          `).join('')}
        </div>

        <div class="hardware-list" id="hardware-list">
          <!-- Donanım kartları JS ile doldurulacak -->
        </div>
      </aside>

      <!-- Orta Panel: 3D Görsel Sahne ve Alt Tanım Kartı -->
      <main class="viewer-content">
        <!-- 3D Sahne Alanı -->
        <div class="three-container-wrapper">
          <div class="three-viewport" id="three-viewport"></div>

          <!-- 3D Kontrol Araç Çubuğu (Overlay) -->
          <div class="viewport-overlay-controls">
            <button class="view-ctrl-btn" id="btn-toggle-rotate" title="Otomatik Dönüşü Aç/Kapat">
              <span class="ctrl-icon">🔄</span>
              <span class="ctrl-text">Dönüş</span>
            </button>
            <button class="view-ctrl-btn" id="btn-zoom-in" title="Yakınlaştır">
              <span class="ctrl-icon">➕</span>
            </button>
            <button class="view-ctrl-btn" id="btn-zoom-out" title="Uzaklaştır">
              <span class="ctrl-icon">➖</span>
            </button>
            <button class="view-ctrl-btn" id="btn-reset-cam" title="Kamera Açısını Sıfırla">
              <span class="ctrl-icon">🎯</span>
              <span class="ctrl-text">Sıfırla</span>
            </button>
          </div>

          <!-- Kılavuz İpucu -->
          <div class="viewport-hint">
            <span>🖱️ Çevirmek için sürükleyin • Yakınlaştırmak için tekerleği kaydırın</span>
          </div>
        </div>

        <!-- Alt Bölüm: 5. Sınıf Detaylı Tanım ve Ses Modülü Kartı -->
        <div class="hardware-detail-card" id="hardware-detail-card">
          <!-- Dinamik içerik buraya gelecek -->
        </div>
      </main>
    </div>
  `;

  const threeViewport = container.querySelector('#three-viewport');
  const listContainer = container.querySelector('#hardware-list');
  const detailCard = container.querySelector('#hardware-detail-card');
  const catButtons = container.querySelectorAll('.cat-pill');

  // Three.js Sahnesini Başlat
  sceneManager = new HardwareSceneManager(threeViewport);

  // Donanım Listesini Filtreye Göre Doldur
  function updateList() {
    const filteredItems = selectedCategory === 'all' 
      ? HARDWARE_ITEMS 
      : HARDWARE_ITEMS.filter(item => {
          if (selectedCategory === 'internal') return item.category === 'internal';
          if (selectedCategory === 'external-input') return item.category === 'external-input';
          if (selectedCategory === 'external-output') return item.category === 'external-output';
          return true;
        });

    listContainer.innerHTML = filteredItems.map(item => `
      <div class="hardware-list-item ${item.id === selectedHardwareId ? 'active' : ''}" data-id="${item.id}">
        <div class="item-icon-box" style="background-color: ${item.color}20; color: ${item.color};">
          <span class="item-emoji">${item.icon}</span>
        </div>
        <div class="item-info">
          <h4 class="item-title">${item.shortName}</h4>
          <span class="item-badge ${item.category}">${item.categoryLabel}</span>
        </div>
        ${item.analogyIcon ? `<span class="item-analogy" title="${item.analogy}">${item.analogyIcon}</span>` : ''}
      </div>
    `).join('');

    // Kart Tıklama Dinleyicileri
    listContainer.querySelectorAll('.hardware-list-item').forEach(itemEl => {
      itemEl.addEventListener('click', () => {
        const id = itemEl.dataset.id;
        selectHardware(id);
      });
    });
  }

  // Seçilen Donanımı Göster ve 3D Modeli Yükle
  function selectHardware(id) {
    selectedHardwareId = id;
    soundFX.playClick();
    speechManager.stop();
    isSpeaking = false;

    // Aktif kartı güncelle
    listContainer.querySelectorAll('.hardware-list-item').forEach(el => {
      el.classList.toggle('active', el.dataset.id === id);
    });

    // 3D Modeli Yükle
    sceneManager.loadModel(id);

    // Detay Kartını Güncelle
    const item = HARDWARE_ITEMS.find(h => h.id === id);
    if (!item) return;

    detailCard.innerHTML = `
      <div class="detail-header">
        <div class="detail-title-group">
          <span class="detail-icon">${item.icon}</span>
          <div>
            <h2 class="detail-title">${item.name}</h2>
            <div class="detail-badges">
              <span class="detail-type-badge ${item.category}">${item.categoryLabel}</span>
              <span class="detail-analogy-badge">
                <span class="analogy-star">${item.analogyIcon}</span>
                Benzetim: <strong>${item.analogy}</strong>
              </span>
            </div>
          </div>
        </div>

        <button class="tts-speak-btn" id="btn-speak-definition">
          <span class="speak-icon" id="speak-icon">🔊</span>
          <span class="speak-label" id="speak-label">Sesli Dinle</span>
        </button>
      </div>

      <div class="detail-body">
        <div class="detail-description-box">
          <h4 class="desc-heading">📖 Donanım Tanımı:</h4>
          <p class="desc-text">${item.description}</p>
        </div>

        <div class="detail-funfact-box">
          <div class="funfact-icon">💡</div>
          <div class="funfact-content">
            <strong>Bunu Biliyor muydun?</strong>
            <p>${item.funFact}</p>
          </div>
        </div>
      </div>

      <div class="detail-specs-footer">
        ${item.specs.gorev ? `
          <div class="spec-chip">
            <span class="spec-label">Görevi:</span>
            <span class="spec-val">${item.specs.gorev}</span>
          </div>
        ` : ''}
        ${item.specs.baglanti ? `
          <div class="spec-chip">
            <span class="spec-label">Bağlantı:</span>
            <span class="spec-val">${item.specs.baglanti}</span>
          </div>
        ` : ''}
        ${item.specs.onem ? `
          <div class="spec-chip highlight">
            <span class="spec-label">Önemli Not:</span>
            <span class="spec-val">${item.specs.onem}</span>
          </div>
        ` : ''}
      </div>
    `;

    // TTS Butonu Dinleyicisi
    const speakBtn = detailCard.querySelector('#btn-speak-definition');
    const speakIcon = detailCard.querySelector('#speak-icon');
    const speakLabel = detailCard.querySelector('#speak-label');

    speakBtn.addEventListener('click', () => {
      if (isSpeaking) {
        speechManager.stop();
        isSpeaking = false;
        speakIcon.textContent = '🔊';
        speakLabel.textContent = 'Sesli Dinle';
        speakBtn.classList.remove('speaking');
      } else {
        const textToRead = `${item.name}. ${item.description}. Bunu biliyor muydun? ${item.funFact}`;
        speechManager.speak(
          textToRead,
          () => {
            isSpeaking = true;
            speakIcon.textContent = '⏹️';
            speakLabel.textContent = 'Durdur';
            speakBtn.classList.add('speaking');
          },
          () => {
            isSpeaking = false;
            speakIcon.textContent = '🔊';
            speakLabel.textContent = 'Sesli Dinle';
            speakBtn.classList.remove('speaking');
          }
        );
      }
    });
  }

  // Kategori Filtre Butonları
  catButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      soundFX.playClick();
      catButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      selectedCategory = btn.dataset.cat;
      updateList();

      // Filtre değişiminde o kategorideki ilk öğeyi otomatik seç
      const firstItem = HARDWARE_ITEMS.find(item => {
        if (selectedCategory === 'all') return true;
        if (selectedCategory === 'internal') return item.category === 'internal';
        if (selectedCategory === 'external-input') return item.category === 'external-input';
        if (selectedCategory === 'external-output') return item.category === 'external-output';
        return true;
      });
      if (firstItem) {
        selectHardware(firstItem.id);
      }
    });
  });

  // 3D Kontrol Butonları
  const btnRotate = container.querySelector('#btn-toggle-rotate');
  btnRotate.addEventListener('click', () => {
    soundFX.playClick();
    const isRotating = sceneManager.toggleAutoRotate();
    btnRotate.classList.toggle('active', isRotating);
  });

  container.querySelector('#btn-zoom-in').addEventListener('click', () => {
    soundFX.playClick();
    sceneManager.zoomIn();
  });

  container.querySelector('#btn-zoom-out').addEventListener('click', () => {
    soundFX.playClick();
    sceneManager.zoomOut();
  });

  container.querySelector('#btn-reset-cam').addEventListener('click', () => {
    soundFX.playClick();
    sceneManager.resetCamera();
  });

  // Başlangıç yüklemesi
  updateList();
  selectHardware(selectedHardwareId);

  return {
    destroy: () => {
      speechManager.stop();
      if (sceneManager) {
        sceneManager.destroy();
      }
    }
  };
}
