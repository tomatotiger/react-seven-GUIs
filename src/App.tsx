import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Counter, CounterWithHooks } from './components/counter';
import { TemperatureConverter } from './components/temperatureConverter';
import { FlightBooker } from './components/flightBooker';

function App() {
  return (
    <div>
      Hi!
      <Counter />
      <CounterWithHooks />
      <TemperatureConverter />
      <FlightBooker />
    </div>
  );
}

export default hot(module)(App);
