import {
  createMotherboardModel,
  createCpuModel,
  createRamModel,
  createSsdModel,
  createGpuModel,
  createPsuModel,
  createCoolerModel
} from './internalModels.js';

import {
  createKeyboardModel,
  createMouseModel,
  createMicrophoneModel,
  createWebcamModel,
  createBarcodeModel
} from './inputModels.js';

import {
  createMonitorModel,
  createSpeakerModel,
  createPrinterModel,
  createProjectorModel
} from './outputModels.js';

const MODEL_FACTORIES = {
  motherboard: createMotherboardModel,
  cpu: createCpuModel,
  ram: createRamModel,
  ssd: createSsdModel,
  gpu: createGpuModel,
  psu: createPsuModel,
  cooler: createCoolerModel,
  keyboard: createKeyboardModel,
  mouse: createMouseModel,
  microphone: createMicrophoneModel,
  webcam: createWebcamModel,
  barcode: createBarcodeModel,
  monitor: createMonitorModel,
  speaker: createSpeakerModel,
  printer: createPrinterModel,
  projector: createProjectorModel
};

export function createHardwareModel(hardwareId) {
  const factory = MODEL_FACTORIES[hardwareId];
  if (!factory) {
    console.warn(`No 3D model factory found for: ${hardwareId}`);
    return createCpuModel();
  }
  return factory();
}
