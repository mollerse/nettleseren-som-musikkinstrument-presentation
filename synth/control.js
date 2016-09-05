class Controls {
  constructor(device, context) {
    this.controls = {};

    // Configure analyser
    const analyser = context.createAnalyser();
    analyser.fftSize = 512;
    this.destination = analyser;
    analyser.connect(context.destination);


    device.on('data', ([, knobId, value]) => {
      if (this.debug) { console.log(knobId, value); }

      const control = this.controls[knobId];
      if (control) { control(value); }

      if (this.cb) { this.cb(); }
    });
  }

  addControl(knobId, property, mapper, defaultValue = 0) {
    this[property] = defaultValue;
    this.controls[knobId] = value => { this[property] = mapper(value); };
  }

  addTrigger(knobId, fn) {
    this.controls[knobId] = function trigger(value) {
      if (value === 127) { fn(value); }
    };
  }

  loadPreset(preset) {
    Object.keys(preset).forEach(k => {
      this[k] = preset[k];
    });
  }

  getOscillators() {
    const ret = [];

    if(this['oscillator.0.type']) {
      ret.push({type: this['oscillator.0.type'], detune: this['oscillator.0.detune']});
    }

    if(this['oscillator.1.type']) {
      ret.push({type: this['oscillator.1.type'], detune: this['oscillator.1.detune']});
    }

    if(this['oscillator.2.type']) {
      ret.push({type: this['oscillator.2.type'], detune: this['oscillator.2.detune']});
    }

    return ret;
  }

  serialize() {
    const serialized = {};
    for (const prop in this) {
      if (['addControl', 'addTrigger', 'loadPreset', 'serialize', 'controls', 'cb', 'analyser'].indexOf(prop) < 0) {
        serialized[prop] = this[prop];
      }
    }

    return serialized;
  }

  enableDebug() { this.debug = true; }

  setCb(cb) {
    this.cb = cb;
  }
}

module.exports = function ControlsFactory(device,  context) {
  const controls = new Controls(device, context);
  return controls;
};
