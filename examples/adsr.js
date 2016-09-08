import midi from 'web-midi';
const keyboard = midi('nanoKEY2 MIDI 1', {});

function frequencyFromNoteNumber(note) {
  return Math.ceil(440 * Math.pow(2, (note - 69) / 12));
}

function synth({ context, note, config }) {
  const oscillator = context.createOscillator();
  const amp = context.createGain();


  const frequency = frequencyFromNoteNumber(note);
  oscillator.frequency.value = frequency;
  oscillator.type = config.type;

  oscillator.connect(amp);
  amp.connect(context.destination);

  oscillator.start();

  const t = context.currentTime;
  amp.gain.linearRampToValueAtTime(config.gain * 2, t + config.attack);
  amp.gain.linearRampToValueAtTime(config.gain, t + config.attack + config.decay);

  function stop() {
    const tStop = context.currentTime + config.release;
    amp.gain.linearRampToValueAtTime(0, tStop);
    oscillator.stop(tStop);
  }

  return stop;
}

const context = new AudioContext();
const config = {
  gain: 0.3,
  attack: 0.5,
  decay: 0.5,
  release: 1,
  type: 'sine'
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
