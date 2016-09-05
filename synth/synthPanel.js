import React, { Component } from 'react';
import {setup, teardown} from './index.js';

function Envelope({attack, decay, release}) {
  return (<div className="envelope">
    <h2>Envelope</h2>
    <ul>
      <li>
        <div className="key">Attack:</div>
        <div className="value">{Math.round(attack * 100) / 100}</div>
      </li>
      <li>
      <div className="key">Decay:</div>
        <div className="value">{Math.round(decay * 100) / 100}</div>
      </li>
      <li>
      <div className="key">Sustain:</div>
        <div className="value">X</div>
      </li>
      <li>
      <div className="key">Release:</div>
        <div className="value">{Math.round(release * 100) / 100}</div>
      </li>
    </ul>
  </div>);
}

function Filter({frequency, ressonance, lfoFrequency}) {
  return (<div className="filter">
    <h2>Filter</h2>
    <ul>
      <li>
      <div className="key">Lowpass Hz:</div>
        <div className="value">{Math.round(frequency)}</div>
      </li>
      <li>
      <div className="key">Ressonance:</div>
        <div className="value">{Math.round(ressonance * 100) / 100}</div>
      </li>
      <li>
      <div className="key">LFO Hz:</div>
        <div className="value">{lfoFrequency}</div>
      </li>
    </ul>
  </div>);
}

function Oscillators({oscillators}) {
  return (<div className="oscillators">
    <h2>Oscillators</h2>
    <ul>
      {oscillators.map((oscillator, i) => (<li key={`oscillator-${i}`}>
        <div className="key">Type:</div>
        <div className="value">{oscillator.type}</div>
        <div className="key">Detune:</div>
        <div className="value">{oscillator.detune}</div>
      </li>))}
    </ul>
  </div>);
}

function renderWaveData(canvas, buffer) {
  const ctx = canvas.getContext('2d');
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const canvasHalfHeight = canvasHeight * 0.5;
  const bufferLength = buffer.length;

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  ctx.lineWidth = 1;
  ctx.strokeStyle = 'rgb(0, 255, 0)';
  ctx.beginPath();
  const sliceWidth = canvasWidth * 1.0 / bufferLength;
  let x = 0;
  for(let i = 0; i < bufferLength; i++) {
    const v = 1 - (buffer[i] * 1.75);
    const y = v * canvasHalfHeight;
    if(i === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
    x += sliceWidth;
  }
  ctx.lineTo(canvasWidth, canvasHalfHeight);
  ctx.stroke();
}

function renderFrequencyData(canvas, buffer) {
  const ctx = canvas.getContext('2d');
  const canvasWidth = canvas.width;
  const canvasHeight = canvas.height;
  const canvasHalfHeight = canvasHeight * 0.5;
  const bufferLength = buffer.length;

  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, canvasWidth, canvasHeight);

  const barWidth = (canvasWidth / bufferLength) * 2.5;
  let barHeight;
  let x = 0;

  for(var i = 0; i < bufferLength; i++) {
    barHeight = (buffer[i] * 2) / 2;

    ctx.fillStyle = `rgb(0, ${barHeight+100}, 0)`;
    ctx.fillRect(x, canvasHeight - barHeight / 2, barWidth, barHeight);

    x += barWidth + 1;
  }
}

export default class SynthPanel extends Component {
  constructor() {
    super();
    this.state = {
      dirty: false
    };
    this.updateView = this.updateView.bind(this);

    this.controls = setup(this.updateView);
  }

  updateView() {
    this.setState({
      count: this.state.count + 1
    });
  }

  componentDidMount() {
    const oscilloscope = document.querySelector('#oscillator');
    const frequencygraph = document.querySelector('#frequencies');
    const analyser = this.controls.destination;
    const bufferLength = analyser.frequencyBinCount;
		const timeDomainArray = new Float32Array(bufferLength);
		const frequencyDomainArray = new Uint8Array(bufferLength);

    const animate = () => {
      this.visualizer = requestAnimationFrame(animate);
      analyser.getFloatTimeDomainData(timeDomainArray);
      renderWaveData(oscilloscope, timeDomainArray);
      analyser.getByteFrequencyData(frequencyDomainArray);
      renderFrequencyData(frequencygraph, frequencyDomainArray);
    }

    animate();
  }

  componentWillUnmount() {
    teardown();

    cancelAnimationFrame(this.visualizer);
  }

  render() {
    const {exclude} = this.props;

    return (<div className="synthpanel">
      { exclude.oscillators ? null : <Oscillators oscillators={this.controls.getOscillators()} /> }
      { exclude.envelope ? null : <Envelope attack={this.controls.attack} decay={this.controls.decay} release={this.controls.release} /> }
      { exclude.filter ? null : <Filter frequency={this.controls.filterFrequency} ressonance={this.controls.filterResonance} lfoFrequency={this.controls.lfoFrequency} /> }
      <div id="visuals">
        <canvas id="oscillator" width="400" height="200" />
        <canvas id="frequencies" width="400" height="200" />
      </div>
    </div>);
  }
}
