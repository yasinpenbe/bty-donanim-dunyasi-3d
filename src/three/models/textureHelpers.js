import * as THREE from 'three';

/**
 * Procedural Canvas Texture Helpers for Three.js
 */

export function createPcbTexture(color = '#0f3a22') {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Arka plan rengi
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 512, 512);

  // Bakır iletken yollar
  ctx.strokeStyle = '#d4af37';
  ctx.lineWidth = 2;
  ctx.lineCap = 'round';

  for (let i = 0; i < 40; i++) {
    ctx.beginPath();
    const x = Math.random() * 512;
    const y = Math.random() * 512;
    ctx.moveTo(x, y);
    const len1 = (Math.random() - 0.5) * 80;
    const len2 = (Math.random() - 0.5) * 80;
    ctx.lineTo(x + len1, y);
    ctx.lineTo(x + len1 + len2, y + len2);
    ctx.stroke();

    // Lehim noktaları (Pads)
    ctx.fillStyle = '#f3e5ab';
    ctx.beginPath();
    ctx.arc(x, y, 3, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + len1 + len2, y + len2, 3, 0, Math.PI * 2);
    ctx.fill();
  }

  // Izgara çizgileri
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
  ctx.lineWidth = 1;
  for (let x = 0; x < 512; x += 32) {
    ctx.beginPath();
    ctx.moveTo(x, 0);
    ctx.lineTo(x, 512);
    ctx.stroke();
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function createCpuTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');

  // Metalik fırçalanmış alüminyum efekt
  const grad = ctx.createLinearGradient(0, 0, 512, 512);
  grad.addColorStop(0, '#e2e8f0');
  grad.addColorStop(0.5, '#cbd5e1');
  grad.addColorStop(1, '#94a3b8');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 512, 512);

  // Çerçeve
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 12;
  ctx.strokeRect(10, 10, 492, 492);

  // Lazer kazıma yazılar
  ctx.fillStyle = '#1e293b';
  ctx.textAlign = 'center';

  ctx.font = 'bold 38px Inter, sans-serif';
  ctx.fillText('BTY CORE i7', 256, 170);

  ctx.font = '600 24px Inter, sans-serif';
  ctx.fillText('OCTA-CORE 4.8 GHz', 256, 230);

  ctx.font = '20px monospace';
  ctx.fillText('LGA-1700 / 32MB CACHE', 256, 280);

  // Küçük QR kod / Seri numarası deseni
  ctx.fillStyle = '#0f172a';
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      if ((r + c) % 2 === 0 || (r * c) % 3 === 0) {
        ctx.fillRect(206 + c * 12, 330 + r * 12, 10, 10);
      }
    }
  }

  // Altın köşe üçgeni (Montaj kılavuzu)
  ctx.fillStyle = '#eab308';
  ctx.beginPath();
  ctx.moveTo(30, 480);
  ctx.lineTo(60, 480);
  ctx.lineTo(30, 450);
  ctx.closePath();
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}

export function createRamTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#1e293b';
  ctx.fillRect(0, 0, 512, 128);

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 32px Inter, sans-serif';
  ctx.fillText('16GB DDR5 6000MHz', 40, 70);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '18px monospace';
  ctx.fillText('HIGH SPEED GAMING RAM', 40, 105);

  return new THREE.CanvasTexture(canvas);
}

export function createSsdTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 160;
  const ctx = canvas.getContext('2d');

  // Şık siyah/mavi etiket
  ctx.fillStyle = '#0f172a';
  ctx.fillRect(0, 0, 512, 160);

  ctx.strokeStyle = '#06b6d4';
  ctx.lineWidth = 6;
  ctx.strokeRect(6, 6, 500, 148);

  ctx.fillStyle = '#38bdf8';
  ctx.font = 'bold 36px Inter, sans-serif';
  ctx.fillText('NVMe M.2 SSD 1TB', 30, 60);

  ctx.fillStyle = '#e2e8f0';
  ctx.font = '22px Inter, sans-serif';
  ctx.fillText('Gen4 x4 • 7000 MB/s Okuma', 30, 105);

  ctx.fillStyle = '#64748b';
  ctx.font = '16px monospace';
  ctx.fillText('SN: BTY-515-2026-PC', 30, 138);

  return new THREE.CanvasTexture(canvas);
}

export function createScreenTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 576;
  const ctx = canvas.getContext('2d');

  // Duvar kağıdı (Gradient uzay/teknoloji)
  const grad = ctx.createLinearGradient(0, 0, 1024, 576);
  grad.addColorStop(0, '#0f172a');
  grad.addColorStop(0.5, '#1e1b4b');
  grad.addColorStop(1, '#064e3b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 576);

  // Masaüstü pencereleri
  // Kod penceresi
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(200, 100, 500, 320);
  ctx.fillStyle = '#334155';
  ctx.fillRect(200, 100, 500, 36);

  // Pencere butonları
  ctx.fillStyle = '#ef4444';
  ctx.beginPath();
  ctx.arc(220, 118, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#f59e0b';
  ctx.beginPath();
  ctx.arc(240, 118, 6, 0, Math.PI * 2);
  ctx.fill();
  ctx.fillStyle = '#10b981';
  ctx.beginPath();
  ctx.arc(260, 118, 6, 0, Math.PI * 2);
  ctx.fill();

  // Kod satırları
  ctx.fillStyle = '#38bdf8';
  ctx.font = '18px monospace';
  ctx.fillText('// BTY 5. Sınıf Donanım Dersi', 230, 170);
  ctx.fillStyle = '#a78bfa';
  ctx.fillText('const bilgisayar = {', 230, 205);
  ctx.fillStyle = '#34d399';
  ctx.fillText('  islemci: "Beyin",', 250, 240);
  ctx.fillText('  ram: "Çalışma Masası",', 250, 275);
  ctx.fillText('  depolama: "Kütüphane"', 250, 310);
  ctx.fillStyle = '#a78bfa';
  ctx.fillText('};', 230, 345);
  ctx.fillStyle = '#fbbf24';
  ctx.fillText('bilgisayar.calistir();', 230, 385);

  // Masaüstü ikonları
  const icons = ['📁 Belgelerim', '🎮 Oyunlar', '🌐 İnternet', '💻 Bilgisayarım'];
  icons.forEach((ic, idx) => {
    ctx.fillStyle = '#ffffff';
    ctx.font = '16px Inter, sans-serif';
    ctx.fillText(ic, 40, 90 + idx * 70);
  });

  // Görev Çubuğu
  ctx.fillStyle = 'rgba(15, 23, 42, 0.85)';
  ctx.fillRect(0, 530, 1024, 46);

  // Başlat butonu
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(15, 535, 36, 36);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 18px Inter, sans-serif';
  ctx.fillText('B', 27, 560);

  // Saat
  ctx.fillStyle = '#cbd5e1';
  ctx.font = '16px Inter, sans-serif';
  ctx.fillText('23:00  |  17.10.2026', 860, 560);

  return new THREE.CanvasTexture(canvas);
}

export function createBarcodeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 128;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 256, 128);

  ctx.fillStyle = '#000000';
  for (let x = 20; x < 236; x += 6) {
    const w = Math.random() > 0.5 ? 4 : 2;
    ctx.fillRect(x, 20, w, 70);
  }

  ctx.font = '16px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('8 690123 456789', 128, 110);

  return new THREE.CanvasTexture(canvas);
}
