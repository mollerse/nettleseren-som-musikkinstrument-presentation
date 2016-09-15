const midi = require('web-midi');

const keyboard = midi('nanoKEY2 MIDI 1', {});
const knobs = midi('Launch Control MIDI 1', {});
const synthFactory = require('./synth.js');
const controlFactory = require('./control.js');

keyboard.on('error', () => console.warn('No midi devices available, aborting demo'));
knobs.on('error', () => console.warn('No midi devices available, aborting demo'));

const voice = require('./voice.js');

const context = new AudioContext();
const controls = controlFactory(knobs, context);
const synth = synthFactory({ context, keyboard, controls });

synth.setVoice(voice);

// Envelope
controls.addControl(21, 'attack', v => v * (1 / 127));
controls.addControl(22, 'decay', v => v * (1 / 127));
controls.addControl(23, 'release', v => v * (1 / 127));

controls.addControl(28, 'gain', v => v * (1 / 127), 0.025);

function valueToSynthType(v) {
  const type = Math.floor(v * (1 / 127) * 4);
  switch(type) {
    case 0:
      return false;
    case 1:
      return 'sine';
    case 2:
      return 'triangle';
    case 3:
      return 'square';
    case 4:
      return 'sawtooth';
  }
}

// Individual Synths
controls.addControl(24, 'oscillator.0.type', valueToSynthType, 'sine');
controls.addControl(25, 'oscillator.1.type', valueToSynthType, false);
controls.addControl(26, 'oscillator.2.type', valueToSynthType, false);

controls.addControl(44, 'oscillator.0.detune', v => -63 + v, 0);
controls.addControl(45, 'oscillator.1.detune', v => -63 + v, 0);
controls.addControl(46, 'oscillator.2.detune', v => -63 + v, 0);

// Filter
controls.addControl(41, 'filterFrequency',
  v => Math.pow(v * (1 / 127), 2) * 22050,
  22050
);
controls.addControl(42, 'filterResonance',
  v => Math.pow(v * (1 / 127), 4) * 16
);
controls.addControl(43, 'lfoFrequency', v => Math.floor(v * (1 / 127) * 10), 0);

const initial = {
  attack: 0.00,
  decay: 0.00,
  release: 0.0,
  gain: 0.5,
  'oscillator.0.type': 'sine',
  'oscillator.0.detune': 0,
  'oscillator.1.type': false,
  'oscillator.2.type': false
};

const adsr = {
  attack: 0.50,
  decay: 0.50,
  release: 1.0,
  gain: 0.3,
  filterFrequency: 22050,
  filterResonance: 0,
  lfoFrequency: 0,
  'oscillator.0.type': 'sawtooth',
  'oscillator.0.detune': 0,
  'oscillator.1.type': false,
  'oscillator.2.type': false
};

const adsrSine = {...adsr, 'oscillator.0.type': 'sine'};
const adsrTri = {...adsr, 'oscillator.0.type': 'triangle'};
const adsrSquare = {...adsr, 'oscillator.0.type': 'square'};

const supersawPreset = {
  attack: 0,
  decay: 0,
  release: 0,
  gain: 0.05,
  filterFrequency: 22050,
  filterResonance: 0,
  lfoFrequency: 0,
  'oscillator.0.type': 'sawtooth',
  'oscillator.0.detune': -36,
  'oscillator.1.type': 'sawtooth',
  'oscillator.1.detune': 0,
  'oscillator.2.type': 'sawtooth',
  'oscillator.2.detune': 36
};

const filterPreset = {...supersawPreset, filterFrequency: 3556, filterResonance: 16, lfoFrequency: 8};

controls.addTrigger(9, () => controls.loadPreset(initial));
controls.addTrigger(10, () => controls.loadPreset(adsrSine));
controls.addTrigger(11, () => controls.loadPreset(adsrTri));
controls.addTrigger(12, () => controls.loadPreset(adsrSquare));
controls.addTrigger(25, () => controls.loadPreset(adsr));
controls.addTrigger(26, () => controls.loadPreset(supersawPreset));
controls.addTrigger(27, () => controls.loadPreset(filterPreset));

module.exports.setup = function setup(updateCb) {
  if(!controls) { return {}; }
  controls.setCb(updateCb);
  return controls;
};

module.exports.teardown = function setup() {
  if(!controls) { return; }
  controls.setCb(null);
};
