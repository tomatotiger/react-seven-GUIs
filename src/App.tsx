import * as React from 'react';
import { Counter, CounterWithHooks } from './components/counter';

export default function App() {
  return (
    <div>
      Hi!
      <Counter />
      <CounterWithHooks />
    </div>
  );
}
