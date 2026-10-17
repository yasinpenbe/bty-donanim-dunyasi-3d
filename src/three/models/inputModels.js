import * as THREE from 'three';
import { createBarcodeTexture } from './textureHelpers.js';

/**
 * 8. Klavye 3D Modeli
 */
export function createKeyboardModel() {
  const group = new THREE.Group();

  // Klavye Kasası (Hafif eğimli)
  const caseGeo = new THREE.BoxGeometry(6.2, 0.28, 2.5);
  const caseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6, metalness: 0.2 });
  const kbdCase = new THREE.Mesh(caseGeo, caseMat);
  kbdCase.rotation.x = 0.08;
  group.add(kbdCase);

  // RGB Taban Aydınlatması (Glow Plate)
  const rgbPlateGeo = new THREE.BoxGeometry(6.0, 0.04, 2.3);
  const rgbPlateMat = new THREE.MeshStandardMaterial({
    color: 0x6366f1,
    emissive: 0x6366f1,
    emissiveIntensity: 0.7
  });
  const rgbPlate = new THREE.Mesh(rgbPlateGeo, rgbPlateMat);
  rgbPlate.position.set(0, 0.15, 0);
  rgbPlate.rotation.x = 0.08;
  group.add(rgbPlate);

  // Tuşlar (Grid Şeklinde Dizilmiş Tuş Takımı)
  const keyRows = 5;
  const keyCols = 15;
  const keyGeo = new THREE.BoxGeometry(0.3, 0.15, 0.3);
  const keyMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.4 });
  const keyEnterMat = new THREE.MeshStandardMaterial({ color: 0x10b981, roughness: 0.3 });

  for (let r = 0; r < keyRows; r++) {
    for (let c = 0; c < keyCols; c++) {
      // Boşluk tuşu (Spacebar) kontrolü
      if (r === 4 && c >= 4 && c <= 9) {
        if (c === 4) {
          const spaceGeo = new THREE.BoxGeometry(2.1, 0.15, 0.3);
          const spaceKey = new THREE.Mesh(spaceGeo, keyMat);
          spaceKey.position.set(0, 0.22 - r * 0.015, -0.7 + r * 0.38);
          spaceKey.rotation.x = 0.08;
          group.add(spaceKey);
        }
        continue;
      }

      const isEnter = (r === 2 && c === 14);
      const keyMesh = new THREE.Mesh(keyGeo, isEnter ? keyEnterMat : keyMat);
      const posX = -2.6 + c * 0.37;
      const posZ = -0.7 + r * 0.38;
      keyMesh.position.set(posX, 0.22 - r * 0.015, posZ);
      keyMesh.rotation.x = 0.08;
      group.add(keyMesh);
    }
  }

  // USB Kablosu
  const cableCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, 0.1, -1.25),
    new THREE.Vector3(0, 0.1, -1.8),
    new THREE.Vector3(0.5, 0.1, -2.4),
    new THREE.Vector3(1.2, 0.1, -3.0)
  );
  const cableGeo = new THREE.TubeGeometry(cableCurve, 20, 0.04, 8, false);
  const cableMat = new THREE.MeshStandardMaterial({ color: 0x09090b });
  const cable = new THREE.Mesh(cableGeo, cableMat);
  group.add(cable);

  group.update = (time) => {
    const hue = (time * 0.15) % 1;
    rgbPlateMat.color.setHSL(hue, 0.9, 0.5);
    rgbPlateMat.emissive.setHSL(hue, 0.9, 0.5);
  };

  return group;
}

/**
 * 9. Fare (Mouse) 3D Modeli
 */
export function createMouseModel() {
  const group = new THREE.Group();

  // Ergonomik Gövde (Ölçeklenmiş Küre)
  const bodyGeo = new THREE.SphereGeometry(1.6, 32, 24);
  bodyGeo.scale(0.85, 0.55, 1.3);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    roughness: 0.35,
    metalness: 0.3
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 0.45;
  group.add(body);

  // Sol & Sağ Tuş Ayırma Çizgisi
  const slitGeo = new THREE.BoxGeometry(0.04, 0.3, 1.2);
  const slitMat = new THREE.MeshStandardMaterial({ color: 0x09090b });
  const slit = new THREE.Mesh(slitGeo, slitMat);
  slit.position.set(0, 0.9, 0.8);
  group.add(slit);

  // Kaydırma Tekerleği (Scroll Wheel)
  const wheelGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.18, 24);
  const wheelMat = new THREE.MeshStandardMaterial({
    color: 0xec4899,
    emissive: 0xec4899,
    emissiveIntensity: 0.8,
    roughness: 0.2
  });
  const wheel = new THREE.Mesh(wheelGeo, wheelMat);
  wheel.rotation.z = Math.PI / 2;
  wheel.position.set(0, 0.92, 0.7);
  group.add(wheel);

  // Yan Başparmak Tuşları
  const sideBtnGeo = new THREE.BoxGeometry(0.12, 0.2, 0.5);
  const sideBtnMat = new THREE.MeshStandardMaterial({ color: 0x3f3f46 });
  const sideBtn = new THREE.Mesh(sideBtnGeo, sideBtnMat);
  sideBtn.position.set(-1.28, 0.5, -0.1);
  group.add(sideBtn);

  // Taban ve Optik Lazer Sensörü (Kırmızı Işık)
  const baseGeo = new THREE.CylinderGeometry(1.3, 1.3, 0.1, 32);
  baseGeo.scale(0.8, 1, 1.2);
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x09090b });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = 0.05;
  group.add(base);

  const sensorGeo = new THREE.SphereGeometry(0.12, 16, 16);
  const sensorMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  const sensor = new THREE.Mesh(sensorGeo, sensorMat);
  sensor.position.set(0, 0.06, 0);
  group.add(sensor);

  // Kablo
  const cableCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, 0.3, 1.95),
    new THREE.Vector3(0, 0.3, 2.6),
    new THREE.Vector3(-0.4, 0.2, 3.2),
    new THREE.Vector3(-0.8, 0.1, 3.8)
  );
  const cableGeo = new THREE.TubeGeometry(cableCurve, 16, 0.04, 8, false);
  const cableMat = new THREE.MeshStandardMaterial({ color: 0x09090b });
  const cable = new THREE.Mesh(cableGeo, cableMat);
  group.add(cable);

  group.update = (time, delta = 0.016) => {
    wheel.rotation.x += delta * 4;
  };

  return group;
}

/**
 * 10. Mikrofon 3D Modeli (Stüdyo Masaüstü Kondenser Mikrofonu)
 */
export function createMicrophoneModel() {
  const group = new THREE.Group();

  // Dairesel Masa Standı Tabanı
  const baseGeo = new THREE.CylinderGeometry(1.2, 1.3, 0.2, 32);
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.8, roughness: 0.3 });
  const base = new THREE.Mesh(baseGeo, baseMat);
  group.add(base);

  // Taşıyıcı Dik Metal Çubuk
  const rodGeo = new THREE.CylinderGeometry(0.12, 0.12, 1.8, 16);
  const rodMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.95, roughness: 0.1 });
  const rod = new THREE.Mesh(rodGeo, rodMat);
  rod.position.y = 1.0;
  group.add(rod);

  // U-Tipi Süspansiyon / Tutucu Çatal
  const forkGeo = new THREE.TorusGeometry(0.75, 0.08, 16, 32, Math.PI);
  const fork = new THREE.Mesh(forkGeo, rodMat);
  fork.position.y = 2.0;
  fork.rotation.z = Math.PI;
  group.add(fork);

  // Mikrofon Kapsülü Gövdesi
  const micGroup = new THREE.Group();
  micGroup.position.y = 2.4;

  const micBodyGeo = new THREE.CylinderGeometry(0.55, 0.55, 1.4, 24);
  const micBodyMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3, metalness: 0.7 });
  const micBody = new THREE.Mesh(micBodyGeo, micBodyMat);
  micGroup.add(micBody);

  // Metalik Tel Izgara Başlık (Mesh Head)
  const meshHeadGeo = new THREE.SphereGeometry(0.56, 24, 16);
  meshHeadGeo.scale(1, 1.4, 1);
  const meshHeadMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.95,
    roughness: 0.15,
    wireframe: true
  });
  const meshHead = new THREE.Mesh(meshHeadGeo, meshHeadMat);
  meshHead.position.y = 0.9;
  micGroup.add(meshHead);

  // Kazanç / Ses Ayar Düğmesi
  const knobGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.15, 16);
  const knobMat = new THREE.MeshStandardMaterial({ color: 0x14b8a6, metalness: 0.6 });
  const knob = new THREE.Mesh(knobGeo, knobMat);
  knob.rotation.x = Math.PI / 2;
  knob.position.set(0, 0, 0.55);
  micGroup.add(knob);

  // Durum LED Işık Halkası (Mavi/Yeşil)
  const ringGeo = new THREE.TorusGeometry(0.56, 0.05, 16, 32);
  const ringMat = new THREE.MeshStandardMaterial({
    color: 0x14b8a6,
    emissive: 0x14b8a6,
    emissiveIntensity: 0.9
  });
  const ring = new THREE.Mesh(ringGeo, ringMat);
  ring.rotation.x = Math.PI / 2;
  ring.position.y = 0.45;
  micGroup.add(ring);

  group.add(micGroup);

  group.update = (time) => {
    // Ses dalgası titreşim simülasyonu
    const pulse = 0.7 + Math.sin(time * 4) * 0.3;
    ringMat.emissiveIntensity = pulse;
  };

  return group;
}

/**
 * 11. Web Kamerası 3D Modeli
 */
export function createWebcamModel() {
  const group = new THREE.Group();

  // Monitör Klipsi (Alt Ayak)
  const clipBaseGeo = new THREE.BoxGeometry(1.6, 0.2, 1.2);
  const clipMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.6 });
  const clipBase = new THREE.Mesh(clipBaseGeo, clipMat);
  group.add(clipBase);

  const clipArmGeo = new THREE.BoxGeometry(1.4, 0.15, 1.0);
  const clipArm = new THREE.Mesh(clipArmGeo, clipMat);
  clipArm.position.set(0, -0.4, -0.6);
  clipArm.rotation.x = 0.8;
  group.add(clipArm);

  // Kamera Ana Gövdesi (Yatay oval kapsül)
  const bodyGeo = new THREE.CylinderGeometry(0.65, 0.65, 3.2, 32);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3, metalness: 0.6 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.rotation.z = Math.PI / 2;
  body.position.y = 0.95;
  group.add(body);

  // Parlak Cam Objektif (Mercek)
  const lensRimGeo = new THREE.CylinderGeometry(0.5, 0.5, 0.2, 24);
  const lensRimMat = new THREE.MeshStandardMaterial({ color: 0xf97316, metalness: 0.9 });
  const lensRim = new THREE.Mesh(lensRimGeo, lensRimMat);
  lensRim.rotation.x = Math.PI / 2;
  lensRim.position.set(0, 0.95, 0.65);
  group.add(lensRim);

  const lensGlassGeo = new THREE.SphereGeometry(0.38, 24, 16);
  const lensGlassMat = new THREE.MeshStandardMaterial({
    color: 0x0284c7,
    roughness: 0.1,
    metalness: 0.9,
    transparent: true,
    opacity: 0.8
  });
  const lensGlass = new THREE.Mesh(lensGlassGeo, lensGlassMat);
  lensGlass.position.set(0, 0.95, 0.72);
  group.add(lensGlass);

  // Çift Stereo Mikrofon Delikleri
  const holeGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.1, 12);
  const holeMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const hole1 = new THREE.Mesh(holeGeo, holeMat);
  hole1.rotation.x = Math.PI / 2;
  hole1.position.set(-1.0, 0.95, 0.65);
  const hole2 = new THREE.Mesh(holeGeo, holeMat);
  hole2.rotation.x = Math.PI / 2;
  hole2.position.set(1.0, 0.95, 0.65);
  group.add(hole1, hole2);

  // Canlı Yayın LED Işığı (Yeşil)
  const ledGeo = new THREE.SphereGeometry(0.07, 12, 12);
  const ledMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
  const led = new THREE.Mesh(ledGeo, ledMat);
  led.position.set(-0.6, 1.25, 0.55);
  group.add(led);

  return group;
}

/**
 * 12. Barkod Okuyucu 3D Modeli (El Tipi Lazerli Okuyucu Tabanca)
 */
export function createBarcodeModel() {
  const group = new THREE.Group();

  // Ergonomik Tutma Sapı
  const handleGeo = new THREE.CylinderGeometry(0.4, 0.5, 2.4, 16);
  const handleMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.5 });
  const handle = new THREE.Mesh(handleGeo, handleMat);
  handle.rotation.z = 0.25;
  handle.position.set(-0.4, 0.8, 0);
  group.add(handle);

  // Okuyucu Kafa Kısmı
  const headGeo = new THREE.BoxGeometry(2.4, 1.1, 1.4);
  const headMat = new THREE.MeshStandardMaterial({ color: 0xa855f7, roughness: 0.4, metalness: 0.3 });
  const head = new THREE.Mesh(headGeo, headMat);
  head.position.set(0.2, 2.0, 0);
  group.add(head);

  // Sarı Tetik Düğmesi
  const triggerGeo = new THREE.BoxGeometry(0.25, 0.45, 0.3);
  const triggerMat = new THREE.MeshStandardMaterial({ color: 0xfacc15, roughness: 0.3 });
  const trigger = new THREE.Mesh(triggerGeo, triggerMat);
  trigger.position.set(-0.15, 1.5, 0);
  group.add(trigger);

  // Ön Lazer Tarama Penceresi
  const windowGeo = new THREE.PlaneGeometry(1.2, 0.9);
  const windowMat = new THREE.MeshStandardMaterial({
    color: 0xef4444,
    emissive: 0xef4444,
    emissiveIntensity: 0.8
  });
  const scanWindow = new THREE.Mesh(windowGeo, windowMat);
  scanWindow.rotation.y = Math.PI / 2;
  scanWindow.position.set(1.41, 2.0, 0);
  group.add(scanWindow);

  // Lazer Işık Çizgisi Projeksiyonu
  const laserGeo = new THREE.PlaneGeometry(3.0, 0.05);
  const laserMat = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.85
  });
  const laserBeam = new THREE.Mesh(laserGeo, laserMat);
  laserBeam.position.set(2.9, 2.0, 0);
  group.add(laserBeam);

  // Örnek Barkod Plaketi
  const plateGeo = new THREE.PlaneGeometry(1.8, 1.0);
  const plateMat = new THREE.MeshBasicMaterial({
    map: createBarcodeTexture(),
    side: THREE.DoubleSide
  });
  const plate = new THREE.Mesh(plateGeo, plateMat);
  plate.rotation.y = -Math.PI / 2;
  plate.position.set(4.4, 2.0, 0);
  group.add(plate);

  group.update = (time) => {
    // Lazer yanıp sönme efekti
    laserMat.opacity = 0.5 + Math.sin(time * 10) * 0.4;
  };

  return group;
}
