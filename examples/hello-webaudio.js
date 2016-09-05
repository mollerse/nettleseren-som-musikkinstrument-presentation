const context = new AudioContext();

const oscillator = context.createOscillator();
const amp = context.createGain();

oscillator.connect(amp);
amp.connect(context.destination);

oscillator.start();

amp.gain.value = 1;
