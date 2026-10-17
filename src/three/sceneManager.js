import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
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
    this.scene.background = new THREE.Color(0x090d16);

    // 2. Kamera
    this.camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    this.defaultCameraPos = new THREE.Vector3(0, 3.5, 7.5);
    this.camera.position.copy(this.defaultCameraPos);

    // 3. Renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    this.renderer.setSize(width, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 1.1;
    this.container.appendChild(this.renderer.domElement);

    // 4. OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);
    this.controls.enableDamping = true;
    this.controls.dampingFactor = 0.05;
    this.controls.maxPolarAngle = Math.PI / 2 + 0.1; // Zemin altına geçişi sınırla
    this.controls.minDistance = 2.5;
    this.controls.maxDistance = 15;
    this.controls.autoRotate = this.autoRotate;
    this.controls.autoRotateSpeed = 1.2;

    // 5. Işıklandırma (Stüdyo Kalitesi)
    this.setupLighting();

    // 6. Zemin ve Podyum
    this.setupPodium();

    // 7. Resize dinleyicisi
    this.resizeObserver = new ResizeObserver(() => this.onResize());
    this.resizeObserver.observe(this.container);

    // 8. Render döngüsü
    this.animate = this.animate.bind(this);
    this.animationFrameId = requestAnimationFrame(this.animate);
  }

  setupLighting() {
    // Yumuşak ortam ışığı
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
    this.scene.add(ambientLight);

    // Ana Işık (Key Light)
    const keyLight = new THREE.DirectionalLight(0xffffff, 1.4);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 0.5;
    keyLight.shadow.camera.far = 25;
    this.scene.add(keyLight);

    // Dolgu Işığı (Fill Light - Mavi Ton)
    const fillLight = new THREE.DirectionalLight(0x38bdf8, 0.6);
    fillLight.position.set(-6, 4, -4);
    this.scene.add(fillLight);

    // Kontur / Arka Işık (Rim Light - Mor/Neon Ton)
    const rimLight = new THREE.DirectionalLight(0xa855f7, 0.8);
    rimLight.position.set(0, 5, -6);
    this.scene.add(rimLight);

    // Podyum Altı Noktasal Işık
    const pointLight = new THREE.PointLight(0x06b6d4, 1.2, 8);
    pointLight.position.set(0, 0.2, 0);
    this.scene.add(pointLight);
  }

  setupPodium() {
    // Dairesel Podyum Tabanı
    const podiumGeo = new THREE.CylinderGeometry(3.6, 3.8, 0.2, 64);
    const podiumMat = new THREE.MeshStandardMaterial({
      color: 0x0f172a,
      roughness: 0.3,
      metalness: 0.6
    });
    const podium = new THREE.Mesh(podiumGeo, podiumMat);
    podium.position.y = -0.1;
    podium.receiveShadow = true;
    this.scene.add(podium);

    // Neon Podyum Işık Halkası
    const ringGeo = new THREE.TorusGeometry(3.62, 0.04, 16, 64);
    const ringMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      emissive: 0x38bdf8,
      emissiveIntensity: 1.0
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2;
    ring.position.y = 0.01;
    this.scene.add(ring);

    // Zemin Kılavuz Izgarası
    const grid = new THREE.GridHelper(18, 18, 0x38bdf8, 0x1e293b);
    grid.position.y = -0.11;
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

    // Modeli podyumun üstüne ortala
    model.position.set(0, 0, 0);
    model.scale.set(0.01, 0.01, 0.01); // Yumuşak beliriş animasyonu için
    this.scene.add(model);

    // Büyüme (pop-in) animasyonu
    let scale = 0.01;
    const animateIn = () => {
      scale += 0.08;
      if (scale < 1.0) {
        model.scale.set(scale, scale, scale);
        requestAnimationFrame(animateIn);
      } else {
        model.scale.set(1, 1, 1);
      }
    };
    animateIn();

    // Kamerayı ve kontrolleri sıfırla
    this.resetCamera();
  }

  toggleAutoRotate() {
    this.autoRotate = !this.autoRotate;
    this.controls.autoRotate = this.autoRotate;
    return this.autoRotate;
  }

  resetCamera() {
    this.camera.position.copy(this.defaultCameraPos);
    this.controls.target.set(0, 0.8, 0);
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
