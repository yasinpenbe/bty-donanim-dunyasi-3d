/**
 * Web Speech API (TTS) - Türkçe Metin Okuma Modülü
 */

class SpeechManager {
  constructor() {
    this.synth = window.speechSynthesis || null;
    this.turkishVoice = null;
    this.isSpeaking = false;
    this.currentUtterance = null;
    this.enabled = true;

    if (this.synth) {
      this.initVoices();
      if (this.synth.onvoiceschanged !== undefined) {
        this.synth.onvoiceschanged = () => this.initVoices();
      }
    }
  }

  initVoices() {
    if (!this.synth) return;
    const voices = this.synth.getVoices();
    // Türkçe destekleyen sesleri bul
    this.turkishVoice = voices.find(v => v.lang.startsWith('tr')) || 
                        voices.find(v => v.lang === 'tr-TR') || 
                        null;
  }

  toggleSpeech() {
    this.enabled = !this.enabled;
    if (!this.enabled) {
      this.stop();
    }
    return this.enabled;
  }

  isEnabled() {
    return this.enabled;
  }

  speak(text, onStart, onEnd) {
    if (!this.enabled || !this.synth) {
      if (onEnd) onEnd();
      return;
    }

    this.stop();

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'tr-TR';
    utterance.rate = 0.95; // 5. sınıf seviyesi için anlaşılır ve sakin bir hız
    utterance.pitch = 1.05; // Dostane ve neşeli ton

    if (this.turkishVoice) {
      utterance.voice = this.turkishVoice;
    }

    utterance.onstart = () => {
      this.isSpeaking = true;
      this.currentUtterance = utterance;
      if (onStart) onStart();
    };

    utterance.onend = () => {
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    utterance.onerror = (e) => {
      console.warn("Speech error:", e);
      this.isSpeaking = false;
      this.currentUtterance = null;
      if (onEnd) onEnd();
    };

    this.synth.speak(utterance);
  }

  stop() {
    if (this.synth) {
      this.synth.cancel();
    }
    this.isSpeaking = false;
    this.currentUtterance = null;
  }
}

export const speechManager = new SpeechManager();
