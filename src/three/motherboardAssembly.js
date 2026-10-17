import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { createMotherboardModel } from './models/internalModels.js';
import { 
  createCpuModel, 
  createRamModel, 
  createSsdModel, 
  createGpuModel, 
  createCoolerModel 
} from './models/internalModels.js';

export class MotherboardAssemblyScene {
  constructor(containerElement, callbacks = {}) {
    this.container = containerElement;
    this.callbacks = callbacks;
    this.clock = new THREE.Clock();

    this.slots = {
      cpu_socket: {
        id: 'cpu_socket',
        requiredPart: 'cpu',
        name: 'İşlemci (CPU) Soketi',
        position: new THREE.Vector3(-0.6, 0.22, -0.6),
        boxSize: new THREE.Vector3(1.8, 0.35, 1.8),
        installed: false,
        mesh: null
      },
      ram_slot: {
        id: 'ram_slot',
        requiredPart: 'ram',
        name: 'DDR5 RAM Yuvası',
        position: new THREE.Vector3(1.35, 0.35, -0.6),
        boxSize: new THREE.Vector3(0.5, 0.45, 3.1),
        installed: false,
        mesh: null
      },
      gpu_slot: {
        id: 'gpu_slot',
        requiredPart: 'gpu',
        name: 'Ekran Kartı (PCIe x16) Yuvası',
        position: new THREE.Vector3(-0.5, 0.35, 1.4),
        boxSize: new THREE.Vector3(4.1, 0.45, 0.6),
        installed: false,
        mesh: null
      },
      ssd_slot: {
        id: 'ssd_slot',
        requiredPart: 'ssd',
        name: 'M.2 SSD Yuvası',
        position: new THREE.Vector3(-0.5, 0.2, 0.45),
        boxSize: new THREE.Vector3(2.4, 0.25, 0.7),
        installed: false,
        mesh: null
      },
      cooler_slot: {
        id: 'cooler_slot',
        requiredPart: 'cooler',
        name: 'İşlemci Soğutucu Kule Alanı',
        position: new THREE.Vector3(-0.6, 1.4, -0.6),
        boxSize: new THREE.Vector3(2.5, 1.2, 2.3),
        installed: false,
        mesh: null
      },
      psu_socket: {
        id: 'psu_socket',
        requiredPart: 'psu',
        name: '24-Pin ATX Güç Soketi',
        position: new THREE.Vector3(2.8, 0.3, 0.2),
        boxSize: new THREE.Vector3(0.6, 0.5, 1.8),
        installed: false,
        mesh: null
      }
    };

    this.installedModels = {};
    this.highlightMeshes = {};
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();
    this.isPoweredOn = false;

    this.init();
  }

  init() {
    const width = this.container.clientWidth || 800;
    const height = this.container.clientHeight || 550;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x070b14);

    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    this.camera.position.set(0, 7.0, 7.0);

    this.renderer = new THREE.WebGLRenderer({ 
      antialias: true, 
      alpha: true, 
      powerPreference: 'high-performance' 
    });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.25;
    this.container.appendChild(this.renderer.domElement);

    // Gerçekçi Stüdyo Çevre Yansıması (RoomEnvironment)
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnv = new RoomEnvironment();
    this.scene.environment = pmremGenerator.fromScene(roomEnv, 0.04).texture;
    roomEnv.dispose();

    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2.05;
    this.controls.minDistance = 3.5;
    this.controls.maxDistance = 16;
    this.controls.target.set(0, 0.3, 0);

    this.setupLights();
    this.setupWorkbench();

    // 3D Gerçekçi Anakart
    this.boardModel = createMotherboardModel();
    this.boardModel.position.set(0, 0.1, 0);
    this.scene.add(this.boardModel);

    this.setupSlotHighlights();

    this.renderer.domElement.addEventListener('pointerdown', (e) => this.onPointerDown(e));
    this.resizeObserver = new ResizeObserver(() => this.onResize());
    this.resizeObserver.observe(this.container);

    this.animate = this.animate.bind(this);
    this.animationFrameId = requestAnimationFrame(this.animate);
  }

  setupLights() {
    const ambient = new THREE.AmbientLight(0xffffff, 0.85);
    this.scene.add(ambient);

    const dirLight = new THREE.DirectionalLight(0xfffbf0, 1.8);
    dirLight.position.set(6, 10, 6);
    dirLight.castShadow = true;
    dirLight.shadow.mapSize.width = 2048;
    dirLight.shadow.mapSize.height = 2048;
    this.scene.add(dirLight);

    const blueRim = new THREE.DirectionalLight(0x38bdf8, 0.9);
    blueRim.position.set(-6, 5, -6);
    this.scene.add(blueRim);

    this.powerRgbLight = new THREE.PointLight(0x10b981, 0, 10);
    this.powerRgbLight.position.set(0, 2, 0);
    this.scene.add(this.powerRgbLight);
  }

  setupWorkbench() {
    // ESD Antistatik Profesyonel Montaj Matı
    const matGeo = new THREE.BoxGeometry(10.5, 0.2, 9.5);
    const matMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.5,
      metalness: 0.3
    });
    const mat = new THREE.Mesh(matGeo, matMaterial);
    mat.position.y = -0.1;
    this.scene.add(mat);

    const grid = new THREE.GridHelper(16, 16, 0x0284c7, 0x1e293b);
    grid.position.y = 0.01;
    this.scene.add(grid);
  }

  setupSlotHighlights() {
    Object.keys(this.slots).forEach(slotKey => {
      const slot = this.slots[slotKey];
      const geo = new THREE.BoxGeometry(slot.boxSize.x, slot.boxSize.y, slot.boxSize.z);
      
      const mat = new THREE.MeshStandardMaterial({
        color: 0x38bdf8,
        emissive: 0x0284c7,
        emissiveIntensity: 0.45,
        transparent: true,
        opacity: 0.45,
        roughness: 0.2
      });

      const mesh = new THREE.Mesh(geo, mat);
      mesh.position.copy(slot.position);
      mesh.userData = { slotId: slotKey };
      this.scene.add(mesh);

      const edges = new THREE.EdgesGeometry(geo);
      const lineMat = new THREE.LineBasicMaterial({ color: 0x38bdf8, linewidth: 2 });
      const wireframe = new THREE.LineSegments(edges, lineMat);
      mesh.add(wireframe);

      this.highlightMeshes[slotKey] = mesh;
    });
  }

  onPointerDown(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);
    const targetMeshes = Object.values(this.highlightMeshes);
    const intersects = this.raycaster.intersectObjects(targetMeshes, false);

    if (intersects.length > 0) {
      const hitMesh = intersects[0].object;
      const slotId = hitMesh.userData.slotId;
      if (this.callbacks.onSlotClicked) {
        this.callbacks.onSlotClicked(slotId);
      }
    }
  }

  tryInstallPart(selectedPartId, targetSlotId) {
    const slot = this.slots[targetSlotId];
    if (!slot) return { success: false, message: "Geçersiz yuva!" };

    if (slot.installed) {
      return { success: false, message: "Bu yuva zaten dolu!" };
    }

    if (slot.requiredPart === selectedPartId) {
      this.installPartIntoSlot(selectedPartId, targetSlotId);
      return { success: true };
    } else {
      this.flashSlotError(targetSlotId);
      return { 
        success: false, 
        message: `Bu parça buraya uymaz! Burası ${slot.name}.` 
      };
    }
  }

  installPartIntoSlot(partId, slotId) {
    const slot = this.slots[slotId];
    slot.installed = true;

    if (this.highlightMeshes[slotId]) {
      this.highlightMeshes[slotId].visible = false;
    }

    let partModel;
    if (partId === 'cpu') {
      partModel = createCpuModel();
      partModel.scale.set(0.44, 0.44, 0.44);
      partModel.position.set(-0.6, 0.28, -0.6);
    } else if (partId === 'ram') {
      partModel = createRamModel();
      partModel.scale.set(0.52, 0.48, 0.52);
      partModel.rotation.y = Math.PI / 2;
      partModel.position.set(1.35, 0.48, -0.6);
    } else if (partId === 'gpu') {
      partModel = createGpuModel();
      partModel.scale.set(0.68, 0.68, 0.68);
      partModel.position.set(-0.5, 1.05, 1.4);
    } else if (partId === 'ssd') {
      partModel = createSsdModel();
      partModel.scale.set(0.38, 0.38, 0.38);
      partModel.rotation.y = Math.PI / 2;
      partModel.position.set(-0.5, 0.22, 0.45);
    } else if (partId === 'cooler') {
      partModel = createCoolerModel();
      partModel.scale.set(0.62, 0.62, 0.62);
      partModel.position.set(-0.6, 1.15, -0.6);
    } else if (partId === 'psu') {
      const cableGroup = new THREE.Group();
      const headGeo = new THREE.BoxGeometry(0.36, 0.42, 1.5);
      const headMat = new THREE.MeshStandardMaterial({ color: 0x09090b });
      const head = new THREE.Mesh(headGeo, headMat);
      head.position.set(2.8, 0.35, 0.2);
      cableGroup.add(head);

      const curve = new THREE.CubicBezierCurve3(
        new THREE.Vector3(2.8, 0.5, 0.2),
        new THREE.Vector3(4.0, 1.0, 0.2),
        new THREE.Vector3(5.0, 0.4, 0.2),
        new THREE.Vector3(5.8, -0.1, 0.2)
      );
      const tubeGeo = new THREE.TubeGeometry(curve, 18, 0.12, 8, false);
      const tubeMat = new THREE.MeshStandardMaterial({ color: 0x18181b, roughness: 0.6 });
      const tube = new THREE.Mesh(tubeGeo, tubeMat);
      cableGroup.add(tube);
      partModel = cableGroup;
    }

    if (partModel) {
      const targetY = partModel.position.y;
      partModel.position.y = targetY + 2.6;
      this.scene.add(partModel);
      this.installedModels[partId] = partModel;

      let currentY = partModel.position.y;
      const dropAnim = () => {
        currentY -= 0.18;
        if (currentY > targetY) {
          partModel.position.y = currentY;
          requestAnimationFrame(dropAnim);
        } else {
          partModel.position.y = targetY;
        }
      };
      dropAnim();
    }

    const allInstalled = Object.values(this.slots).every(s => s.installed);
    if (allInstalled) {
      setTimeout(() => {
        this.triggerPowerOn();
      }, 600);
    }
  }

  flashSlotError(slotId) {
    const mesh = this.highlightMeshes[slotId];
    if (!mesh) return;

    mesh.material.color.setHex(0xef4444);
    mesh.material.emissive.setHex(0xef4444);
    mesh.material.emissiveIntensity = 1.0;

    const origX = mesh.position.x;
    let shakeCount = 0;
    const shake = () => {
      shakeCount++;
      mesh.position.x = origX + (Math.sin(shakeCount * 1.5) * 0.08);
      if (shakeCount < 8) {
        requestAnimationFrame(shake);
      } else {
        mesh.position.x = origX;
        mesh.material.color.setHex(0x38bdf8);
        mesh.material.emissive.setHex(0x0284c7);
        mesh.material.emissiveIntensity = 0.45;
      }
    };
    shake();
  }

  triggerPowerOn() {
    this.isPoweredOn = true;
    this.powerRgbLight.intensity = 2.5;

    if (this.callbacks.onAllCompleted) {
      this.callbacks.onAllCompleted();
    }
  }

  highlightSlot(slotId, active = true) {
    const mesh = this.highlightMeshes[slotId];
    if (!mesh || this.slots[slotId].installed) return;

    if (active) {
      mesh.material.color.setHex(0x10b981);
      mesh.material.emissive.setHex(0x10b981);
      mesh.material.emissiveIntensity = 0.85;
      mesh.material.opacity = 0.75;
    } else {
      mesh.material.color.setHex(0x38bdf8);
      mesh.material.emissive.setHex(0x0284c7);
      mesh.material.emissiveIntensity = 0.45;
      mesh.material.opacity = 0.45;
    }
  }

  onResize() {
    if (!this.container || !this.renderer) return;
    const width = this.container.clientWidth;
    const height = this.container.clientHeight;
    if (width === 0 || height === 0) return;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    this.animationFrameId = requestAnimationFrame(this.animate);
    const delta = this.clock.getDelta();
    const time = this.clock.getElapsedTime();

    this.controls.update();

    Object.values(this.installedModels).forEach(model => {
      if (model && typeof model.update === 'function') {
        model.update(time, delta);
      }
    });

    Object.keys(this.highlightMeshes).forEach(slotKey => {
      const mesh = this.highlightMeshes[slotKey];
      if (mesh.visible && !this.slots[slotKey].installed) {
        mesh.material.opacity = 0.35 + Math.sin(time * 3) * 0.15;
      }
    });

    if (this.isPoweredOn) {
      const hue = (time * 0.3) % 1;
      this.powerRgbLight.color.setHSL(hue, 1, 0.5);
    }

    this.renderer.render(this.scene, this.camera);
  }

  reset() {
    Object.keys(this.slots).forEach(slotKey => {
      this.slots[slotKey].installed = false;
      if (this.highlightMeshes[slotKey]) {
        this.highlightMeshes[slotKey].visible = true;
        this.highlightMeshes[slotKey].material.color.setHex(0x38bdf8);
        this.highlightMeshes[slotKey].material.emissive.setHex(0x0284c7);
      }
    });

    Object.values(this.installedModels).forEach(m => {
      this.scene.remove(m);
    });
    this.installedModels = {};
    this.isPoweredOn = false;
    this.powerRgbLight.intensity = 0;
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
    if (this.resizeObserver) {
      this.resizeObserver.disconnect();
    }
    if (this.renderer && this.renderer.domElement) {
      this.container.removeChild(this.renderer.domElement);
      this.renderer.dispose();
    }
  }
}
