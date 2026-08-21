/**
 * Web Audio API procedural engine roar and rev synthesizer
 * Simulates high-RPM atmospheric V12, throaty V8 rumble, screaming V10, and modern Turbo-Hybrid
 */
class EngineSoundSynthesizer {
  private ctx: AudioContext | null = null;
  private isPlaying: boolean = false;

  private initContext() {
    if (!this.ctx) {
      const AudioContextClass = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioContextClass();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public playRev(type: 'v12-high' | 'v8-rumble' | 'v10-screamer' | 'turbo-hybrid' = 'v12-high', duration = 2.4) {
    try {
      this.initContext();
      if (!this.ctx) return;
      const ctx = this.ctx;
      const now = ctx.currentTime;

      // Master gain
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.01, now);
      masterGain.gain.exponentialRampToValueAtTime(0.35, now + 0.15);
      masterGain.gain.exponentialRampToValueAtTime(0.28, now + duration * 0.6);
      masterGain.gain.exponentialRampToValueAtTime(0.001, now + duration);
      masterGain.connect(ctx.destination);

      // Multi-cylinder harmonic oscillators
      const baseFreq = type === 'v12-high' ? 85 : type === 'v8-rumble' ? 55 : type === 'v10-screamer' ? 95 : 68;
      const targetFreq = type === 'v12-high' ? 420 : type === 'v8-rumble' ? 260 : type === 'v10-screamer' ? 480 : 380;

      // Primary cylinder bank
      const osc1 = ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.setValueAtTime(baseFreq, now);
      // Rev up curve
      osc1.frequency.exponentialRampToValueAtTime(targetFreq, now + duration * 0.45);
      // High rpm hold
      osc1.frequency.linearRampToValueAtTime(targetFreq * 0.95, now + duration * 0.65);
      // Overrun deceleration
      osc1.frequency.exponentialRampToValueAtTime(baseFreq * 1.1, now + duration);

      // Secondary harmonic bank (slight detune for rich mechanical roar)
      const osc2 = ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.setValueAtTime(baseFreq * 1.5, now);
      osc2.frequency.exponentialRampToValueAtTime(targetFreq * 1.5, now + duration * 0.45);
      osc2.frequency.exponentialRampToValueAtTime(baseFreq * 1.6, now + duration);

      // Third sub-bass rumble
      const subOsc = ctx.createOscillator();
      subOsc.type = 'sawtooth';
      subOsc.frequency.setValueAtTime(baseFreq * 0.5, now);
      subOsc.frequency.exponentialRampToValueAtTime(targetFreq * 0.5, now + duration * 0.45);
      subOsc.frequency.exponentialRampToValueAtTime(baseFreq * 0.55, now + duration);

      // Low pass filter for exhaust chamber resonance
      const filter = ctx.createBiquadFilter();
      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(600, now);
      filter.frequency.exponentialRampToValueAtTime(3200, now + duration * 0.45);
      filter.frequency.exponentialRampToValueAtTime(450, now + duration);
      filter.Q.setValueAtTime(3.5, now);

      // Distortion wave shaper for authentic exhaust rasp
      const distortion = ctx.createWaveShaper();
      distortion.curve = this.makeDistortionCurve(type === 'v10-screamer' ? 24 : 16);
      distortion.oversample = '4x';

      // Connect nodes
      osc1.connect(filter);
      osc2.connect(filter);
      subOsc.connect(filter);
      filter.connect(distortion);
      distortion.connect(masterGain);

      osc1.start(now);
      osc2.start(now);
      subOsc.start(now);

      osc1.stop(now + duration);
      osc2.stop(now + duration);
      subOsc.stop(now + duration);

      // Exhaust overrun pops / crackles when decelerating
      this.playExhaustCrackle(now + duration * 0.6, 4);
    } catch {
      // Audio context might be restricted before interaction
    }
  }

  private playExhaustCrackle(startTime: number, count = 3) {
    if (!this.ctx) return;
    const ctx = this.ctx;

    for (let i = 0; i < count; i++) {
      const popTime = startTime + i * 0.12 + (Math.random() * 0.05);
      const bufferSize = ctx.sampleRate * 0.05;
      const buffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
      const output = buffer.getChannelData(0);
      for (let j = 0; j < bufferSize; j++) {
        output[j] = (Math.random() * 2 - 1) * Math.exp(-j / (bufferSize * 0.3));
      }

      const whiteNoise = ctx.createBufferSource();
      whiteNoise.buffer = buffer;

      const popFilter = ctx.createBiquadFilter();
      popFilter.type = 'bandpass';
      popFilter.frequency.setValueAtTime(280 + Math.random() * 200, popTime);
      popFilter.Q.setValueAtTime(5, popTime);

      const popGain = ctx.createGain();
      popGain.gain.setValueAtTime(0.2, popTime);
      popGain.gain.exponentialRampToValueAtTime(0.01, popTime + 0.045);

      whiteNoise.connect(popFilter);
      popFilter.connect(popGain);
      popGain.connect(ctx.destination);

      whiteNoise.start(popTime);
      whiteNoise.stop(popTime + 0.05);
    }
  }

  private makeDistortionCurve(amount: number) {
    const k = amount;
    const n_samples = 44100;
    const curve = new Float32Array(n_samples);
    const deg = Math.PI / 180;
    for (let i = 0; i < n_samples; ++i) {
      const x = (i * 2) / n_samples - 1;
      curve[i] = ((3 + k) * x * 20 * deg) / (Math.PI + k * Math.abs(x));
    }
    return curve;
  }
}

export const audioEngine = new EngineSoundSynthesizer();
