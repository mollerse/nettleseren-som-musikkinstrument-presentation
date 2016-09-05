function frequencyFromNoteNumber(note) {
  return Math.ceil(440 * Math.pow(2, (note - 69) / 12));
}

function synth({ context, note, controls }) {
  // Global config
  const gain = controls.gain;
  const maxGain = gain * 2;
  const frequency = frequencyFromNoteNumber(note);
  const t0 = context.currentTime;

  // Initialize nodes
  const amp = context.createGain();
  const filter = context.createBiquadFilter();
  const lfo = context.createOscillator();
  const lfoGain = context.createGain();

  let voice1;
  let voice2;
  let voice3;

  if (controls['oscillator.0.type']) {
    voice1 = context.createOscillator();
    voice1.type = controls['oscillator.0.type'];
    voice1.frequency.value = frequency;
    voice1.detune.value = controls['oscillator.0.detune'];
    voice1.connect(amp);
  }

  if (controls['oscillator.1.type']) {
    voice2 = context.createOscillator();
    voice2.type = controls['oscillator.1.type'];
    voice2.frequency.value = frequency;
    voice2.detune.value = controls['oscillator.1.detune'];
    voice2.connect(amp);
  }

  if (controls['oscillator.2.type']) {
    voice3 = context.createOscillator();
    voice3.type = controls['oscillator.2.type'];
    voice3.frequency.value = frequency;
    voice3.detune.value = controls['oscillator.2.detune'];
    voice3.connect(amp);
  }

  // Configure filter
  filter.type = 'lowpass';
  filter.frequency.value = controls.filterFrequency;
  filter.Q.value = controls.filterResonance;

  // Configure gain
  amp.gain.value = 0;

  // Configure lfo
  lfoGain.gain.value = controls.filterFrequency / 6;
  lfo.frequency.value = controls.lfoFrequency;

  // Build graph
  lfo.connect(lfoGain);
  lfoGain.connect(filter.frequency);
  amp.connect(filter);
  filter.connect(controls.destination);

  // Start ocillators
  if (voice1) { voice1.start(); }
  if (voice2) { voice2.start(); }
  if (voice3) { voice3.start(); }
  lfo.start();

  // Start up
  amp.gain.linearRampToValueAtTime(maxGain, t0 + controls.attack);
  amp.gain.linearRampToValueAtTime(gain, t0 + controls.attack + controls.decay);

  function stop() {
    const tStop = context.currentTime + controls.release;
    // Shut down
    amp.gain.linearRampToValueAtTime(0, tStop);
    // Clean up
    if (voice1) { voice1.stop(tStop); }
    if (voice2) { voice2.stop(tStop); }
    if (voice3) { voice3.stop(tStop); }
    lfo.stop(tStop);
  }

  return stop;
}

module.exports = synth;
