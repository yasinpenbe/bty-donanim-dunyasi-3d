import * as THREE from 'three';

/**
 * Yüksek Çözünürlüklü Gerçekçi Doku (PBR Canvas Textures) Üreticisi
 */

export function createPcbTexture(color = '#0a0d14') {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Mat koyu PCB altlığı (Asus ROG / MSI tarzı mat siyah devre kartı)
  ctx.fillStyle = color;
  ctx.fillRect(0, 0, 1024, 1024);

  // İnce devre yolları (Micro copper traces)
  ctx.strokeStyle = 'rgba(212, 175, 55, 0.45)';
  ctx.lineWidth = 1.5;
  ctx.lineCap = 'round';

  for (let i = 0; i < 90; i++) {
    ctx.beginPath();
    const x = Math.random() * 1024;
    const y = Math.random() * 1024;
    ctx.moveTo(x, y);
    const l1 = (Math.random() - 0.5) * 160;
    const l2 = (Math.random() - 0.5) * 160;
    ctx.lineTo(x + l1, y);
    ctx.lineTo(x + l1 + l2, y + l2);
    ctx.stroke();

    // Altın lehim noktaları
    ctx.fillStyle = '#f59e0b';
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(x + l1 + l2, y + l2, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Beyaz Serigrafi (Silkscreen) Yazıları ve Çerçeveleri
  ctx.strokeStyle = 'rgba(255, 255, 255, 0.25)';
  ctx.fillStyle = 'rgba(255, 255, 255, 0.35)';
  ctx.font = 'bold 14px monospace';

  ctx.strokeRect(180, 180, 280, 280);
  ctx.fillText('LGA-1700 CPU_SOCKET', 200, 210);

  ctx.fillText('PCIEX16_1 (GEN 5.0)', 180, 680);
  ctx.fillText('PCIEX16_2', 180, 840);

  ctx.fillText('DIMM_A1 [DDR5]', 640, 200);
  ctx.fillText('DIMM_A2 [DDR5]', 710, 200);
  ctx.fillText('DIMM_B1 [DDR5]', 780, 200);
  ctx.fillText('DIMM_B2 [DDR5]', 850, 200);

  ctx.fillText('M.2_1 (PCIe 4.0 x4)', 300, 520);
  ctx.fillText('AUDIO BOOST PRO', 60, 800);

  // SMD Direnç Dizileri (Küçük siyah-gümüş dikdörtgenler)
  for (let r = 0; r < 50; r++) {
    const rx = 100 + Math.random() * 800;
    const ry = 100 + Math.random() * 800;
    ctx.fillStyle = '#18181b';
    ctx.fillRect(rx, ry, 8, 4);
    ctx.fillStyle = '#cbd5e1';
    ctx.fillRect(rx, ry, 2, 4);
    ctx.fillRect(rx + 6, ry, 2, 4);
  }

  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  return texture;
}

export function createCpuTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  // Gerçekçi fırçalanmış nikel kaplama metalik zemin
  const grad = ctx.createLinearGradient(0, 0, 1024, 1024);
  grad.addColorStop(0, '#e2e8f0');
  grad.addColorStop(0.3, '#f8fafc');
  grad.addColorStop(0.5, '#cbd5e1');
  grad.addColorStop(0.8, '#94a3b8');
  grad.addColorStop(1, '#e2e8f0');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 1024);

  // Hassas CNC metal pah kırma çerçevesi
  ctx.strokeStyle = '#64748b';
  ctx.lineWidth = 16;
  ctx.strokeRect(20, 20, 984, 984);

  ctx.strokeStyle = '#ffffff';
  ctx.lineWidth = 4;
  ctx.strokeRect(36, 36, 952, 952);

  // Lazer Kazıma Detayları (Gerçek işlemci tipografisi)
  ctx.fillStyle = '#1e293b';
  ctx.textAlign = 'center';

  ctx.font = '900 64px Inter, sans-serif';
  ctx.fillText('intel® CORE™ i7', 512, 320);

  ctx.font = '700 44px monospace';
  ctx.fillText('i7-14700K', 512, 400);

  ctx.font = '600 32px monospace';
  ctx.fillText('SRMB3 3.40GHZ', 512, 470);
  ctx.fillText('X412E892 (e4)', 512, 530);

  // 2D Data Matrix Kod
  ctx.fillStyle = '#0f172a';
  for (let r = 0; r < 14; r++) {
    for (let c = 0; c < 14; c++) {
      if ((r + c) % 2 === 0 || (r * c) % 3 === 0) {
        ctx.fillRect(412 + c * 14, 620 + r * 14, 12, 12);
      }
    }
  }

  // Sol Alt Altın Montaj Üçgeni
  ctx.fillStyle = '#eab308';
  ctx.beginPath();
  ctx.moveTo(60, 960);
  ctx.lineTo(120, 960);
  ctx.lineTo(60, 900);
  ctx.closePath();
  ctx.fill();

  return new THREE.CanvasTexture(canvas);
}

export function createCpuPinTexture() {
  // İşlemcinin alt yüzeyindeki 1700 altın temas pini ve merkez kondansatörler
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 1024;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#042f1a'; // Koyu yeşil PCB
  ctx.fillRect(0, 0, 1024, 1024);

  // Altın temas pinleri ızgarası
  ctx.fillStyle = '#eab308';
  for (let x = 60; x < 964; x += 18) {
    for (let y = 60; y < 964; y += 18) {
      // Ortadaki kondansatör boşluğunu atla
      if (x > 380 && x < 644 && y > 380 && y < 644) continue;
      ctx.beginPath();
      ctx.arc(x, y, 6, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Merkez Boşluk ve Yüzey Montaj Kondansatörleri (MLCC)
  ctx.fillStyle = '#1e293b';
  ctx.fillRect(380, 380, 264, 264);

  ctx.fillStyle = '#d97706';
  for (let cx = 400; cx < 630; cx += 32) {
    for (let cy = 400; cy < 630; cy += 24) {
      ctx.fillRect(cx, cy, 22, 14);
    }
  }

  return new THREE.CanvasTexture(canvas);
}

export function createRamTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  // Fırçalanmış eloksallı siyah alüminyum soğutucu
  const grad = ctx.createLinearGradient(0, 0, 1024, 0);
  grad.addColorStop(0, '#18181b');
  grad.addColorStop(0.5, '#27272a');
  grad.addColorStop(1, '#09090b');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 256);

  // CNC elmas kesim açılı hatlar
  ctx.strokeStyle = '#52525b';
  ctx.lineWidth = 3;
  for (let x = 80; x < 950; x += 120) {
    ctx.beginPath();
    ctx.moveTo(x, 40);
    ctx.lineTo(x + 50, 180);
    ctx.lineTo(x + 100, 180);
    ctx.stroke();
  }

  // Metalik Gümüş Marka Yazısı
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 48px Inter, sans-serif';
  ctx.fillText('FURY BEAST', 80, 110);

  ctx.fillStyle = '#38bdf8';
  ctx.font = '700 28px monospace';
  ctx.fillText('DDR5 6000MHz CL30 1.35V Intel XMP 3.0', 80, 160);

  ctx.fillStyle = '#71717a';
  ctx.font = '20px monospace';
  ctx.fillText('KF560C30BBEK2-32 • HI-PERFORMANCE GAMING RAM', 80, 205);

  return new THREE.CanvasTexture(canvas);
}

export function createSsdTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 320;
  const ctx = canvas.getContext('2d');

  // Mat siyah şık termal etiket
  ctx.fillStyle = '#09090b';
  ctx.fillRect(0, 0, 1024, 320);

  // Bakır folyo kenar çizgisi (Isı yayılımı efekti)
  ctx.strokeStyle = '#d97706';
  ctx.lineWidth = 6;
  ctx.strokeRect(12, 12, 1000, 296);

  // Marka ve Kapasite
  ctx.fillStyle = '#ffffff';
  ctx.font = '900 64px Inter, sans-serif';
  ctx.fillText('SAMSUNG', 50, 100);

  ctx.fillStyle = '#ef4444';
  ctx.font = '900 64px Inter, sans-serif';
  ctx.fillText('990 PRO', 380, 100);

  ctx.fillStyle = '#38bdf8';
  ctx.font = '700 36px monospace';
  ctx.fillText('PCIe 4.0 NVMe M.2 SSD • 2TB', 50, 170);

  ctx.fillStyle = '#94a3b8';
  ctx.font = '26px monospace';
  ctx.fillText('Up to 7,450 MB/s Read • Model: MZ-V9P2T0B', 50, 220);

  ctx.fillStyle = '#52525b';
  ctx.font = '20px monospace';
  ctx.fillText('S/N: S6KBNJ0W123456 • MADE IN KOREA', 50, 265);

  return new THREE.CanvasTexture(canvas);
}

export function createGpuBackplateTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1024;
  canvas.height = 420;
  const ctx = canvas.getContext('2d');

  // Fırçalanmış Koyu Titanyum Metal Plaka
  const grad = ctx.createLinearGradient(0, 0, 1024, 420);
  grad.addColorStop(0, '#1e293b');
  grad.addColorStop(0.5, '#334155');
  grad.addColorStop(1, '#0f172a');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1024, 420);

  // Havalandırma Petek Kesimleri (Flow-through cooling)
  ctx.fillStyle = '#09090b';
  for (let r = 0; r < 5; r++) {
    for (let c = 0; c < 12; c++) {
      ctx.beginPath();
      ctx.arc(680 + c * 24 + (r % 2) * 12, 120 + r * 36, 9, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  // Beyaz Lazer Logo
  ctx.fillStyle = '#f8fafc';
  ctx.font = '900 48px Inter, sans-serif';
  ctx.fillText('GEFORCE RTX™', 80, 160);

  ctx.fillStyle = '#22c55e';
  ctx.font = '900 48px Inter, sans-serif';
  ctx.fillText('4070 Ti SUPER', 80, 230);

  return new THREE.CanvasTexture(canvas);
}

export function createScreenTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 1920;
  canvas.height = 1080;
  const ctx = canvas.getContext('2d');

  // Gerçekçi 4K Yüksek Teknoloji Uzay/Doğa Duvar Kağıdı
  const grad = ctx.createRadialGradient(960, 540, 200, 960, 540, 1200);
  grad.addColorStop(0, '#1e1b4b');
  grad.addColorStop(0.4, '#0f172a');
  grad.addColorStop(0.8, '#064e3b');
  grad.addColorStop(1, '#020617');
  ctx.fillStyle = grad;
  ctx.fillRect(0, 0, 1920, 1080);

  // Yıldız Tozu Parıltıları
  ctx.fillStyle = 'rgba(255, 255, 255, 0.4)';
  for (let i = 0; i < 200; i++) {
    ctx.fillRect(Math.random() * 1920, Math.random() * 1040, 2, 2);
  }

  // Açık Kodlama & Donanım Geliştirme Penceresi (VS Code Stili)
  ctx.fillStyle = '#18181b';
  ctx.beginPath();
  ctx.roundRect(380, 160, 1160, 720, 12);
  ctx.fill();

  // Pencere Başlık Çubuğu
  ctx.fillStyle = '#27272a';
  ctx.beginPath();
  ctx.roundRect(380, 160, 1160, 56, [12, 12, 0, 0]);
  ctx.fill();

  // Mac/Windows Pencere Kontrolleri
  const colors = ['#ef4444', '#f59e0b', '#10b981'];
  colors.forEach((col, idx) => {
    ctx.fillStyle = col;
    ctx.beginPath();
    ctx.arc(416 + idx * 30, 188, 8, 0, Math.PI * 2);
    ctx.fill();
  });

  ctx.fillStyle = '#94a3b8';
  ctx.font = '22px Inter, sans-serif';
  ctx.fillText('bilgisayar_sistemleri.js — BTY.5.1.5', 520, 196);

  // Kod Satırları
  ctx.font = '24px monospace';
  const codeLines = [
    { text: '// Bilişim Teknolojileri ve Yazılım (5. Sınıf)', col: '#6b7280' },
    { text: 'import { CPU, RAM, Anakart, SSD } from "@donanim/temel-bilesenler";', col: '#c084fc' },
    { text: '', col: '' },
    { text: 'const bilgisayarim = new BilgisayarSistemi({', col: '#38bdf8' },
    { text: '  islemci: new CPU("Beyin - Saniyede 5 Milyar İşlem"),', col: '#34d399' },
    { text: '  geciciBellek: new RAM("Çalışma Masası - 16GB Hızlı DDR5"),', col: '#34d399' },
    { text: '  kaliciDepo: new SSD("Kütüphane - 1TB Kalıcı Veri"),', col: '#34d399' },
    { text: '  ekranKarti: new GPU("Ressam - 4K Kristal Netliğinde Görüntü"),', col: '#34d399' },
    { text: '  anakart: new Anakart("Şehir Meydanı - Tüm Parçaları Bağlar")', col: '#34d399' },
    { text: '});', col: '#38bdf8' },
    { text: '', col: '' },
    { text: 'bilgisayarim.calistir(); // Sistem %100 Hazır ve Kararlı!', col: '#fbbf24' }
  ];

  codeLines.forEach((line, idx) => {
    if (line.text) {
      ctx.fillStyle = line.col;
      ctx.fillText(line.text, 440, 270 + idx * 42);
    }
  });

  // Masaüstü Simgeleri
  const desktopIcons = [
    { title: '📁 Ders Notları', y: 120 },
    { title: '🎮 3D Montaj Oyunu', y: 250 },
    { title: '🌐 EBA & MEB Portal', y: 380 },
    { title: '💻 Bu Bilgisayar', y: 510 },
    { title: '🗑️ Geri Dönüşüm', y: 640 }
  ];

  desktopIcons.forEach(ic => {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.95)';
    ctx.font = '600 24px Inter, sans-serif';
    ctx.fillText(ic.title, 80, ic.y);
  });

  // Windows 11 Tarzı Ortalanmış Görev Çubuğu
  ctx.fillStyle = 'rgba(15, 23, 42, 0.92)';
  ctx.fillRect(0, 1000, 1920, 80);

  // Başlat & Görev Simgeleri
  const taskIcons = ['🪟', '🔍', '📂', '🌐', '⚙️'];
  taskIcons.forEach((sym, idx) => {
    ctx.fillStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.beginPath();
    ctx.roundRect(860 + idx * 64, 1012, 54, 54, 10);
    ctx.fill();
    ctx.font = '28px sans-serif';
    ctx.fillText(sym, 872 + idx * 64, 1050);
  });

  // Saat & Tarih
  ctx.fillStyle = '#f8fafc';
  ctx.font = '22px Inter, sans-serif';
  ctx.fillText('00:15', 1800, 1036);
  ctx.font = '18px Inter, sans-serif';
  ctx.fillStyle = '#94a3b8';
  ctx.fillText('18.10.2026', 1780, 1062);

  return new THREE.CanvasTexture(canvas);
}

export function createBarcodeTexture() {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');

  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 512, 256);

  ctx.fillStyle = '#000000';
  for (let x = 40; x < 472; x += 10) {
    const w = Math.random() > 0.4 ? 6 : 3;
    ctx.fillRect(x, 40, w, 140);
  }

  ctx.font = 'bold 28px monospace';
  ctx.textAlign = 'center';
  ctx.fillText('8 690123 456789', 256, 220);

  return new THREE.CanvasTexture(canvas);
}
