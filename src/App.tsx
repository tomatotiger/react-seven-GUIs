import * as React from 'react';
import { hot } from 'react-hot-loader';
import { Counter, CounterWithHooks } from './components/counter';

function App() {
  return (
    <div>
      Hi!
      <Counter />
      <CounterWithHooks />
    </div>
  );
}

export default hot(module)(App);
