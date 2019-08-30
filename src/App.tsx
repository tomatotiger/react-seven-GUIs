import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Counter, CounterWithHooks } from './components/counter';
import { TemperatureConverter } from './components/temperatureConverter';
import { FlightBooker } from './components/flightBooker';
import { Timer } from './components/timer';

function App() {
  return (
    <div>
      Hi!
      <Counter />
      <CounterWithHooks />
      <TemperatureConverter />
      <FlightBooker />
      <Timer />
    </div>
  );
}

export default hot(module)(App);
