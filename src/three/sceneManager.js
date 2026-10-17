import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { createHardwareModel } from './models/modelFactory.js';

export class HardwareSceneManager {
  constructor(containerElement) {
    this.container = containerElement;
    this.currentModel = null;
    this.currentModelId = null;
    this.autoRotate = true;
    this.clock = new THREE.Clock();

    this.init();
  }

  init() {
    const width = this.container.clientWidth || 600;
    const height = this.container.clientHeight || 450;

    // 1. Sahne (Scene)
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x070b12);

    // 2. Kamera (Perspektif)
    this.camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    this.defaultCameraPos = new THREE.Vector3(0, 3.2, 7.8);
    this.camera.position.copy(this.defaultCameraPos);

    // 3. Renderer (Yüksek Kaliteli PBR / ACES Filmic)
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

    // 4. Gerçekçi Stüdyo Çevre Işığı (RoomEnvironment / PMREM)
    // Bu özellik metallere, bakıra, altına ve cama gerçekçi stüdyo yansıması kazandırır!
    const pmremGenerator = new THREE.PMREMGenerator(this.renderer);
    pmremGenerator.compileEquirectangularShader();
    const roomEnvironment = new RoomEnvironment();
    this.scene.environment = pmremGenerator.fromScene(roomEnvironment, 0.04).texture;
    roomEnvironment.dispose();

    // 5. OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2 + 0.05;
    this.controls.minDistance = 2.0;
    this.controls.maxDistance = 14;
    this.controls.autoRotate = this.autoRotate;
    this.controls.autoRotateSpeed = 1.0;

    // 6. Stüdyo Işıklandırması
    this.setupLighting();

    // 7. Lüks Stüdyo Podyumu
    this.setupPodium();

    // 8. Yeniden Boyutlandırma Gözlemcisi
    this.resizeObserver = new ResizeObserver(() => this.onResize());
    this.resizeObserver.observe(this.container);

    // 9. Render Döngüsü
    this.animate = this.animate.bind(this);
    this.animationFrameId = requestAnimationFrame(this.animate);
  }

  setupLighting() {
    // Dengeli yumuşak ortam aydınlatması
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.85);
    this.scene.add(ambientLight);

    // Ana Stüdyo Işığı (Softbox Key Light)
    const keyLight = new THREE.DirectionalLight(0xfffbf0, 1.8);
    keyLight.position.set(6, 9, 6);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 2048;
    keyLight.shadow.mapSize.height = 2048;
    keyLight.shadow.bias = -0.0001;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    this.scene.add(keyLight);

    // Soğuk Dolgu Işığı (Fill Light)
    const fillLight = new THREE.DirectionalLight(0x93c5fd, 0.9);
    fillLight.position.set(-6, 5, -3);
    this.scene.add(fillLight);

    // Arka Kontur Işığı (Rim Light)
    const rimLight = new THREE.DirectionalLight(0x38bdf8, 1.2);
    rimLight.position.set(0, 6, -6);
    this.scene.add(rimLight);

    // Podyum Altı Hafif Vurgu Spotu
    const underLight = new THREE.PointLight(0x0284c7, 0.8, 6);
    underLight.position.set(0, 0.15, 0);
    this.scene.add(underLight);
  }

  setupPodium() {
    // Fırçalanmış Koyu Titanyum Stüdyo Podyumu
    const podiumGeo = new THREE.CylinderGeometry(3.6, 3.8, 0.18, 64);
    const podiumMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.35,
      metalness: 0.8
    });
    const podium = new THREE.Mesh(podiumGeo, podiumMat);
    podium.position.y = -0.09;
    podium.receiveShadow = true;
    this.scene.add(podium);

    // İnce CNC Elmas Kesim Yansıtıcı Üst Halka
    const ringGeo = new THREE.TorusGeometry(3.61, 0.03, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      metalness: 0.95,
      roughness: 0.1,
      emissive: 0x0284c7,
      emissiveIntensity: 0.6
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.005;
    this.scene.add(ring);

    // Zarif Zemin Izgarası
    const grid = new THREE.GridHelper(16, 16, 0x1e293b, 0x0f172a);
    grid.position.y = -0.1;
    this.scene.add(grid);
  }

  loadModel(hardwareId) {
    if (this.currentModelId === hardwareId && this.currentModel) return;

    if (this.currentModel) {
      this.scene.remove(this.currentModel);
      this.currentModel = null;
    }

    this.currentModelId = hardwareId;
    const model = createHardwareModel(hardwareId);
    this.currentModel = model;

    // Modeli podyum üstüne yerleştir
    model.position.set(0, 0, 0);
    model.scale.set(0.01, 0.01, 0.01);
    this.scene.add(model);

    // Akıcı beliriş animasyonu
    let scale = 0.01;
    const animateIn = () => {
      scale += 0.09;
      if (scale < 1.0) {
        model.scale.set(scale, scale, scale);
        requestAnimationFrame(animateIn);
      } else {
        model.scale.set(1, 1, 1);
      }
    };
    animateIn();

    this.resetCamera();
  }

  toggleAutoRotate() {
    this.autoRotate = !this.autoRotate;
    this.controls.autoRotate = this.autoRotate;
    return this.autoRotate;
  }

  resetCamera() {
    this.camera.position.copy(this.defaultCameraPos);
    this.controls.target.set(0, 0.7, 0);
    this.controls.update();
  }

  zoomIn() {
    this.camera.position.multiplyScalar(0.85);
    this.controls.update();
  }

  zoomOut() {
    this.camera.position.multiplyScalar(1.15);
    this.controls.update();
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
    const elapsedTime = this.clock.getElapsedTime();

    this.controls.update();

    if (this.currentModel && typeof this.currentModel.update === 'function') {
      this.currentModel.update(elapsedTime, delta);
    }

    this.renderer.render(this.scene, this.camera);
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
