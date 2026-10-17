import * as THREE from 'three';
import { createScreenTexture } from './textureHelpers.js';

/**
 * 13. Ekran (Monitör) 3D Modeli
 */
export function createMonitorModel() {
  const group = new THREE.Group();

  // Monitör Kasası / İnce Çerçeve
  const frameGeo = new THREE.BoxGeometry(6.4, 3.8, 0.25);
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4, metalness: 0.6 });
  const frame = new THREE.Mesh(frameGeo, frameMat);
  frame.position.y = 2.4;
  group.add(frame);

  // Parlak Ekran Paneli (Masaüstü Görüntüsü ile)
  const screenGeo = new THREE.PlaneGeometry(6.1, 3.5);
  const screenMat = new THREE.MeshBasicMaterial({
    map: createScreenTexture()
  });
  const screen = new THREE.Mesh(screenGeo, screenMat);
  screen.position.set(0, 2.4, 0.13);
  group.add(screen);

  // Monitör Boynu (Stand Column)
  const neckGeo = new THREE.CylinderGeometry(0.18, 0.22, 1.6, 16);
  const neckMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.2 });
  const neck = new THREE.Mesh(neckGeo, neckMat);
  neck.position.set(0, 0.8, -0.2);
  group.add(neck);

  // Monitör Tabanı (V-Tipi veya Dairesel Şık Taban)
  const baseGeo = new THREE.BoxGeometry(2.6, 0.1, 1.8);
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.7, roughness: 0.3 });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.set(0, 0.05, 0);
  group.add(base);

  // Güç Gösterge LED'i
  const ledGeo = new THREE.SphereGeometry(0.04, 8, 8);
  const ledMat = new THREE.MeshBasicMaterial({ color: 0x38bdf8 });
  const led = new THREE.Mesh(ledGeo, ledMat);
  led.position.set(2.8, 0.6, 0.13);
  group.add(led);

  return group;
}

/**
 * 14. Hoparlör / Kulaklık 3D Modeli (Masaüstü Stereo Hoparlör Seti)
 */
export function createSpeakerModel() {
  const group = new THREE.Group();

  const speakers = [-1.8, 1.8];
  const cones = [];

  speakers.forEach(x => {
    const speakerGroup = new THREE.Group();
    speakerGroup.position.set(x, 1.6, 0);

    // Ahşap / Mat Siyah Hoparlör Kabini
    const cabGeo = new THREE.BoxGeometry(1.8, 3.2, 1.8);
    const cabMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.5 });
    const cabinet = new THREE.Mesh(cabGeo, cabMat);
    speakerGroup.add(cabinet);

    // Büyük Bas Sürücüsü (Woofer Koni)
    const wooferRimGeo = new THREE.TorusGeometry(0.55, 0.06, 16, 32);
    const wooferRimMat = new THREE.MeshStandardMaterial({ color: 0xe11d48, metalness: 0.8 });
    const wooferRim = new THREE.Mesh(wooferRimGeo, wooferRimMat);
    wooferRim.position.set(0, -0.4, 0.91);
    speakerGroup.add(wooferRim);

    const wooferConeGeo = new THREE.CylinderGeometry(0.5, 0.1, 0.25, 24);
    const wooferConeMat = new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.3 });
    const wooferCone = new THREE.Mesh(wooferConeGeo, wooferConeMat);
    wooferCone.rotation.x = Math.PI / 2;
    wooferCone.position.set(0, -0.4, 0.85);
    speakerGroup.add(wooferCone);
    cones.push(wooferCone);

    // Küçük Tiz Sürücüsü (Tweeter)
    const tweetGeo = new THREE.SphereGeometry(0.22, 16, 16);
    const tweetMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.2 });
    const tweet = new THREE.Mesh(tweetGeo, tweetMat);
    tweet.position.set(0, 0.7, 0.85);
    speakerGroup.add(tweet);

    // Sağ hoparlörde Ses Ayar Düğmesi
    if (x > 0) {
      const volGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.15, 16);
      const volMat = new THREE.MeshStandardMaterial({ color: 0xe11d48, metalness: 0.7 });
      const vol = new THREE.Mesh(volGeo, volMat);
      vol.rotation.x = Math.PI / 2;
      vol.position.set(0, -1.2, 0.92);
      speakerGroup.add(vol);
    }

    group.add(speakerGroup);
  });

  // İki hoparlör arasındaki bağlantı kablosu
  const cableCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(-1.8, 0.2, -0.9),
    new THREE.Vector3(-0.9, 0.05, -1.2),
    new THREE.Vector3(0.9, 0.05, -1.2),
    new THREE.Vector3(1.8, 0.2, -0.9)
  );
  const cableGeo = new THREE.TubeGeometry(cableCurve, 20, 0.03, 8, false);
  const cableMat = new THREE.MeshStandardMaterial({ color: 0x09090b });
  const cable = new THREE.Mesh(cableGeo, cableMat);
  group.add(cable);

  group.update = (time) => {
    // Ses çalarken woofer konilerinin ritmik titreşimi
    const beat = Math.sin(time * 8) * 0.05;
    cones.forEach(c => {
      c.position.z = 0.85 + beat;
    });
  };

  return group;
}

/**
 * 15. Yazıcı (Printer) 3D Modeli
 */
export function createPrinterModel() {
  const group = new THREE.Group();

  // Yazıcı Ana Gövdesi
  const bodyGeo = new THREE.BoxGeometry(4.4, 1.8, 3.2);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0xf8fafc, roughness: 0.3 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 1.0;
  group.add(body);

  // Üst Kapak ve Tarayıcı Camı Alanı
  const lidGeo = new THREE.BoxGeometry(4.4, 0.2, 3.2);
  const lidMat = new THREE.MeshStandardMaterial({ color: 0x334155, roughness: 0.4 });
  const lid = new THREE.Mesh(lidGeo, lidMat);
  lid.position.y = 1.95;
  group.add(lid);

  // Arka Kâğıt Besleme Tepsisi
  const paperTrayGeo = new THREE.BoxGeometry(3.0, 0.1, 1.6);
  const paperTrayMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
  const paperTray = new THREE.Mesh(paperTrayGeo, paperTrayMat);
  paperTray.rotation.x = -0.6;
  paperTray.position.set(0, 2.2, -1.6);
  group.add(paperTray);

  // Tepsideki Beyaz Kâğıtlar
  const sheetsGeo = new THREE.BoxGeometry(2.4, 0.15, 1.4);
  const sheetsMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.9 });
  const sheets = new THREE.Mesh(sheetsGeo, sheetsMat);
  sheets.rotation.x = -0.6;
  sheets.position.set(0, 2.3, -1.5);
  group.add(sheets);

  // Ön Kâğıt Çıkış Yuvası
  const exitSlotGeo = new THREE.BoxGeometry(2.8, 0.25, 0.6);
  const exitSlotMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
  const exitSlot = new THREE.Mesh(exitSlotGeo, exitSlotMat);
  exitSlot.position.set(0, 0.6, 1.4);
  group.add(exitSlot);

  // Çıkan Renkli Baskılı Kâğıt
  const printedPaperGeo = new THREE.PlaneGeometry(2.2, 1.6);
  // Basılı kâğıt dokusu
  const canvas = document.createElement('canvas');
  canvas.width = 256;
  canvas.height = 256;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#ffffff';
  ctx.fillRect(0, 0, 256, 256);
  ctx.fillStyle = '#3b82f6';
  ctx.fillRect(20, 20, 216, 40);
  ctx.fillStyle = '#ffffff';
  ctx.font = 'bold 20px sans-serif';
  ctx.fillText('BTY 5. SINIF', 30, 48);
  ctx.fillStyle = '#10b981';
  ctx.fillRect(20, 80, 100, 60);
  ctx.fillStyle = '#64748b';
  for (let l = 0; l < 5; l++) {
    ctx.fillRect(130, 85 + l * 12, 100, 5);
  }
  const paperTexture = new THREE.CanvasTexture(canvas);

  const printedPaperMat = new THREE.MeshBasicMaterial({
    map: paperTexture,
    side: THREE.DoubleSide
  });
  const printedPaper = new THREE.Mesh(printedPaperGeo, printedPaperMat);
  printedPaper.rotation.x = -Math.PI / 2 + 0.15;
  printedPaper.position.set(0, 0.65, 2.0);
  group.add(printedPaper);

  // Kontrol Paneli ve Güç Düğmesi
  const panelGeo = new THREE.BoxGeometry(0.8, 0.4, 0.05);
  const panelMat = new THREE.MeshStandardMaterial({ color: 0x1e293b });
  const panel = new THREE.Mesh(panelGeo, panelMat);
  panel.position.set(1.5, 1.4, 1.62);
  group.add(panel);

  const btnGeo = new THREE.SphereGeometry(0.08, 12, 12);
  const btnMat = new THREE.MeshBasicMaterial({ color: 0x84cc16 });
  const btn = new THREE.Mesh(btnGeo, btnMat);
  btn.position.set(1.7, 1.4, 1.65);
  group.add(btn);

  return group;
}

/**
 * 16. Projeksiyon Cihazı 3D Modeli
 */
export function createProjectorModel() {
  const group = new THREE.Group();

  // Projeksiyon Gövdesi (Kompakt Şık Kutu)
  const bodyGeo = new THREE.BoxGeometry(4.2, 1.4, 3.4);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.35, metalness: 0.5 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 1.0;
  group.add(body);

  // Ön Büyük Projeksiyon Merceği
  const lensRingGeo = new THREE.CylinderGeometry(0.65, 0.65, 0.3, 24);
  const lensRingMat = new THREE.MeshStandardMaterial({ color: 0xfbbf24, metalness: 0.9 });
  const lensRing = new THREE.Mesh(lensRingGeo, lensRingMat);
  lensRing.rotation.x = Math.PI / 2;
  lensRing.position.set(-1.0, 1.0, 1.75);
  group.add(lensRing);

  const lensGlassGeo = new THREE.SphereGeometry(0.5, 24, 16);
  const lensGlassMat = new THREE.MeshStandardMaterial({
    color: 0x67e8f9,
    roughness: 0.1,
    metalness: 0.9,
    emissive: 0x06b6d4,
    emissiveIntensity: 0.6
  });
  const lensGlass = new THREE.Mesh(lensGlassGeo, lensGlassMat);
  lensGlass.position.set(-1.0, 1.0, 1.85);
  group.add(lensGlass);

  // Işık Huzmesi Konisi (Volumetrik Işık Efekti)
  const beamGeo = new THREE.ConeGeometry(2.5, 5.0, 32, 1, true);
  const beamMat = new THREE.MeshBasicMaterial({
    color: 0x38bdf8,
    transparent: true,
    opacity: 0.25,
    side: THREE.DoubleSide
  });
  const beam = new THREE.Mesh(beamGeo, beamMat);
  beam.rotation.x = -Math.PI / 2;
  beam.position.set(-1.0, 1.0, 4.4);
  group.add(beam);

  // Yan Havalandırma Izgaraları
  const ventGeo = new THREE.BoxGeometry(0.05, 0.8, 2.2);
  const ventMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
  const ventRight = new THREE.Mesh(ventGeo, ventMat);
  ventRight.position.set(2.11, 1.0, 0);
  group.add(ventRight);

  // Üst Tuş Takımı
  const topBtnGeo = new THREE.BoxGeometry(0.2, 0.05, 0.2);
  const topBtnMat = new THREE.MeshStandardMaterial({ color: 0x64748b });
  for (let i = 0; i < 4; i++) {
    const btn = new THREE.Mesh(topBtnGeo, topBtnMat);
    btn.position.set(1.0 + (i % 2) * 0.35, 1.72, -0.4 + Math.floor(i / 2) * 0.35);
    group.add(btn);
  }

  // Ayarlanabilir Ön Yükseklik Vidası
  const footGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.35, 16);
  const footMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8 });
  const foot = new THREE.Mesh(footGeo, footMat);
  foot.position.set(0, 0.15, 1.4);
  group.add(foot);

  group.update = (time) => {
    // Işık huzmesi titreşim efekti
    beamMat.opacity = 0.2 + Math.sin(time * 6) * 0.06;
  };

  return group;
}
