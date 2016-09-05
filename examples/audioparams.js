import midi from 'web-midi';
const keyboard = midi('nanoKEY2 MIDI 1', {});

function frequencyFromNoteNumber(note) {
  return Math.ceil(440 * Math.pow(2, (note - 69) / 12));
}

function synth({ context, note }) {
  const oscillator = context.createOscillator();
  const amp = context.createGain();

  const frequency = frequencyFromNoteNumber(note);
  oscillator.frequency.value = frequency;
  oscillator.type = 'sawtooth';

  oscillator.connect(amp);
  amp.connect(context.destination);

  oscillator.start();
  amp.gain.value = 0.3;

  function stop() {
    amp.gain.value = 0;
    oscillator.stop();
  }

  return stop;
}

const context = new AudioContext();

const activeVoices = {};
function onKeyboardEvent([velocity, code, note]) {
  if (code === 144) {
    activeVoices[note] = synth({ context, note });
  } else {
    activeVoices[note]();
    delete activeVoices[note];
  }
}

keyboard.on('data', onKeyboardEvent);
