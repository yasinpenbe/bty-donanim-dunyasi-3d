import * as THREE from 'three';
import { 
  createPcbTexture, 
  createCpuTexture, 
  createRamTexture, 
  createSsdTexture 
} from './textureHelpers.js';

/**
 * 1. Anakart (Motherboard) 3D Modeli
 */
export function createMotherboardModel() {
  const group = new THREE.Group();

  // Ana PCB Kartı
  const pcbGeo = new THREE.BoxGeometry(6, 0.15, 6);
  const pcbMat = new THREE.MeshStandardMaterial({
    color: 0x0a2818,
    roughness: 0.4,
    metalness: 0.2,
    map: createPcbTexture('#0a2818')
  });
  const pcb = new THREE.Mesh(pcbGeo, pcbMat);
  pcb.castShadow = true;
  pcb.receiveShadow = true;
  group.add(pcb);

  // CPU Soketi (Merkezde)
  const socketGeo = new THREE.BoxGeometry(1.6, 0.12, 1.6);
  const socketMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8, roughness: 0.3 });
  const socket = new THREE.Mesh(socketGeo, socketMat);
  socket.position.set(-0.5, 0.12, -0.5);
  group.add(socket);

  // Altın CPU Pin Yatağı
  const pinBedGeo = new THREE.PlaneGeometry(1.2, 1.2);
  const pinBedMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.2 });
  const pinBed = new THREE.Mesh(pinBedGeo, pinBedMat);
  pinBed.rotation.x = -Math.PI / 2;
  pinBed.position.set(-0.5, 0.19, -0.5);
  group.add(pinBed);

  // RAM Yuvaları (4 Adet Dikey Slot)
  const ramSlotGeo = new THREE.BoxGeometry(0.18, 0.25, 2.8);
  const ramSlotMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.6 });
  for (let i = 0; i < 4; i++) {
    const slot = new THREE.Mesh(ramSlotGeo, ramSlotMat);
    slot.position.set(1.1 + i * 0.3, 0.15, -0.5);
    group.add(slot);

    // Kilit Mandalları
    const clipGeo = new THREE.BoxGeometry(0.2, 0.35, 0.15);
    const clipMat = new THREE.MeshStandardMaterial({ color: 0xffffff });
    const clipTop = new THREE.Mesh(clipGeo, clipMat);
    clipTop.position.set(1.1 + i * 0.3, 0.2, -1.9);
    const clipBottom = new THREE.Mesh(clipGeo, clipMat);
    clipBottom.position.set(1.1 + i * 0.3, 0.2, 0.9);
    group.add(clipTop, clipBottom);
  }

  // PCIe x16 Ekran Kartı Yuvaları (2 Adet Yatay Slot)
  const pcieSlotGeo = new THREE.BoxGeometry(3.6, 0.25, 0.2);
  const pcieSlotMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.5, roughness: 0.4 });
  const pcie1 = new THREE.Mesh(pcieSlotGeo, pcieSlotMat);
  pcie1.position.set(-0.5, 0.15, 1.4);
  const pcie2 = new THREE.Mesh(pcieSlotGeo, pcieSlotMat);
  pcie2.position.set(-0.5, 0.15, 2.3);
  group.add(pcie1, pcie2);

  // M.2 SSD Yuvaları
  const m2SlotGeo = new THREE.BoxGeometry(0.3, 0.1, 0.5);
  const m2SlotMat = new THREE.MeshStandardMaterial({ color: 0x000000 });
  const m2 = new THREE.Mesh(m2SlotGeo, m2SlotMat);
  m2.position.set(-0.5, 0.12, 0.6);
  group.add(m2);

  // VRM & Yonga Seti Alüminyum Soğutucu Blokları
  const vrmGeo = new THREE.BoxGeometry(0.6, 0.8, 1.8);
  const vrmMat = new THREE.MeshStandardMaterial({ color: 0x334155, metalness: 0.8, roughness: 0.2 });
  const vrm1 = new THREE.Mesh(vrmGeo, vrmMat);
  vrm1.position.set(-1.8, 0.45, -0.5);
  const vrm2 = new THREE.Mesh(new THREE.BoxGeometry(1.8, 0.8, 0.6), vrmMat);
  vrm2.position.set(-0.5, 0.45, -1.8);
  group.add(vrm1, vrm2);

  // Çipset Soğutucusu
  const chipsetGeo = new THREE.BoxGeometry(1.2, 0.5, 1.2);
  const chipsetMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, metalness: 0.9, roughness: 0.2 });
  const chipset = new THREE.Mesh(chipsetGeo, chipsetMat);
  chipset.position.set(1.5, 0.3, 1.8);
  group.add(chipset);

  // Arka Giriş-Çıkış (I/O) Port Kalkanı
  const ioGeo = new THREE.BoxGeometry(0.6, 0.9, 3.2);
  const ioMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 });
  const ioShield = new THREE.Mesh(ioGeo, ioMat);
  ioShield.position.set(-2.6, 0.5, -0.6);
  group.add(ioShield);

  // Kapasitörler (Küçük Silindirler)
  const capGeo = new THREE.CylinderGeometry(0.08, 0.08, 0.3, 12);
  const capMat = new THREE.MeshStandardMaterial({ color: 0x38bdf8, metalness: 0.9, roughness: 0.1 });
  for (let i = 0; i < 8; i++) {
    const cap = new THREE.Mesh(capGeo, capMat);
    cap.position.set(-1.3, 0.2, -1.4 + i * 0.3);
    group.add(cap);
  }

  // Durum LED'i
  const ledGeo = new THREE.SphereGeometry(0.06, 8, 8);
  const ledMat = new THREE.MeshBasicMaterial({ color: 0x10b981 });
  const led = new THREE.Mesh(ledGeo, ledMat);
  led.position.set(2.6, 0.15, 2.6);
  group.add(led);

  return group;
}

/**
 * 2. İşlemci / CPU 3D Modeli
 */
export function createCpuModel() {
  const group = new THREE.Group();

  // Yeşil PCB Taşıyıcı Altlık
  const baseGeo = new THREE.BoxGeometry(3.6, 0.12, 3.6);
  const baseMat = new THREE.MeshStandardMaterial({ color: 0x064e3b, roughness: 0.3, metalness: 0.2 });
  const base = new THREE.Mesh(baseGeo, baseMat);
  group.add(base);

  // Üst Metalik Isı Dağıtıcı Kapak (IHS)
  const ihsGeo = new THREE.BoxGeometry(3.0, 0.25, 3.0);
  const ihsMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    metalness: 0.85,
    roughness: 0.25,
    map: createCpuTexture()
  });
  const ihs = new THREE.Mesh(ihsGeo, ihsMat);
  ihs.position.y = 0.18;
  group.add(ihs);

  // Altın Temas Noktaları (Alt yüzey)
  const pinsGeo = new THREE.PlaneGeometry(3.2, 3.2);
  const pinsMat = new THREE.MeshStandardMaterial({
    color: 0xeab308,
    metalness: 0.95,
    roughness: 0.2
  });
  const pins = new THREE.Mesh(pinsGeo, pinsMat);
  pins.rotation.x = Math.PI / 2;
  pins.position.y = -0.07;
  group.add(pins);

  return group;
}

/**
 * 3. RAM Bellek 3D Modeli
 */
export function createRamModel() {
  const group = new THREE.Group();

  // Siyah/Koyu PCB
  const pcbGeo = new THREE.BoxGeometry(5.2, 1.4, 0.1);
  const pcbMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.5 });
  const pcb = new THREE.Mesh(pcbGeo, pcbMat);
  group.add(pcb);

  // Altın İletken Uçlar (Pinler)
  const pinGeo = new THREE.BoxGeometry(4.8, 0.22, 0.12);
  const pinMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.2 });
  const pin = new THREE.Mesh(pinGeo, pinMat);
  pin.position.y = -0.65;
  group.add(pin);

  // Alüminyum Soğutucu Blok (Heatsink)
  const sinkGeo = new THREE.BoxGeometry(5.2, 1.1, 0.22);
  const sinkMat = new THREE.MeshStandardMaterial({
    color: 0x1e293b,
    metalness: 0.8,
    roughness: 0.3,
    map: createRamTexture()
  });
  const sink = new THREE.Mesh(sinkGeo, sinkMat);
  sink.position.y = 0.05;
  group.add(sink);

  // RGB Üst Işık Şeridi (Glow)
  const rgbGeo = new THREE.BoxGeometry(5.1, 0.2, 0.26);
  const rgbMat = new THREE.MeshStandardMaterial({
    color: 0x06b6d4,
    emissive: 0x06b6d4,
    emissiveIntensity: 0.8,
    roughness: 0.1
  });
  const rgb = new THREE.Mesh(rgbGeo, rgbMat);
  rgb.position.y = 0.7;
  group.add(rgb);

  // Animasyon fonksiyonu (RGB dalgalanması)
  group.update = (time) => {
    const hue = (time * 0.15) % 1;
    rgbMat.color.setHSL(hue, 1, 0.5);
    rgbMat.emissive.setHSL(hue, 1, 0.5);
  };

  return group;
}

/**
 * 4. Sabit Disk / M.2 NVMe SSD 3D Modeli
 */
export function createSsdModel() {
  const group = new THREE.Group();

  // M.2 PCB Çubuğu
  const pcbGeo = new THREE.BoxGeometry(5.0, 0.1, 1.5);
  const pcbMat = new THREE.MeshStandardMaterial({ color: 0x09090b, roughness: 0.4 });
  const pcb = new THREE.Mesh(pcbGeo, pcbMat);
  group.add(pcb);

  // Altın Uç Soket Pinleri
  const pinGeo = new THREE.BoxGeometry(0.3, 0.12, 1.3);
  const pinMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.2 });
  const pin = new THREE.Mesh(pinGeo, pinMat);
  pin.position.x = -2.4;
  group.add(pin);

  // NAND Flash Bellek Yongaları
  const chipGeo = new THREE.BoxGeometry(1.0, 0.15, 1.1);
  const chipMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.2, metalness: 0.5 });
  for (let i = 0; i < 2; i++) {
    const chip = new THREE.Mesh(chipGeo, chipMat);
    chip.position.set(0.2 + i * 1.3, 0.1, 0);
    group.add(chip);
  }

  // Ana Denetleyici Yonga (Controller)
  const ctrlGeo = new THREE.BoxGeometry(0.7, 0.18, 0.7);
  const ctrlMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.9, roughness: 0.2 });
  const ctrl = new THREE.Mesh(ctrlGeo, ctrlMat);
  ctrl.position.set(-1.2, 0.12, 0);
  group.add(ctrl);

  // Üst Marka Etiketi / İnce Soğutucu
  const labelGeo = new THREE.BoxGeometry(3.6, 0.05, 1.3);
  const labelMat = new THREE.MeshStandardMaterial({
    color: 0xffffff,
    roughness: 0.4,
    map: createSsdTexture()
  });
  const label = new THREE.Mesh(labelGeo, labelMat);
  label.position.set(0.3, 0.21, 0);
  group.add(label);

  // Montaj Vida Çentiği (Yarım daire kesim)
  const notchGeo = new THREE.CylinderGeometry(0.18, 0.18, 0.15, 16);
  const notchMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.8 });
  const notch = new THREE.Mesh(notchGeo, notchMat);
  notch.position.set(2.45, 0, 0);
  group.add(notch);

  return group;
}

/**
 * 5. Ekran Kartı (GPU) 3D Modeli
 */
export function createGpuModel() {
  const group = new THREE.Group();

  // Ana Gövde / Dış Koruma Zırhı
  const bodyGeo = new THREE.BoxGeometry(5.6, 2.2, 1.1);
  const bodyMat = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.3, metalness: 0.7 });
  const body = new THREE.Mesh(bodyGeo, bodyMat);
  group.add(body);

  // Alt PCIe Bağlantı Tırnağı
  const pcieGeo = new THREE.BoxGeometry(3.8, 0.25, 0.08);
  const pcieMat = new THREE.MeshStandardMaterial({ color: 0xf59e0b, metalness: 0.9, roughness: 0.2 });
  const pcie = new THREE.Mesh(pcieGeo, pcieMat);
  pcie.position.set(-0.4, -1.2, 0);
  group.add(pcie);

  // Arka Metal Plaka (Backplate)
  const backGeo = new THREE.BoxGeometry(5.6, 2.2, 0.05);
  const backMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, metalness: 0.9, roughness: 0.2 });
  const backplate = new THREE.Mesh(backGeo, backMat);
  backplate.position.z = -0.55;
  group.add(backplate);

  // İki Adet Dönen Soğutucu Fan
  const fans = [];
  const fanCenters = [-1.3, 1.3];

  fanCenters.forEach(x => {
    // Fan Çember Yuvası
    const ringGeo = new THREE.TorusGeometry(0.85, 0.08, 16, 32);
    const ringMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.8 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.position.set(x, 0, 0.56);
    group.add(ring);

    // Fan Göbeği ve Pervaneleri
    const fanGroup = new THREE.Group();
    fanGroup.position.set(x, 0, 0.56);

    const hubGeo = new THREE.CylinderGeometry(0.3, 0.3, 0.15, 16);
    const hubMat = new THREE.MeshStandardMaterial({ color: 0x0284c7, metalness: 0.9 });
    const hub = new THREE.Mesh(hubGeo, hubMat);
    hub.rotation.x = Math.PI / 2;
    fanGroup.add(hub);

    // Pervane Kanatları (9 Kanat)
    for (let i = 0; i < 9; i++) {
      const bladeGeo = new THREE.BoxGeometry(0.65, 0.15, 0.04);
      const bladeMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.4 });
      const blade = new THREE.Mesh(bladeGeo, bladeMat);
      const angle = (i / 9) * Math.PI * 2;
      blade.position.set(Math.cos(angle) * 0.45, Math.sin(angle) * 0.45, 0);
      blade.rotation.z = angle + 0.3;
      blade.rotation.y = 0.3;
      fanGroup.add(blade);
    }

    fans.push(fanGroup);
    group.add(fanGroup);
  });

  // Metal Arka Port Braketi
  const bracketGeo = new THREE.BoxGeometry(0.1, 2.8, 1.2);
  const bracketMat = new THREE.MeshStandardMaterial({ color: 0x94a3b8, metalness: 0.95, roughness: 0.1 });
  const bracket = new THREE.Mesh(bracketGeo, bracketMat);
  bracket.position.set(-2.85, 0.2, 0);
  group.add(bracket);

  // RGB Işıklı Yan Logo
  const rgbGeo = new THREE.BoxGeometry(2.0, 0.25, 0.05);
  const rgbMat = new THREE.MeshStandardMaterial({
    color: 0x10b981,
    emissive: 0x10b981,
    emissiveIntensity: 0.9
  });
  const rgbLogo = new THREE.Mesh(rgbGeo, rgbMat);
  rgbLogo.position.set(0, 1.05, 0.55);
  group.add(rgbLogo);

  // Fan Dönüş Animasyonu
  group.update = (time, delta = 0.016) => {
    fans.forEach(f => {
      f.rotation.z += delta * 12;
    });
    const hue = (time * 0.2) % 1;
    rgbMat.color.setHSL(hue, 1, 0.5);
    rgbMat.emissive.setHSL(hue, 1, 0.5);
  };

  return group;
}

/**
 * 6. Güç Kaynağı / PSU 3D Modeli
 */
export function createPsuModel() {
  const group = new THREE.Group();

  // Metal Kasa Kutusu
  const boxGeo = new THREE.BoxGeometry(4.0, 2.6, 3.6);
  const boxMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.5, metalness: 0.7 });
  const box = new THREE.Mesh(boxGeo, boxMat);
  group.add(box);

  // Üst Havalandırma Izgarası & Fan
  const grillGeo = new THREE.TorusGeometry(1.2, 0.08, 16, 32);
  const grillMat = new THREE.MeshStandardMaterial({ color: 0xd4d4d8, metalness: 0.9 });
  const grill = new THREE.Mesh(grillGeo, grillMat);
  grill.rotation.x = Math.PI / 2;
  grill.position.y = 1.31;
  group.add(grill);

  // Psu Fanı
  const fanGroup = new THREE.Group();
  fanGroup.position.y = 1.25;
  fanGroup.rotation.x = Math.PI / 2;
  const hubGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.1, 16);
  const hubMat = new THREE.MeshStandardMaterial({ color: 0x3f3f46, metalness: 0.6 });
  const hub = new THREE.Mesh(hubGeo, hubMat);
  fanGroup.add(hub);

  for (let i = 0; i < 7; i++) {
    const bladeGeo = new THREE.BoxGeometry(0.8, 0.2, 0.03);
    const bladeMat = new THREE.MeshStandardMaterial({ color: 0x27272a });
    const blade = new THREE.Mesh(bladeGeo, bladeMat);
    const angle = (i / 7) * Math.PI * 2;
    blade.position.set(Math.cos(angle) * 0.55, 0, Math.sin(angle) * 0.55);
    blade.rotation.y = angle;
    blade.rotation.x = 0.3;
    fanGroup.add(blade);
  }
  group.add(fanGroup);

  // Arka Güç Girişi ve Açma/Kapama Düğmesi
  const plugGeo = new THREE.BoxGeometry(0.7, 0.45, 0.1);
  const plugMat = new THREE.MeshStandardMaterial({ color: 0x000000 });
  const plug = new THREE.Mesh(plugGeo, plugMat);
  plug.position.set(1.0, 0.3, 1.81);
  group.add(plug);

  const switchGeo = new THREE.BoxGeometry(0.35, 0.4, 0.15);
  const switchMat = new THREE.MeshStandardMaterial({ color: 0xef4444, roughness: 0.3 });
  const pwrSwitch = new THREE.Mesh(switchGeo, switchMat);
  pwrSwitch.position.set(-0.8, 0.3, 1.82);
  group.add(pwrSwitch);

  // Renkli Güç Kablosu Demeti (24-Pin ATX ve PCIe kabloları)
  const cableColors = [0xf59e0b, 0xef4444, 0x10b981, 0x000000, 0x3b82f6];
  for (let i = 0; i < 10; i++) {
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-1.2 + (i % 5) * 0.3, -0.6 + Math.floor(i / 5) * 0.3, -1.8),
      new THREE.Vector3(-1.5 + (i % 5) * 0.4, -0.9, -2.8),
      new THREE.Vector3(-1.0 + (i % 5) * 0.5, -1.2, -3.5),
      new THREE.Vector3(-0.6 + (i % 5) * 0.3, -1.0, -4.2)
    );
    const tubeGeo = new THREE.TubeGeometry(curve, 20, 0.05, 8, false);
    const tubeMat = new THREE.MeshStandardMaterial({
      color: cableColors[i % cableColors.length],
      roughness: 0.5
    });
    const tube = new THREE.Mesh(tubeGeo, tubeMat);
    group.add(tube);
  }

  group.update = (time, delta = 0.016) => {
    fanGroup.rotation.y += delta * 8;
  };

  return group;
}

/**
 * 7. Soğutucu Fan (CPU Cooler) 3D Modeli
 */
export function createCoolerModel() {
  const group = new THREE.Group();

  // Bakır Taban Bloğu
  const baseGeo = new THREE.BoxGeometry(1.8, 0.25, 1.8);
  const baseMat = new THREE.MeshStandardMaterial({ color: 0xb45309, metalness: 0.95, roughness: 0.2 });
  const base = new THREE.Mesh(baseGeo, baseMat);
  base.position.y = -1.2;
  group.add(base);

  // 4 Adet U-Tipi Bakır Isı Borusu (Heatpipes)
  for (let i = 0; i < 4; i++) {
    const curve = new THREE.CubicBezierCurve3(
      new THREE.Vector3(-0.5 + (i % 2) * 1.0, -1.2, -0.4 + Math.floor(i / 2) * 0.8),
      new THREE.Vector3(-0.7 + (i % 2) * 1.4, -0.2, -0.4 + Math.floor(i / 2) * 0.8),
      new THREE.Vector3(-0.5 + (i % 2) * 1.0, 1.2, -0.4 + Math.floor(i / 2) * 0.8),
      new THREE.Vector3(0, 1.4, -0.4 + Math.floor(i / 2) * 0.8)
    );
    const pipeGeo = new THREE.TubeGeometry(curve, 16, 0.07, 8, false);
    const pipeMat = new THREE.MeshStandardMaterial({ color: 0xd97706, metalness: 0.9, roughness: 0.2 });
    const pipe = new THREE.Mesh(pipeGeo, pipeMat);
    group.add(pipe);
  }

  // Alüminyum Soğutucu Yaprakları (Fins kulesi)
  const finGeo = new THREE.BoxGeometry(2.4, 0.02, 2.2);
  const finMat = new THREE.MeshStandardMaterial({ color: 0xe2e8f0, metalness: 0.8, roughness: 0.3 });
  for (let i = 0; i < 28; i++) {
    const fin = new THREE.Mesh(finGeo, finMat);
    fin.position.y = -1.0 + i * 0.08;
    group.add(fin);
  }

  // RGB Soğutucu Fan Ünitesi (Ön Yüzde)
  const fanGroup = new THREE.Group();
  fanGroup.position.set(0, 0.1, 1.2);

  // Yuvarlak RGB Işık Halkası
  const rgbRingGeo = new THREE.TorusGeometry(1.0, 0.08, 16, 32);
  const rgbRingMat = new THREE.MeshStandardMaterial({
    color: 0x38bdf8,
    emissive: 0x38bdf8,
    emissiveIntensity: 0.9
  });
  const rgbRing = new THREE.Mesh(rgbRingGeo, rgbRingMat);
  fanGroup.add(rgbRing);

  // Fan Göbeği
  const hubGeo = new THREE.CylinderGeometry(0.35, 0.35, 0.15, 16);
  const hubMat = new THREE.MeshStandardMaterial({ color: 0x1e293b, roughness: 0.3 });
  const hub = new THREE.Mesh(hubGeo, hubMat);
  hub.rotation.x = Math.PI / 2;
  fanGroup.add(hub);

  // Şeffaf/Buzlu Pervane Kanatları
  const blades = [];
  for (let i = 0; i < 9; i++) {
    const bladeGeo = new THREE.BoxGeometry(0.75, 0.2, 0.03);
    const bladeMat = new THREE.MeshStandardMaterial({
      color: 0xf1f5f9,
      roughness: 0.2,
      transparent: true,
      opacity: 0.85
    });
    const blade = new THREE.Mesh(bladeGeo, bladeMat);
    const angle = (i / 9) * Math.PI * 2;
    blade.position.set(Math.cos(angle) * 0.48, Math.sin(angle) * 0.48, 0);
    blade.rotation.z = angle + 0.35;
    blade.rotation.y = 0.35;
    fanGroup.add(blade);
    blades.push(blade);
  }
  group.add(fanGroup);

  group.update = (time, delta = 0.016) => {
    fanGroup.rotation.z += delta * 15;
    const hue = (time * 0.25) % 1;
    rgbRingMat.color.setHSL(hue, 1, 0.5);
    rgbRingMat.emissive.setHSL(hue, 1, 0.5);
  };

  return group;
}
