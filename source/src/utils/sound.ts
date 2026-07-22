export type SoundEffect = 'issue' | 'peel' | 'reveal';

let context: AudioContext | null = null;
let lastPeelAt = 0;

function getContext(): AudioContext | null {
  const AudioContextClass = window.AudioContext;
  if (!AudioContextClass) return null;
  context ??= new AudioContextClass();
  return context;
}

export function playSound(effect: SoundEffect, enabled: boolean): void {
  if (!enabled) return;
  try {
    const audio = getContext();
    if (!audio) return;
    if (effect === 'peel' && performance.now() - lastPeelAt < 90) return;
    if (effect === 'peel') lastPeelAt = performance.now();

    const oscillator = audio.createOscillator();
    const gain = audio.createGain();
    oscillator.connect(gain);
    gain.connect(audio.destination);
    const now = audio.currentTime;
    const frequency = effect === 'issue' ? 180 : effect === 'reveal' ? 620 : 115;
    oscillator.type = effect === 'peel' ? 'triangle' : 'sine';
    oscillator.frequency.setValueAtTime(frequency, now);
    if (effect === 'reveal') oscillator.frequency.exponentialRampToValueAtTime(980, now + 0.22);
    gain.gain.setValueAtTime(effect === 'peel' ? 0.018 : 0.045, now);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + (effect === 'peel' ? 0.1 : 0.3));
    oscillator.start(now);
    oscillator.stop(now + (effect === 'peel' ? 0.11 : 0.32));
  } catch {
    // Sound is an optional enhancement and must never interrupt the draw flow.
  }
}
