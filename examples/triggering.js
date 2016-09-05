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

const stop = synth({context});
stop();
