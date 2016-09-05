class Synth {
  constructor({ context, keyboard, controls }) {
    const activeVoices = {};

    keyboard.on('data', ([code, note]) => {
      if (!this.voice) { return; }

      if (code === 144) {
        activeVoices[note] = this.voice({ context, note, controls });
      } else {
        activeVoices[note]();
        delete activeVoices[note];
      }
    });
  }

  setVoice(voice) {
    this.voice = voice;
  }
}

module.exports = function synthFactory({ context, keyboard, controls }) {
  const synth = new Synth({ context, keyboard, controls });
  return synth;
};
