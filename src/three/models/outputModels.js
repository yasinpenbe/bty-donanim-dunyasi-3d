import * as THREE from 'three';
import { createScreenTexture } from './textureHelpers.js';

/**
 * 13. Ekran (27" Çerçevesiz IPS Monitör) Gerçekçi 3D Modeli
 */
export function createMonitorModel() {
  const group = new THREE.Group();

  // 3 Tarafı Mikro Kenarlı Ultra İnce Çerçeve (Micro-Edge Bezel)
  const frameGeo = new THREE.BoxGeometry(6.6, 4.0, 0.18);
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x09090b,
    roughness: 0.35,
    metalness: 0.6
  });
  const frame = new THREE.Mesh(frameGeo, frameMat);
  frame.position.y = 2.5;
  group.add(frame);

  // Parlama Önleyici (Anti-Glare) Mat IPS Ekran Paneli
  const screenGeo = new THREE.PlaneGeometry(6.4, 3.8);
  const screenMat = new THREE.MeshBasicMaterial({
    map: createScreenTexture()
  });
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.set(0, 2.5, 0.095);
  group.add(screen);

  // Fırçalanmış Koyu Titanyum Monitör Ayağı ve Boynu
  const neckGeo = new THREE.BoxGeometry(0.35, 1.8, 0.25);
  const neckMat = new THREE.MeshStandardMaterial({
    color: 0x64748b,
    metalness: 0.92,
    roughness: 0.2
  });
  const neck = new THREE.Mesh(neckGeo, neckMat);
  neck.position.set(0, 0.9, -0.2);
  group.add(neck);

  // V-Tipi / Düz İnce Metal Taban
  const baseGeo = new THREE.BoxGeometry(2.8, 0.08, 1.8);
  const base = new THREE.Mesh(baseGeo, neckMat);
  base.position.set(0, 0.04, 0);
  group.add(base);

  // Arka VESA Montaj Alanı
  const vesaGeo = new THREE.BoxGeometry(1.2, 1.2, 0.08);
  const vesa = new THREE.Mesh(vesaGeo, frameMat);
  vesa.position.set(0, 2.5, -0.12);
  group.add(vesa);

  return group;
}

/**
 * 14. Hoparlör (Stüdyo Referans Monitörü) Gerçekçi 3D Modeli
 */
export function createSpeakerModel() {
  const group = new THREE.Group();

  const speakers = [-1.8, 1.8];
  const cones = [];

  speakers.forEach(x => {
    const speakerGroup = new THREE.Group();
    speakerGroup.position.set(x, 1.7, 0);

    // Ağır Akustik Yoğun Ahşap MDF Kabin (Mat Siyah Vinil Kaplama)
    const cabGeo = new THREE.BoxGeometry(1.9, 3.4, 2.0);
    const cabMat = new THREE.MeshStandardMaterial({
      color: 0x18181b,
      roughness: 0.5,
      metalness: 0.1
    });
    const cabinet = new THREE.Mesh(cabGeo, cabMat);
    speakerGroup.add(cabinet);

    // 5-İnç Sarı Dokuma Kevlar Woofer Koni (KRK Stili)
    const wooferRimGeo = new THREE.TorusGeometry(0.58, 0.06, 16, 32);
    const wooferRimMat = new THREE.MeshStandardMaterial({ color: 0x09090b, metalness: 0.8 });
    const wooferRim = new THREE.Mesh(wooferRimGeo, wooferRimMat);
    wooferRim.position.set(0, -0.4, 1.01);
    speakerGroup.add(wooferRim);

    const wooferConeGeo = new THREE.CylinderGeometry(0.52, 0.12, 0.22, 32);
    const wooferConeMat = new THREE.MeshStandardMaterial({
      color: 0xeab308, // Sarı Kevlar
      roughness: 0.4,
      metalness: 0.15
    });
    const wooferCone = new THREE.Mesh(wooferConeGeo, wooferConeMat);
    wooferCone.rotation.x = Math.PI / 2;
    wooferCone.position.set(0, -0.4, 0.96);
    speakerGroup.add(wooferCone);
    cones.push(wooferCone);

    // 1-İnç İpek Kubbe Tiz Sürücüsü (Silk Dome Tweeter)
    const tweetGeo = new THREE.SphereGeometry(0.24, 24, 16);
    const tweetMat = new THREE.MeshStandardMaterial({
      color: 0x09090b,
      roughness: 0.15,
      metalness: 0.8
    });
    const tweet = new THREE.Mesh(tweetGeo, tweetMat);
    tweet.position.set(0, 0.75, 0.96);
    speakerGroup.add(tweet);

    // Ön Bas Refleks Akustik Hava Portu (Bass Port)
    const portGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.4, 24);
    const portMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
    const port = new THREE.Mesh(portGeo, portMat);
    port.rotation.x = Math.PI / 2;
    port.position.set(0, -1.2, 0.95);
    speakerGroup.add(port);

    group.add(speakerGroup);
  });

  group.update = (time) => {
    const pulse = Math.sin(time * 9) * 0.04;
    cones.forEach(c => {
      c.position.z = 0.96 + pulse;
    });
  };

  return group;
}

/**
 * 15. Yazıcı (Çok Fonksiyonlu Renkli Lazer/Mürekkep) Gerçekçi 3D Modeli
 */
export function createPrinterModel() {
  const group = new THREE.Group();

  // Mat Beyaz ve Antrasit Çift Tonlu Kompakt Gövde
  const bodyGeo = new THREE.BoxGeometry(4.6, 2.0, 3.4);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0xf8fafc,
    roughness: 0.35,
    metalness: 0.15
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 1.0;
  group.add(body);

  // Üst Düz Yataklı Tarayıcı Kapağı
  const lidGeo = new THREE.BoxGeometry(4.6, 0.18, 3.4);
  const lidMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4, metalness: 0.3 });
  const lid = new THREE.Mesh(lidGeo, lidMat);
  lid.position.y = 2.05;
  group.add(lid);

  // Arka Kâğıt Besleme Tepsisi ve Beyaz Kâğıtlar
  const trayMat = new THREE.MeshStandardMaterial({ color: 0x64748b, roughness: 0.5 });
  const paperTray = new THREE.Mesh(new THREE.BoxGeometry(3.2, 0.08, 1.6), trayMat);
  paperTray.rotation.x = -0.55;
  paperTray.position.set(0, 2.3, -1.7);
  group.add(paperTray);

  const sheetsMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.85 });
  const sheets = new THREE.Mesh(new THREE.BoxGeometry(2.6, 0.12, 1.4), sheetsMat);
  sheets.rotation.x = -0.55;
  sheets.position.set(0, 2.38, -1.6);
  group.add(sheets);

  // Ön Kâğıt Çıkış Ağzı ve Basılmış Belge
  const exitSlot = new THREE.Mesh(new THREE.BoxGeometry(3.0, 0.22, 0.5), new THREE.MeshBasicMaterial({ color: 0x09090b }));
  exitSlot.position.set(0, 0.7, 1.5);
  group.add(exitSlot);

  // Çıkan Renkli Grafik Test Sayfası
  const paperGeo = new THREE.PlaneGeometry(2.4, 1.8);
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 512;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 512, 512);

  // Sayfa Üst Başlığı
  ctx.fillStyle = '#0284c7';
  ctx.fillRect(30, 30, 452, 60);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 32px sans-serif';
  ctx.fillText('BTY 5. SINIF DERS NOTU', 50, 72);

  // Renkli Görsel ve Metin Çizgileri
  ctx.fillStyle = '#10b981';
  ctx.fillRect(30, 120, 200, 140);
  ctx.fillStyle = '#64748b';
  for (let l = 0; l < 8; l++) {
    ctx.fillRect(250, 130 + l * 20, 230, 8);
  }
  const paperTexture = new THREE.CanvasTexture(canvas);

  const printedPaper = new THREE.Mesh(paperGeo, new THREE.MeshBasicMaterial({ map: paperTexture, side: THREE.DoubleSide }));
  printedPaper.rotation.x = -Math.PI / 2 + 0.12;
  printedPaper.position.set(0, 0.75, 2.15);
  group.add(printedPaper);

  return group;
}

/**
 * 16. Projeksiyon Cihazı (Full HD Optik Lensli) Gerçekçi 3D Modeli
 */
export function createProjectorModel() {
  const group = new THREE.Group();

  // Eloksallı Antrasit Şık Gövde
  const bodyGeo = new THREE.BoxGeometry(4.4, 1.5, 3.6);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    metalness: 0.8,
    roughness: 0.25
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 1.0;
  group.add(body);

  // Tırtıklı Odak Halkalı Büyük Optik Cam Projeksiyon Lensi
  const lensRingGeo = new THREE.CylinderGeometry(0.72, 0.72, 0.35, 32);
  const lensRingMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d8,
    metalness: 0.95,
    roughness: 0.15
  });
  const lensRing = new THREE.Mesh(lensRingGeo, lensRingMat);
  lensRing.rotation.x = Math.PI / 2;
  lensRing.position.set(-1.1, 1.0, 1.85);
  group.add(lensRing);

  // Parlak Yansıtıcı Optik Cam
  const lensGlassGeo = new THREE.SphereGeometry(0.56, 32, 24);
  const lensGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0x38bdf8,
    transmission: 0.8,
    ior: 1.6,
    roughness: 0.05,
    metalness: 0.1,
    emissive: 0x0284c7,
    emissiveIntensity: 0.8
  });
  const lensGlass = new THREE.Mesh(lensGlassGeo, lensGlassMat);
  lensGlass.position.set(-1.1, 1.0, 1.95);
  group.add(lensGlass);

  // Volumetrik Işık Huzmesi Konisi
  const beamGeo = new THREE.ConeGeometry(2.6, 5.4, 32, 1, true);
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0x7dd3fc,
    transparent: true,
    opacity: 0.28,
    side: THREE.DoubleSide
  });
  const beam = new THREE.Mesh(beamGeo, beamMat);
  beam.rotation.x = -Math.PI / 2;
  beam.position.set(-1.1, 1.0, 4.7);
  group.add(beam);

  // Yan Isı Tahliye Izgaraları
  const ventGeo = new THREE.BoxGeometry(0.06, 0.9, 2.4);
  const ventMat = new THREE.MeshBasicMaterial({ color: 0x09090b });
  const vent = new THREE.Mesh(ventGeo, ventMat);
  vent.position.set(2.21, 1.0, 0);
  group.add(vent);

  group.update = (time) => {
    beamMat.opacity = 0.22 + Math.sin(time * 6) * 0.06;
  };

  return group;
}
