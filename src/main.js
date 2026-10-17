import './style.css';
import { renderNavbar } from './components/navbar.js';
import { renderHardwareViewer } from './components/hardwareViewer.js';
import { renderMatchingGame } from './components/matchingGame.js';
import { renderAquariumGame } from './components/aquariumGame.js';
import { renderAssemblyGame } from './components/assemblyGame.js';
import { speechManager } from './audio/speechManager.js';

// Global Uygulama Durumu (State)
const state = {
  currentTab: 'guide',
  totalStars: parseInt(localStorage.getItem('bty_hardware_stars') || '0', 10),
  activeComponent: null
};

const appEl = document.querySelector('#app');
const headerContainer = document.createElement('div');
headerContainer.id = 'header-root';

const mainContentContainer = document.createElement('main');
mainContentContainer.id = 'main-content-view';
mainContentContainer.className = 'main-content-view';

appEl.appendChild(headerContainer);
appEl.appendChild(mainContentContainer);

function saveStars(stars) {
  state.totalStars = stars;
  localStorage.setItem('bty_hardware_stars', stars.toString());
  const scoreBadgeEl = document.querySelector('#global-score');
  if (scoreBadgeEl) {
    scoreBadgeEl.textContent = state.totalStars;
  }
}

function addStars(amount) {
  saveStars(state.totalStars + amount);
}

function navigateTo(tabId) {
  if (state.currentTab === tabId && state.activeComponent) return;

  // Önceki bileşeni temizle
  if (state.activeComponent && typeof state.activeComponent.destroy === 'function') {
    state.activeComponent.destroy();
  }
  speechManager.stop();

  state.currentTab = tabId;

  // Header'ı yeniden çiz
  renderNavbar(headerContainer, state, navigateTo);

  // İçeriği temizle ve yeni sekme bileşenini yükle
  mainContentContainer.innerHTML = '';

  if (tabId === 'guide') {
    state.activeComponent = renderHardwareViewer(mainContentContainer);
  } else if (tabId === 'matching') {
    state.activeComponent = renderMatchingGame(mainContentContainer, (earned) => {
      addStars(earned);
    });
  } else if (tabId === 'aquarium') {
    state.activeComponent = renderAquariumGame(mainContentContainer, (earned) => {
      addStars(earned);
    });
  } else if (tabId === 'assembly') {
    state.activeComponent = renderAssemblyGame(mainContentContainer, (earned) => {
      addStars(earned);
    });
  }
}

// Uygulamayı Başlat
document.addEventListener('DOMContentLoaded', () => {
  renderNavbar(headerContainer, state, navigateTo);
  navigateTo('guide');
});
