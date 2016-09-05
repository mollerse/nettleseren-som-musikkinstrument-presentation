import midi from 'web-midi';
const keyboard = midi('nanoKEY2 MIDI 1', {});

function synth({ context }) {
  const oscillator = context.createOscillator();
  const amp = context.createGain();

  oscillator.connect(amp);
  amp.connect(context.destination);

  oscillator.start();
  amp.gain.value = 1;

  function stop() {
    amp.gain.value = 0;
    oscillator.stop();
  }

  return stop;
}

const context = new AudioContext();

let stop;
function onKeyboardEvent([velocity, code, note]) {
  if (code === 144) {
    stop = synth({ context });
  } else {
    stop();
  }
}

keyboard.on('data', onKeyboardEvent);
