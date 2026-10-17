import * as THREE from 'three';
import { createBarcodeTexture } from './textureHelpers.js';

/**
 * 8. Klavye (Mekanik Alüminyum Şasili) Gerçekçi 3D Modeli
 */
export function createKeyboardModel() {
  const group = new THREE.Group();

  // CNC İşlemeli Uçak Sınıfı Eloksallı Alüminyum Üst Gövde
  const plateGeo = new THREE.BoxGeometry(6.4, 0.22, 2.6);
  const plateMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.85,
    roughness: 0.25
  });
  const plate = new THREE.Mesh(plateGeo, plateMat);
  plate.rotation.x = 0.08;
  group.add(plate);

  // Eğimli Mat Siyah Alt Kasa
  const bottomGeo = new THREE.BoxGeometry(6.3, 0.2, 2.5);
  const bottomMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.6 });
  const bottom = new THREE.Mesh(bottomGeo, bottomMat);
  bottom.position.y = -0.12;
  bottom.rotation.x = 0.08;
  group.add(bottom);

  // Çift Katmanlı PBT Tuş Takımı (Sculpted PBT Keycaps)
  const keyRows = 5;
  const keyCols = 15;
  const keyGeo = new THREE.BoxGeometry(0.32, 0.16, 0.32);
  const keyDarkMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.35 });
  const keyAccentMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, roughness: 0.3 });

  for (let r = 0; r < keyRows; r++) {
    for (let c = 0; c < keyCols; c++) {
      if (r === 4 && c >= 4 && c <= 9) {
        // Geniş Spacebar
        if (c === 4) {
          const spaceGeo = new THREE.BoxGeometry(2.2, 0.16, 0.32);
          const spaceKey = new THREE.Mesh(spaceGeo, keyDarkMat);
          spaceKey.position.set(0, 0.18 - r * 0.015, -0.72 + r * 0.4);
          spaceKey.rotation.x = 0.08;
          group.add(spaceKey);
        }
        continue;
      }

      const isEnterOrEsc = (r === 0 && c === 0) || (r === 2 && c === 14);
      const keyMesh = new THREE.Mesh(keyGeo, isEnterOrEsc ? keyAccentMat : keyDarkMat);
      const posX = -2.7 + c * 0.39;
      const posZ = -0.72 + r * 0.4;
      keyMesh.position.set(posX, 0.18 - r * 0.015, posZ);
      keyMesh.rotation.x = 0.08;
      group.add(keyMesh);
    }
  }

  // Örgülü USB-C Bağlantı Kablosu
  const cableCurve = new THREE.CubicBezierCurve3(
    new THREE.Vector3(0, 0.1, -1.3),
    new THREE.Vector3(0, 0.1, -2.0),
    new THREE.Vector3(0.6, 0.1, -2.6),
    new THREE.Vector3(1.4, 0.1, -3.2)
  );
  const cableGeo = new THREE.TubeGeometry(cableCurve, 20, 0.05, 8, false);
  const cableMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.6 });
  const cable = new THREE.Mesh(cableGeo, cableMat);
  group.add(cable);

  return group;
}

/**
 * 9. Fare (Mouse - Ergonomik Hassas Sensörlü) Gerçekçi 3D Modeli
 */
export function createMouseModel() {
  const group = new THREE.Group();

  // Ergonomik Mat PBT Üst Gövde
  const bodyGeo = new THREE.SphereGeometry(1.6, 32, 24);
  bodyGeo.scale(0.85, 0.52, 1.3);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    roughness: 0.35,
    metalness: 0.25
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.position.y = 0.45;
  group.add(body);

  // Ayrık Sol/Sağ Tıklama Tuşları Arası Hassas Aralık
  const slitGeo = new THREE.BoxGeometry(0.03, 0.28, 1.3);
  const slitMat = new THREE.MeshStandardMaterial({ color: 0x09090b });
  const slit = new THREE.Mesh(slitGeo, slitMat);
  slit.position.set(0, 0.88, 0.75);
  group.add(slit);

  // Dokulu Metalik & Kauçuk Kaydırma Tekerleği
  const wheelGeo = new THREE.CylinderGeometry(0.28, 0.28, 0.18, 24);
  const wheelMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    metalness: 0.9,
    roughness: 0.2
  });
  const wheel = new THREE.Mesh(wheelGeo, wheelMat);
  wheel.rotation.z = Math.PI / 2;
  wheel.position.set(0, 0.9, 0.7);
  group.add(wheel);

  // Ergonomik Başparmak Dayama Alanı ve Yan Tuşlar
  const sideThumbGeo = new THREE.BoxGeometry(0.12, 0.22, 0.55);
  const sideThumbMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.5 });
  const sideBtn = new THREE.Mesh(sideThumbGeo, sideThumbMat);
  sideBtn.position.set(-1.26, 0.5, -0.1);
  group.add(sideBtn);

  // Alt Taban ve Beyaz PTFE Kayma Ayakları (Glide Feet)
  const baseGeo = new THREE.CylinderGeometry(1.25, 1.25, 0.1, 32);
  baseGeo.scale(0.8, 1, 1.2);
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.5 });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = 0.05;
  group.add(base);

  // PTFE Beyaz Sürtünmesiz Ayaklar
  const footGeo = new THREE.BoxGeometry(0.9, 0.02, 0.25);
  const footMat = new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.1 });
  const footFront = new THREE.Mesh(footGeo, footMat);
  footFront.position.set(0, 0.01, 1.1);
  const footRear = new THREE.Mesh(footGeo, footMat);
  footRear.position.set(0, 0.01, -1.1);
  group.add(footFront, footRear);

  // Optik Lazer Sensör Açıklığı
  const sensorGeo = new THREE.CylinderGeometry(0.15, 0.15, 0.05, 16);
  const sensorMat = new THREE.MeshBasicMaterial({ color: 0xef4444 });
  const sensor = new THREE.Mesh(sensorGeo, sensorMat);
  sensor.position.set(0, 0.02, 0);
  group.add(sensor);

  group.update = (time, delta = 0.016) => {
    wheel.rotation.x += delta * 3;
  };

  return group;
}

/**
 * 10. Mikrofon (Stüdyo Yayıncı Tipi) Gerçekçi 3D Modeli
 */
export function createMicrophoneModel() {
  const group = new THREE.Group();

  // Ağır Döküm Çelik Masaüstü Standı
  const baseGeo = new THREE.CylinderGeometry(1.3, 1.4, 0.22, 32);
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    metalness: 0.9,
    roughness: 0.25
  });
  const base = new THREE.Mesh(baseGeo, baseMat);
  group.add(base);

  // Fırçalanmış Paslanmaz Çelik Taşıyıcı Kol
  const stemGeo = new THREE.CylinderGeometry(0.14, 0.14, 1.8, 16);
  const stemMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d8,
    metalness: 0.95,
    roughness: 0.15
  });
  const stem = new THREE.Mesh(stemGeo, stemMat);
  stem.position.y = 1.0;
  group.add(stem);

  // U-Tipi Profesyonel Askı Braketi
  const yokeGeo = new THREE.TorusGeometry(0.85, 0.08, 16, 32, Math.PI);
  const yoke = new THREE.Mesh(yokeGeo, stemMat);
  yoke.position.y = 2.0;
  yoke.rotation.z = Math.PI;
  group.add(yoke);

  // Mikrofon Kapsülü Ünitesi
  const micGroup = new THREE.Group();
  micGroup.position.y = 2.45;

  // Döküm Çinko Mat Gövde
  const micBodyGeo = new THREE.CylinderGeometry(0.58, 0.58, 1.4, 32);
  const micBodyMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    roughness: 0.35,
    metalness: 0.7
  });
  const micBody = new THREE.Mesh(micBodyGeo, micBodyMat);
  micGroup.add(micBody);

  // Çok Katmanlı Paslanmaz Tel Örgü Kapsül Başlığı
  const meshHeadGeo = new THREE.SphereGeometry(0.59, 32, 24);
  meshHeadGeo.scale(1, 1.45, 1);
  const meshHeadMat = new THREE.MeshStandardMaterial({
    color: 0x94a3b8,
    metalness: 0.95,
    roughness: 0.15,
    wireframe: true
  });
  const meshHead = new THREE.Mesh(meshHeadGeo, meshHeadMat);
  meshHead.position.y = 0.95;
  micGroup.add(meshHead);

  // Hassas Kazanç (Gain) Düğmesi
  const knobGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.16, 24);
  const knobMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.9, roughness: 0.1 });
  const knob = new THREE.Mesh(knobGeo, knobMat);
  knob.rotation.x = Math.PI / 2;
  knob.position.set(0, 0.1, 0.58);
  micGroup.add(knob);

  group.add(micGroup);

  return group;
}

/**
 * 11. Web Kamerası (4K Optik Cam Lensli) Gerçekçi 3D Modeli
 */
export function createWebcamModel() {
  const group = new THREE.Group();

  // Çift Menteşeli Ayarlanabilir Monitör Klipsi
  const clipMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.5 });
  const clipBase = new THREE.Mesh(new THREE.BoxGeometry(1.6, 0.18, 1.2), clipMat);
  group.add(clipBase);

  const clipArm = new THREE.Mesh(new THREE.BoxGeometry(1.4, 0.15, 1.1), clipMat);
  clipArm.position.set(0, -0.4, -0.6);
  clipArm.rotation.x = 0.8;
  group.add(clipArm);

  // Alüminyum Şık Kamera Silindiri
  const bodyGeo = new THREE.CylinderGeometry(0.68, 0.68, 3.4, 32);
  const bodyMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.85,
    roughness: 0.2
  });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  body.rotation.z = Math.PI / 2;
  body.position.y = 0.95;
  group.add(body);

  // Çok Katmanlı Kaplamalı Optik Cam Lens (Anti-Reflective Coating)
  const lensRimGeo = new THREE.CylinderGeometry(0.52, 0.52, 0.2, 32);
  const lensRimMat = new THREE.MeshStandardMaterial({ color: 0xd4d4d8, metalness: 0.95, roughness: 0.1 });
  const lensRim = new THREE.Mesh(lensRimGeo, lensRimMat);
  lensRim.rotation.x = Math.PI / 2;
  lensRim.position.set(0, 0.95, 0.68);
  group.add(lensRim);

  const lensGlassGeo = new THREE.SphereGeometry(0.42, 32, 24);
  const lensGlassMat = new THREE.MeshPhysicalMaterial({
    color: 0x0369a1,
    transmission: 0.85,
    opacity: 1,
    transparent: true,
    roughness: 0.05,
    ior: 1.52,
    reflectivity: 0.9
  });
  const lensGlass = new THREE.Mesh(lensGlassGeo, lensGlassMat);
  lensGlass.position.set(0, 0.95, 0.74);
  group.add(lensGlass);

  // Stereo Gürültü Engelleyici Mikrofon Açıklıkları
  const holeGeo = new THREE.CylinderGeometry(0.07, 0.07, 0.1, 16);
  const holeMat = new THREE.MeshBasicMaterial({ color: 0x000000 });
  const hole1 = new THREE.Mesh(holeGeo, holeMat);
  hole1.rotation.x = Math.PI / 2;
  hole1.position.set(-1.1, 0.95, 0.68);
  const hole2 = new THREE.Mesh(holeGeo, holeMat);
  hole2.rotation.x = Math.PI / 2;
  hole2.position.set(1.1, 0.95, 0.68);
  group.add(hole1, hole2);

  // Durum LED Göstergesi (Yeşil)
  const led = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 12), new THREE.MeshBasicMaterial({ color: 0x10b981 }));
  led.position.set(-0.6, 1.26, 0.58);
  group.add(led);

  return group;
}

/**
 * 12. Barkod Okuyucu (Endüstriyel El Tipi Lazer Tabanca) Gerçekçi 3D Modeli
 */
export function createBarcodeModel() {
  const group = new THREE.Group();

  // Kauçuk Kaplamalı Ergonomik Tutma Kabzası
  const handleGeo = new THREE.CylinderGeometry(0.42, 0.52, 2.5, 24);
  const handleMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    roughness: 0.6,
    metalness: 0.2
  });
  const handle = new THREE.Mesh(handleGeo, handleMat);
  handle.rotation.z = 0.25;
  handle.position.set(-0.4, 0.85, 0);
  group.add(handle);

  // Darbe Emici Kauçuk Çerçeveli Kafa Ünitesi
  const headGeo = new THREE.BoxGeometry(2.5, 1.2, 1.5);
  const headMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.7,
    roughness: 0.3
  });
  const head = new THREE.Mesh(headGeo, headMat);
  head.position.set(0.2, 2.1, 0);
  group.add(head);

  // Sarı Dokunsal Tetik Butonu
  const triggerGeo = new THREE.BoxGeometry(0.26, 0.48, 0.3);
  const triggerMat = new THREE.MeshStandardMaterial({ color: 0xeab308, roughness: 0.3 });
  const trigger = new THREE.Mesh(triggerGeo, triggerMat);
  trigger.position.set(-0.16, 1.55, 0);
  group.add(trigger);

  // Optik Tarama Ön Camı
  const scanWindowGeo = new THREE.PlaneGeometry(1.3, 1.0);
  const scanWindowMat = new THREE.MeshStandardMaterial({
    color: 0xdc2626,
    emissive: 0xdc2626,
    emissiveIntensity: 0.9,
    metalness: 0.8
  });
  const scanWindow = new THREE.Mesh(scanWindowGeo, scanWindowMat);
  scanWindow.rotation.y = Math.PI / 2;
  scanWindow.position.set(1.46, 2.1, 0);
  group.add(scanWindow);

  // Hassas Kırmızı Lazer Işın Çizgisi
  const laserGeo = new THREE.PlaneGeometry(3.2, 0.04);
  const laserMat = new THREE.MeshBasicMaterial({
    color: 0xff0000,
    side: THREE.DoubleSide,
    transparent: true,
    opacity: 0.9
  });
  const laser = new THREE.Mesh(laserGeo, laserMat);
  laser.position.set(3.05, 2.1, 0);
  group.add(laser);

  // Örnek Gerçekçi Barkod Kartı
  const cardGeo = new THREE.PlaneGeometry(2.0, 1.2);
  const cardMat = new THREE.MeshBasicMaterial({
    map: createBarcodeTexture(),
    side: THREE.DoubleSide
  });
  const card = new THREE.Mesh(cardGeo, cardMat);
  card.rotation.y = -Math.PI / 2;
  card.position.set(4.65, 2.1, 0);
  group.add(card);

  return group;
}
