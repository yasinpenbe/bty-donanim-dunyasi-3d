import * as THREE from 'three';
import { 
  createPcbTexture, 
  createCpuTexture, 
  createCpuPinTexture,
  createRamTexture, 
  createSsdTexture,
  createGpuBackplateTexture
} from './textureHelpers.js';

/**
 * 1. Anakart (Motherboard) Gerçekçi 3D Modeli
 */
export function createMotherboardModel() {
  const group = new THREE.Group();

  // 10-Katmanlı Mat Siyah Yüksek Kalite PCB
  const pcbGeo = new THREE.BoxGeometry(6.4, 0.16, 6.4);
  const pcbMat = new THREE.MeshStandardMaterial({
    color: 0x090d14,
    roughness: 0.35,
    metalness: 0.25,
    map: createPcbTexture('#090d14')
  });
  const pcb = new THREE.Mesh(pcbGeo, pcbMat);
  pcb.castShadow = true;
  pcb.receiveShadow = true;
  group.add(pcb);

  // LGA-1700 Nikel Kaplama Metal CPU Soketi
  const socketBaseGeo = new THREE.BoxGeometry(1.8, 0.12, 1.8);
  const socketMetalMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d8,
    metalness: 0.95,
    roughness: 0.18
  });
  const socketBase = new THREE.Mesh(socketBaseGeo, socketMetalMat);
  socketBase.position.set(-0.6, 0.12, -0.6);
  group.add(socketBase);

  // Soket Kilitleme Mandalı (Metal Kolu)
  const leverGeo = new THREE.CylinderGeometry(0.04, 0.04, 2.0, 12);
  const lever = new THREE.Mesh(leverGeo, socketMetalMat);
  lever.rotation.z = Math.PI / 2;
  lever.position.set(-0.6, 0.22, 0.4);
  group.add(lever);

  // DDR5 Bellek Yuvaları (4 Adet, Çelik Zırhlı)
  const ddrSlotGeo = new THREE.BoxGeometry(0.2, 0.28, 3.0);
  const ddrSlotMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.5 });
  const ddrArmorMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.9, roughness: 0.2 });

  for (let i = 0; i < 4; i++) {
    const slot = new THREE.Mesh(ddrSlotGeo, ddrSlotMat);
    slot.position.set(1.2 + i * 0.32, 0.18, -0.6);
    group.add(slot);

    // Yan kilit mandalları
    const clipGeo = new THREE.BoxGeometry(0.22, 0.38, 0.16);
    const clip1 = new THREE.Mesh(clipGeo, ddrArmorMat);
    clip1.position.set(1.2 + i * 0.32, 0.24, -2.1);
    const clip2 = new THREE.Mesh(clipGeo, ddrArmorMat);
    clip2.position.set(1.2 + i * 0.32, 0.24, 0.9);
    group.add(clip1, clip2);
  }

  // PCIe x16 Çelik Korumalı (Steel Armor) Ekran Kartı Yuvası
  const pcieGeo = new THREE.BoxGeometry(4.0, 0.28, 0.22);
  const pcieSteelMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    metalness: 0.95,
    roughness: 0.15
  });
  const pcieSlot = new THREE.Mesh(pcieGeo, pcieSteelMat);
  pcieSlot.position.set(-0.5, 0.18, 1.4);
  group.add(pcieSlot);

  // İkinci PCIe Yuvası
  const pcie2 = new THREE.Mesh(pcieGeo, new THREE.MeshStandardMaterial({ color: 0x27272a, roughness: 0.4 }));
  pcie2.position.set(-0.5, 0.18, 2.4);
  group.add(pcie2);

  // M.2 Alüminyum Soğutucu Zırhı (Shield Frozr)
  const m2ArmorGeo = new THREE.BoxGeometry(2.4, 0.2, 0.7);
  const m2ArmorMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.85,
    roughness: 0.25
  });
  const m2Armor = new THREE.Mesh(m2ArmorGeo, m2ArmorMat);
  m2Armor.position.set(-0.5, 0.18, 0.45);
  group.add(m2Armor);

  // VRM Ağır Alüminyum Isı Blokları (Heatsinks)
  const vrmMat = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    metalness: 0.9,
    roughness: 0.2
  });
  const vrmTop = new THREE.Mesh(new THREE.BoxGeometry(2.4, 0.9, 0.8), vrmMat);
  vrmTop.position.set(-0.6, 0.52, -2.1);
  const vrmLeft = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.9, 2.4), vrmMat);
  vrmLeft.position.set(-2.0, 0.52, -0.6);
  group.add(vrmTop, vrmLeft);

  // Arka I/O Port Kalkanı (Entegre Giriş/Çıkış Paneli)
  const ioGeo = new THREE.BoxGeometry(0.8, 1.2, 3.8);
  const ioMat = new THREE.MeshStandardMaterial({
    color: 0x334155,
    metalness: 0.85,
    roughness: 0.3
  });
  const ioShield = new THREE.Mesh(ioGeo, ioMat);
  ioShield.position.set(-2.8, 0.65, -0.6);
  group.add(ioShield);

  // Altın Kaplama Ses Çıkış Jakları (Audio Jacks)
  const jackGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.25, 16);
  const jackMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95, roughness: 0.1 });
  for (let j = 0; j < 3; j++) {
    const jack = new THREE.Mesh(jackGeo, jackMat);
    jack.rotation.z = Math.PI / 2;
    jack.position.set(-3.22, 0.4 + j * 0.35, 0.8);
    group.add(jack);
  }

  // Katı Hal Japon Kondansatörleri (Solid Black Capacitors)
  const capGeo = new THREE.CylinderGeometry(0.12, 0.12, 0.35, 16);
  const capMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.9,
    roughness: 0.2
  });
  for (let c = 0; c < 12; c++) {
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.set(-1.4, 0.24, -1.8 + c * 0.32);
    group.add(cap);
  }

  // Anakart Çipset Soğutucusu (PCH Heatsink)
  const pchGeo = new THREE.BoxGeometry(1.6, 0.55, 1.6);
  const pchMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.9,
    roughness: 0.2
  });
  const pch = new THREE.Mesh(pchGeo, pchMat);
  pch.position.set(1.6, 0.35, 1.8);
  group.add(pch);

  // RGB Durum Göstergesi
  const debugLedGeo = new THREE.BoxGeometry(0.2, 0.1, 0.3);
  const debugLedMat = new THREE.MeshBasicMaterial({ color: 0x22c55e });
  const debugLed = new THREE.Mesh(debugLedGeo, debugLedMat);
  debugLed.position.set(2.8, 0.16, 2.8);
  group.add(debugLed);

  return group;
}

/**
 * 2. İşlemci / CPU Gerçekçi 3D Modeli
 */
export function createCpuModel() {
  const group = new THREE.Group();

  // Koyu Yeşil/Siyah Çok Katmanlı PCB Taşıyıcı
  const baseGeo = new THREE.BoxGeometry(3.6, 0.12, 3.6);
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0x052e16,
    roughness: 0.3,
    metalness: 0.2
  });
  const base = new THREE.Mesh(baseGeo, baseMat);
  group.add(base);

  // Nikel Kaplamalı Bakır Isı Dağıtıcı Kapak (IHS)
  const ihsGeo = new THREE.BoxGeometry(3.0, 0.22, 3.0);
  const ihsMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.92,
    roughness: 0.22,
    map: createCpuTexture()
  });
  const ihs = new THREE.Mesh(ihsGeo, ihsMat);
  ihs.position.y = 0.16;
  group.add(ihs);

  // Altın Temas Pini Matrisi (LGA-1700 Tabanı)
  const pinsGeo = new THREE.PlaneGeometry(3.4, 3.4);
  const pinsMat = new THREE.MeshStandardMaterial({
    map: createCpuPinTexture(),
    metalness: 0.85,
    roughness: 0.3
  });
  const pins = new THREE.Mesh(pinsGeo, pinsMat);
  pins.rotation.x = Math.PI / 2;
  pins.position.y = -0.065;
  group.add(pins);

  // İki Kenardaki Hizalama Çentikleri
  const notchGeo = new THREE.BoxGeometry(0.15, 0.15, 0.3);
  const notchMat = new THREE.MeshStandardMaterial({ color: 0x052e16 });
  const notch1 = new THREE.Mesh(notchGeo, notchMat);
  notch1.position.set(-1.8, 0, 0);
  const notch2 = new THREE.Mesh(notchGeo, notchMat);
  notch2.position.set(1.8, 0, 0);
  group.add(notch1, notch2);

  return group;
}

/**
 * 3. RAM Bellek (DDR5) Gerçekçi 3D Modeli
 */
export function createRamModel() {
  const group = new THREE.Group();

  // 10 Katmanlı Mat Siyah PCB
  const pcbGeo = new THREE.BoxGeometry(5.4, 1.4, 0.08);
  const pcbMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.4 });
  const pcb = new THREE.Mesh(pcbGeo, pcbMat);
  group.add(pcb);

  // 288-Pin Altın Temas Parmakları ve Kilit Çentiği
  const pinLeftGeo = new THREE.BoxGeometry(2.4, 0.25, 0.1);
  const pinRightGeo = new THREE.BoxGeometry(2.7, 0.25, 0.1);
  const pinMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.95,
    roughness: 0.15
  });
  const pinLeft = new THREE.Mesh(pinLeftGeo, pinMat);
  pinLeft.position.set(-1.4, -0.68, 0);
  const pinRight = new THREE.Mesh(pinRightGeo, pinMat);
  pinRight.position.set(1.25, -0.68, 0);
  group.add(pinLeft, pinRight);

  // Çift Taraflı Eloksallı Siyah Alüminyum Soğutucu Zırhı
  const sinkGeo = new THREE.BoxGeometry(5.4, 1.15, 0.22);
  const sinkMat = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    metalness: 0.85,
    roughness: 0.25,
    map: createRamTexture()
  });
  const sink = new THREE.Mesh(sinkGeo, sinkMat);
  sink.position.y = 0.08;
  group.add(sink);

  // Üst Buzlu Difüzörlü RGB Işık Şeridi
  const rgbGeo = new THREE.BoxGeometry(5.3, 0.18, 0.24);
  const rgbMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x0284c7,
    emissiveIntensity: 0.8,
    roughness: 0.2,
    transparent: true,
    opacity: 0.95
  });
  const rgb = new THREE.Mesh(rgbGeo, rgbMat);
  rgb.position.y = 0.72;
  group.add(rgb);

  // RGB Akıcı Dalgalanma Animasyonu
  group.update = (time) => {
    const hue = (time * 0.12) % 1;
    rgbMat.color.setHSL(hue, 0.9, 0.5);
    rgbMat.emissive.setHSL(hue, 0.9, 0.5);
  };

  return group;
}

/**
 * 4. Sabit Disk / NVMe M.2 SSD Gerçekçi 3D Modeli
 */
export function createSsdModel() {
  const group = new THREE.Group();

  // M.2 2280 Standart Mat Siyah PCB
  const pcbGeo = new THREE.BoxGeometry(5.2, 0.08, 1.4);
  const pcbMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.35 });
  const pcb = new THREE.Mesh(pcbGeo, pcbMat);
  group.add(pcb);

  // Altın M.2 M-Key Pin Uçları
  const pinGeo = new THREE.BoxGeometry(0.35, 0.1, 1.25);
  const pinMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95, roughness: 0.15 });
  const pin = new THREE.Mesh(pinGeo, pinMat);
  pin.position.x = -2.5;
  group.add(pin);

  // Nikel Kaplamalı Yüksek Hızlı Bellek Denetleyici Yonga (Phoenix / Pascal Controller)
  const ctrlGeo = new THREE.BoxGeometry(0.85, 0.14, 0.85);
  const ctrlMat = new THREE.MeshStandardMaterial({
    color: 0xd4d4d8,
    metalness: 0.95,
    roughness: 0.15
  });
  const ctrl = new THREE.Mesh(ctrlGeo, ctrlMat);
  ctrl.position.set(-1.2, 0.1, 0);
  group.add(ctrl);

  // V-NAND Flash Depolama Yongaları (2 Adet Siyah Entegre)
  const nandGeo = new THREE.BoxGeometry(1.1, 0.12, 1.1);
  const nandMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.4 });
  const nand1 = new THREE.Mesh(nandGeo, nandMat);
  nand1.position.set(0.3, 0.09, 0);
  const nand2 = new THREE.Mesh(nandGeo, nandMat);
  nand2.position.set(1.6, 0.09, 0);
  group.add(nand1, nand2);

  // Bakır Dağıtıcı Katmanlı Gerçekçi Termal Etiket
  const labelGeo = new THREE.BoxGeometry(4.0, 0.04, 1.25);
  const labelMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.35,
    metalness: 0.2,
    map: createSsdTexture()
  });
  const label = new THREE.Mesh(labelGeo, labelMat);
  label.position.set(0.4, 0.18, 0);
  group.add(label);

  // Yarım Daire Montaj Vidası Çentiği
  const screwNotchGeo = new THREE.CylinderGeometry(0.2, 0.2, 0.12, 16);
  const screwNotchMat = new THREE.MeshStandardMaterial({ color: 0xd4d4d8, metalness: 0.9 });
  const screwNotch = new THREE.Mesh(screwNotchGeo, screwNotchMat);
  screwNotch.position.set(2.55, 0, 0);
  group.add(screwNotch);

  return group;
}

/**
 * 5. Ekran Kartı (GPU - RTX 4070 Ti Stili) Gerçekçi 3D Modeli
 */
export function createGpuModel() {
  const group = new THREE.Group();

  // Fırçalanmış Koyu Titanyum Dış Zırh (Shroud)
  const shroudGeo = new THREE.BoxGeometry(5.8, 2.4, 1.3);
  const shroudMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.85,
    roughness: 0.25
  });
  const shroud = new THREE.Mesh(shroudGeo, shroudMat);
  group.add(shroud);

  // Yoğun Alüminyum Soğutucu Kanatçıklar Bloğu (Heatsink Fin Stack)
  const finGeo = new THREE.BoxGeometry(0.02, 2.0, 1.1);
  const finMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.15 });
  for (let f = 0; f < 35; f++) {
    const fin = new THREE.Mesh(finGeo, finMat);
    fin.position.set(-2.5 + f * 0.14, 0, 0);
    group.add(fin);
  }

  // Kanatçıkların İçinden Geçen Bakır Isı Boruları (Copper Heatpipes)
  for (let p = 0; p < 3; p++) {
    const pipeGeo = new THREE.CylinderGeometry(0.07, 0.07, 5.4, 16);
    const pipeMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.95, roughness: 0.15 });
    const pipe = new THREE.Mesh(pipeGeo, pipeMat);
    pipe.rotation.z = Math.PI / 2;
    pipe.position.set(0, -0.5 + p * 0.5, 0.2);
    group.add(pipe);
  }

  // Fırçalanmış Arka Koruma Plakası (Backplate)
  const backplateGeo = new THREE.BoxGeometry(5.8, 2.4, 0.05);
  const backplateMat = new THREE.MeshStandardMaterial({
    color: 0x0f172a,
    metalness: 0.9,
    roughness: 0.2,
    map: createGpuBackplateTexture()
  });
  const backplate = new THREE.Mesh(backplateGeo, backplateMat);
  backplate.position.z = -0.66;
  group.add(backplate);

  // İki Adet Dönen Yüksek Verimli Aerodinamik Fan
  const fans = [];
  const fanX = [-1.4, 1.4];

  fanX.forEach(x => {
    // Metalik Fan Çemberi
    const ringGeo = new THREE.TorusGeometry(0.9, 0.06, 16, 32);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.9 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.set(x, 0, 0.66);
    group.add(ring);

    const fanGroup = new THREE.Group();
    fanGroup.position.set(x, 0, 0.66);

    // Metal Merkez Rozet
    const hubGeo = new THREE.CylinderGeometry(0.32, 0.32, 0.12, 24);
    const hubMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.95, roughness: 0.15 });
    const hub = new THREE.Mesh(hubGeo, hubMat);
    hub.rotation.x = Math.PI / 2;
    fanGroup.add(hub);

    // 9 Adet Kavisli Füme Kanat
    for (let i = 0; i < 9; i++) {
      const bladeGeo = new THREE.BoxGeometry(0.68, 0.18, 0.03);
      const bladeMat = new THREE.MeshStandardMaterial({
        color: 0x18181b,
        roughness: 0.35,
        transparent: true,
        opacity: 0.92
      });
      const blade = new THREE.Mesh(bladeGeo, bladeMat);
      const angle = (i / 9) * Math.PI * 2;
      blade.position.set(Math.cos(angle) * 0.48, Math.sin(angle) * 0.48, 0);
      blade.rotation.z = angle + 0.32;
      blade.rotation.y = 0.35;
      fanGroup.add(blade);
    }

    fans.push(fanGroup);
    group.add(fanGroup);
  });

  // PCIe x16 Altın Bağlantı Tırnağı
  const pcieGeo = new THREE.BoxGeometry(4.0, 0.28, 0.08);
  const pcieMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.95, roughness: 0.15 });
  const pcie = new THREE.Mesh(pcieGeo, pcieMat);
  pcie.position.set(-0.5, -1.32, 0);
  group.add(pcie);

  // Çift Yuvalı (Dual-Slot) Arka Metal Çıkış Braketi
  const bracketGeo = new THREE.BoxGeometry(0.12, 3.0, 1.4);
  const bracketMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.95, roughness: 0.1 });
  const bracket = new THREE.Mesh(bracketGeo, bracketMat);
  bracket.position.set(-2.95, 0.2, 0);
  group.add(bracket);

  group.update = (time, delta = 0.016) => {
    fans.forEach(f => {
      f.rotation.z += delta * 14;
    });
  };

  return group;
}

/**
 * 6. Güç Kaynağı / PSU Gerçekçi 3D Modeli
 */
export function createPsuModel() {
  const group = new THREE.Group();

  // Mat Siyah Çelik Toz Boyalı Gövde
  const boxGeo = new THREE.BoxGeometry(4.2, 2.7, 3.8);
  const boxMat = new THREE.MeshStandardMaterial({
    color: 0x18181b,
    roughness: 0.45,
    metalness: 0.6
  });
  const box = new THREE.Mesh(boxGeo, boxMat);
  group.add(box);

  // 120mm Üst Fan Yuvarlak Tel Izgarası
  const grillGeo = new THREE.TorusGeometry(1.3, 0.06, 16, 32);
  const grillMat = new THREE.MeshStandardMaterial({ color: 0xd4d4d8, metalness: 0.95, roughness: 0.1 });
  const grill = new THREE.Mesh(grillGeo, grillMat);
  grill.rotation.x = Math.PI / 2;
  grill.position.y = 1.36;
  group.add(grill);

  // 7 Kanatlı Dönen Sessiz Hidrolik Fan
  const fanGroup = new THREE.Group();
  fanGroup.position.y = 1.3;
  fanGroup.rotation.x = Math.PI / 2;

  const hubGeo = new THREE.CylinderGeometry(0.4, 0.4, 0.08, 24);
  const hubMat = new THREE.MeshStandardMaterial({ color: 0x27272a, metalness: 0.5 });
  const hub = new THREE.Mesh(hubGeo, hubMat);
  fanGroup.add(hub);

  for (let i = 0; i < 7; i++) {
    const bladeGeo = new THREE.BoxGeometry(0.85, 0.22, 0.03);
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0x09090b });
    const blade = new THREE.Mesh(bladeGeo, bladeMat);
    const angle = (i / 7) * Math.PI * 2;
    blade.position.set(Math.cos(angle) * 0.58, 0, Math.sin(angle) * 0.58);
    blade.rotation.y = angle;
    blade.rotation.x = 0.35;
    fanGroup.add(blade);
  }
  group.add(fanGroup);

  // Arka Güç Girişi Soketi ve I/O Açma Anahtarı
  const plugGeo = new THREE.BoxGeometry(0.8, 0.5, 0.1);
  const plugMat = new THREE.MeshStandardMaterial({ color: 0x000000 });
  const plug = new THREE.Mesh(plugGeo, plugMat);
  plug.position.set(1.1, 0.4, 1.91);
  group.add(plug);

  const switchGeo = new THREE.BoxGeometry(0.35, 0.45, 0.12);
  const switchMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
  const pwrSwitch = new THREE.Mesh(switchGeo, switchMat);
  pwrSwitch.position.set(-0.8, 0.4, 1.92);
  group.add(pwrSwitch);

  // Örgülü Siyah Güç Kabloları (Braided Sleeved ATX & PCIe Cables)
  const cableMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.6 });
  for (let i = 0; i < 8; i++) {
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-1.4 + (i % 4) * 0.4, -0.6 + Math.floor(i / 4) * 0.4, -1.9),
      new THREE.Vector3(-1.8 + (i % 4) * 0.5, -1.0, -2.8),
      new THREE.Vector3(-1.2 + (i % 4) * 0.4, -1.2, -3.6),
      new THREE.Vector3(-0.6 + (i % 4) * 0.3, -0.8, -4.4)
    );
    const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.06, 8, false);
    const tube = new THREE.Mesh(tubeGeo, cableMat);
    group.add(tube);
  }

  group.update = (time, delta = 0.016) => {
    fanGroup.rotation.y += delta * 10;
  };

  return group;
}

/**
 * 7. Soğutucu Kule Fan (Tower Cooler) Gerçekçi 3D Modeli
 */
export function createCoolerModel() {
  const group = new THREE.Group();

  // Ayna Parlaklığında Masif Bakır Taban Bloğu
  const baseGeo = new THREE.BoxGeometry(1.8, 0.28, 1.8);
  const baseMat = new THREE.MeshStandardMaterial({
    color: 0xd97706,
    metalness: 0.95,
    roughness: 0.1
  });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = -1.2;
  group.add(base);

  // 4 Adet U-Tipi Nikel Kaplamalı Bakır Isı Borusu
  const pipeMat = new THREE.MeshStandardMaterial({
    color: 0xf59e0b,
    metalness: 0.95,
    roughness: 0.15
  });
  for (let i = 0; i < 4; i++) {
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-0.5 + (i % 2) * 1.0, -1.2, -0.4 + Math.floor(i / 2) * 0.8),
      new THREE.Vector3(-0.8 + (i % 2) * 1.6, -0.2, -0.4 + Math.floor(i / 2) * 0.8),
      new THREE.Vector3(-0.5 + (i % 2) * 1.0, 1.3, -0.4 + Math.floor(i / 2) * 0.8),
      new THREE.Vector3(0, 1.45, -0.4 + Math.floor(i / 2) * 0.8)
    );
    const pipeGeo = new THREE.TubeGeometry(curve, 18, 0.08, 8, false);
    const pipe = new THREE.Mesh(pipeGeo, pipeMat);
    group.add(pipe);
  }

  // 36 Katlı Hassas Alüminyum Soğutucu Kanatçıklar Kulesi
  const finGeo = new THREE.BoxGeometry(2.5, 0.02, 2.2);
  const finMat = new THREE.MeshStandardMaterial({
    color: 0xf1f5f9,
    metalness: 0.9,
    roughness: 0.2
  });
  for (let i = 0; i < 36; i++) {
    const fin = new THREE.Mesh(finGeo, finMat);
    fin.position.y = -1.0 + i * 0.065;
    group.add(fin);
  }

  // 120mm Ön Soğutma Fanı Ünitesi
  const fanGroup = new THREE.Group();
  fanGroup.position.set(0, 0.1, 1.25);

  // Kauçuk Titreşim Önleyici Köşe Pedleri Olan Fan Çerçevesi
  const frameGeo = new THREE.BoxGeometry(2.4, 2.4, 0.25);
  const frameMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.4 });
  const fanFrame = new THREE.Mesh(frameGeo, frameMat);
  fanGroup.add(fanFrame);

  // Fan Pervanesi ve Motor Göbeği
  const rotorGroup = new THREE.Group();
  const hubGeo = new THREE.CylinderGeometry(0.38, 0.38, 0.18, 24);
  const hubMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.8 });
  const hub = new THREE.Mesh(hubGeo, hubMat);
  hub.rotation.x = Math.PI / 2;
  rotorGroup.add(hub);

  // 9 Adet Buzlu Yarı Saydam Kanat
  for (let i = 0; i < 9; i++) {
    const bladeGeo = new THREE.BoxGeometry(0.8, 0.22, 0.03);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0xf8fafc,
      roughness: 0.25,
      transparent: true,
      opacity: 0.9
    });
    const blade = new THREE.Mesh(bladeGeo, bladeMat);
    const angle = (i / 9) * Math.PI * 2;
    blade.position.set(Math.cos(angle) * 0.5, Math.sin(angle) * 0.5, 0);
    blade.rotation.z = angle + 0.35;
    blade.rotation.y = 0.35;
    rotorGroup.add(blade);
  }
  fanGroup.add(rotorGroup);
  group.add(fanGroup);

  group.update = (time, delta = 0.016) => {
    rotorGroup.rotation.z += delta * 16;
  };

  return group;
}
