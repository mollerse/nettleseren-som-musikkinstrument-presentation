import midi from 'web-midi';
const keyboard = midi('nanoKEY2 MIDI 1', {});

function frequencyFromNoteNumber(note) {
  return Math.ceil(440 * Math.pow(2, (note - 69) / 12));
}

function synth({ context, note, config }) {
  const amp = context.createGain();
  amp.connect(context.destination);

  const frequency = frequencyFromNoteNumber(note);

  const oscillators = config.oscillators.map(function(oscillatorConfig) {
    const oscillator = context.createOscillator();
    oscillator.frequency.value = frequency;
    oscillator.type = oscillatorConfig.type;
    oscillator.detune.value = oscillatorConfig.detune;

    oscillator.connect(amp);
    return oscillator;
  });

  oscillators.forEach(o => o.start());

  const t = context.currentTime;
  const maxGain = config.gain * 2;
  amp.gain.linearRampToValueAtTime(maxGain, t + config.attack);
  amp.gain.linearRampToValueAtTime(config.gain, t + config.attack + config.decay);

  function stop() {
    const tStop = context.currentTime + config.release;
    amp.gain.linearRampToValueAtTime(0, tStop);
    oscillators.forEach(o => o.stop(tStop));
  }

  return stop;
}

const context = new AudioContext();
const config = {
  gain: 0.3,
  attack: 0.5,
  decay: 0.5,
  release: 1,
  oscillators: [
    { type: 'sawtooth', detune: -36 },
    { type: 'sawtooth', detune: 0 }
    { type: 'sawtooth', detune: 36 }
  ]
};

const activeVoices = {};
function onKeyboardEvent([velocity, code, note]) {
  if (code === 144) {
    activeVoices[note] = synth({ context, note, config });
  } else {
    activeVoices[note]();
    delete activeVoices[note];
  }
}

keyboard.on('data', onKeyboardEvent);
