import React, { Component } from 'react';
import { render } from 'react-dom';
import {
  Appear, BlockQuote, Cite, CodePane, Code, Deck, Fill, Fit,
  Heading, Image, Layout, ListItem, List, Quote, Spectacle, Slide, Text
} from 'spectacle';
import theme from './theme';
import CodeSlide from 'spectacle-code-slide';
const fs = require('fs');
import SynthPanel from './synth/synthPanel';

import Prism from 'prismjs';
window.Prism = Prism;

const BigHeading = props => <Heading className="heading" fit caps lineHeight={1.15} size={1} {...props}>{props.children}</Heading>
const SmallHeading = props => <Heading fill textColor="white" size={2} {...props}>{props.children}</Heading>
const AppearingBlock = props => <Appear {...props}><div>{props.children}</div></Appear>

class Slides extends Component {
  render() {
    return (
      <Spectacle theme={theme}>
        <Deck transition={["slide"]} progress="none" controls={false}>
          <Slide>
            <BigHeading>Nettleseren</BigHeading>
            <BigHeading>som musikk-</BigHeading>
            <BigHeading>instrument!</BigHeading>
            <SmallHeading>Stian Veum Møllersen</SmallHeading>
            <SmallHeading>@mollerse</SmallHeading>
          </Slide>
          <Slide>
            <BigHeading>Musikk og</BigHeading>
            <BigHeading>Programmering</BigHeading>
          </Slide>
          <Slide>
            <BigHeading>Kreativitet</BigHeading>
          </Slide>
          <Slide>
            <SmallHeading>Enter</SmallHeading>
            <BigHeading caps={false}>WebAudio</BigHeading>
          </Slide>
          <Slide align="flex-start flex-start">
            <BigHeading>The Synthesizer</BigHeading>
            <Image width="100%" src="assets/moog.jpg" />
          </Slide>
          <CodeSlide
            background="black"
            transition={[]}
            className="codeslide"
            lang="js"
            code={fs.readFileSync('./examples/hello-webaudio.js', 'utf8')}
            ranges={[
              { loc: [0, 0], title: "Hello WebAudio" },
              { loc: [0, 1], title: "Lag en kontekst" },
              { loc: [2, 4], title: "Lag noen komponenter" },
              { loc: [5, 7], title: "Koble de sammen" },
              { loc: [8, 9], title: "Start oscillator" },
              { loc: [10, 11], title: "Set gain-verdien til amp" }
            ]}
          />
          <Slide align="flex-start flex-start">
            <BigHeading>WebAudio Graph</BigHeading>
            <Image width="100%" src="assets/graph1.png" />
          </Slide>
          <Slide>
            <BigHeading>Men vi har et</BigHeading>
            <BigHeading>Programmeringspråk</BigHeading>
            <Appear>
              <Text>Ikke bare instruering</Text>
            </Appear>
          </Slide>
          <CodeSlide
            background="black"
            transition={[]}
            className="codeslide"
            lang="js"
            code={fs.readFileSync('./examples/triggering.js', 'utf8')}
            ranges={[
              { loc: [0, 0], title: "Dynamisk av/på" },
              { loc: [0, 1], title: "Lag en funksjon" },
              { loc: [1, 9], title: "Samme som før" },
              { loc: [10, 16], title: "Returner en funksjon" },
              { loc: [18, 22], title: "Nå kan vi trigge dynamisk" },
            ]}
          />
          <Slide>
            <BigHeading>Keyboards er ikke</BigHeading>
            <BigHeading>Keyboards</BigHeading>
            <Appear>
              <Text>Keyboards er keyboards</Text>
            </Appear>
          </Slide>
          <Slide>
            <SmallHeading>The</SmallHeading>
            <BigHeading caps={false}>WebMIDI API</BigHeading>
          </Slide>
          <CodeSlide
            background="black"
            transition={[]}
            className="codeslide"
            lang="js"
            code={fs.readFileSync('./examples/midi.js', 'utf8')}
            ranges={[
              { loc: [0, 0], title: "Bruke keyboardet!" },
              { loc: [0, 2], title: "Vi kobler til et keyboard" },
              { loc: [23, 24], title: "Vi tar vare på stop-funksjonen" },
              { loc: [24, 32], title: "Event handler" },
              { loc: [24, 25], title: "Vi får 3 verdier fra MIDI" },
              { loc: [25, 28], title: "Når vi trykker ned tangenten" },
              { loc: [26, 27], title: "Aktiver noten" },
              { loc: [3, 4], title: "Samme som før" },
              { loc: [27, 31], title: "Når vi slipper tangenten" },
              { loc: [28, 29], title: "Deaktiver noten" },
              { loc: [32, 33], title: "Legg til handleren" },
            ]}
          />
          <Slide>
            <BigHeading>Flere ulike</BigHeading>
            <BigHeading>lyder</BigHeading>
          </Slide>
          <CodeSlide
            background="black"
            transition={[]}
            className="codeslide"
            lang="js"
            code={fs.readFileSync('./examples/audioparams.js', 'utf8')}
            ranges={[
              { loc: [0, 0], title: "Kunne spille flere noter" },
              { loc: [31, 32], title: "Et sted å lagre aktive noter" },
              { loc: [34, 35], title: "Lagre den aktive noten" },
              { loc: [34, 35], title: "Og sender med som argument" },
              { loc: [7, 8], title: "Vi tar inn note argument" },
              { loc: [11, 12], title: "Regner ut frekvensen" },
              { loc: [3, 6], title: "Hjelpefunksjon" },
              { loc: [12, 13], title: "Setter frekvensen" },
              { loc: [13, 14], title: "Vi endrer også typen" },
              { loc: [35, 39], title: "Deaktivere noten" },
            ]}
          />
          <Slide>
            <BigHeading>Det er mange</BigHeading>
            <BigHeading>parametere</BigHeading>
            <Appear>
              <Text>Ulike noder har ulike verdier</Text>
            </Appear>
            <Appear>
              <Text>...som kan settes ved ulike tidspunkt</Text>
            </Appear>
          </Slide>
          <Slide>
            <BigHeading>Envelopes</BigHeading>
          </Slide>
          <Slide align="flex-start flex-start">
            <BigHeading>Dynamikk i tonene</BigHeading>
            <Image width="100%" src="assets/adsr.png" />
          </Slide>
          <CodeSlide
            background="black"
            transition={[]}
            className="codeslide"
            lang="js"
            code={fs.readFileSync('./examples/adsr.js', 'utf8')}
            ranges={[
              { loc: [0, 0], title: "Implementere ADSR" },
              { loc: [35, 43], title: "Sette opp config" },
              { loc: [46, 47], title: "Sender med config" },
              { loc: [7, 8], title: "Vi tar inn en config" },
              { loc: [14, 15], title: "Lese fra config" },
              { loc: [21, 22], title: "Leser av tiden" },
              { loc: [22, 23], title: "Skedulering av attack" },
              { loc: [23, 24], title: "Skedulering av decay" },
              { loc: [25, 30], title: "Skedulering av release" },
            ]}
          />
          <Slide align="flex-start flex-start">
            <SynthPanel exclude={{envelope: false, filter: true, oscillators: true}}/>
          </Slide>
          <Slide>
            <BigHeading>Nå har vi en</BigHeading>
            <BigHeading>ganske kul synth!</BigHeading>
            <Appear>
              <Text>Men vi kan gjøre den kulere!</Text>
            </Appear>
          </Slide>
          <Slide>
            <BigHeading>Vi kan bruke flere</BigHeading>
            <BigHeading>oscillatorer!</BigHeading>
          </Slide>
          <CodeSlide
            background="black"
            transition={[]}
            className="codeslide"
            lang="js"
            code={fs.readFileSync('./examples/multioscillator.js', 'utf8')}
            ranges={[
              { loc: [0, 0], title: "Flere oscillatorer" },
              { loc: [45, 50], title: "Config av oscillatorer" },
              { loc: [55, 56], title: "Som blir sendt med" },
              { loc: [7, 8], title: "Og tatt i mot" },
              { loc: [13, 14], title: "Looper over oscillatorer fra config" },
              { loc: [14, 17], title: "Som før" },
              { loc: [17, 18], title: "Vi tar med et nytt parameter" },
              { loc: [19, 20], title: "Kobler til amp'en" },
              { loc: [20, 21], title: "Returnerer oscillatoren" },
              { loc: [23, 24], title: "Starter alle oscillatorene" },
              { loc: [33, 34], title: "Stopper alle oscillatorene" },
            ]}
          />
          <Slide align="flex-start flex-start">
            <BigHeading>Hva har vi laget?</BigHeading>
            <Image width="100%" src="assets/graph2.png" />
          </Slide>
          <Slide align="flex-start flex-start">
            <SynthPanel exclude={{envelope: false, filter: true, oscillators: false}}/>
          </Slide>
          <Slide>
            <BigHeading>Nå begynner det</BigHeading>
            <BigHeading>å ligne noe</BigHeading>
            <Appear>
              <Text>Bare en liten mod til!</Text>
            </Appear>
          </Slide>
          <Slide>
            <BigHeading>Lowpass Filter &amp;</BigHeading>
            <BigHeading>Low-Frequency Oscillator</BigHeading>
            <Appear>
              <Text>Gjør tonene interessante!</Text>
            </Appear>
          </Slide>
          <CodeSlide
            background="black"
            transition={[]}
            className="codeslide"
            lang="js"
            code={fs.readFileSync('./examples/filterlfo.js', 'utf8')}
            ranges={[
              { loc: [0, 0], title: "Filter og LFO" },
              { loc: [61, 64], title: "Litt ekstra config" },
              { loc: [7, 8], title: "Som vi kan lese" },
              { loc: [11, 15], title: "Vi lager et filter" },
              { loc: [16, 18], title: "Vi lager en LFO" },
              { loc: [19, 21], title: "Vi lager en gain til LFO" },
              { loc: [19, 21], title: "For å endre range" },
              { loc: [22, 26], title: "Vi kobler det sammen" },
              { loc: [22, 23], title: "Signalet fra amp gjennom filteret" },
              { loc: [23, 24], title: "Signalet fra filteret til høyttaleren" },
              { loc: [24, 25], title: "LFO til LFO-gain" },
              { loc: [25, 26], title: "Output fra LFO-gain til filterets frekvens" },
              { loc: [25, 26], title: "Lar oss styre cutoff!" },
            ]}
          />
          <Slide align="flex-start flex-start">
            <BigHeading>Hva har vi laget?</BigHeading>
            <Image width="100%" src="assets/graph3.png" />
          </Slide>
          <Slide align="flex-start flex-start">
            <SynthPanel exclude={{envelope: false, filter: false, oscillators: false}}/>
          </Slide>
          <Slide>
            <BigHeading>Nå har vi en</BigHeading>
            <BigHeading>kul synth!</BigHeading>
            <Appear>
              <Text>Det er nå moroa begynner</Text>
            </Appear>
          </Slide>
          <Slide align="flex-start flex-start">
            <BigHeading>Jeg har vist dere</BigHeading>
            <BigHeading>noen byggeklosser</BigHeading>
            <List>
              <Appear><ListItem>Oscillatorer</ListItem></Appear>
              <Appear><ListItem>Gain noder</ListItem></Appear>
              <Appear><ListItem>AudioParams</ListItem></Appear>
              <Appear><ListItem>Hvordan koble til MIDI</ListItem></Appear>
              <Appear><ListItem>Envelopes og scheduling</ListItem></Appear>
              <Appear><ListItem>Filters</ListItem></Appear>
            </List>
          </Slide>
          <Slide>
            <BigHeading>Bygg noe fett!</BigHeading>
            <Appear>
              <Text>Vær kreativ</Text>
            </Appear>
            <Appear>
              <Text>Lek med kode</Text>
            </Appear>
          </Slide>
          <Slide>
            <BigHeading>Takk for meg!</BigHeading>
            <SmallHeading>@mollerse</SmallHeading>
          </Slide>
        </Deck>
      </Spectacle>
    );
  }
}

const mount = document.createElement('div');
document.body.appendChild(mount);
render(<Slides/>, mount);
