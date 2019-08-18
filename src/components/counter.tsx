import * as React from 'react';

type State = { count: number };

export class Counter extends React.Component<{}, State> {
  constructor(props) {
    super(props);
    this.state = { count: 0 };
    this.increase = this.increase.bind(this);
  }

  increase() {
    this.setState(currentState => ({
      ...currentState,
      count: currentState.count + 1,
    }));
  }

  render() {
    return (
      <div>
        <h2>Counter</h2>
        <input type="text" value={this.state.count} readOnly={true} />
        <button onClick={this.increase}> Count </button>
      </div>
    );
  }
}

export const CounterWithHooks: React.FunctionComponent = () => {
  const [count, setCount] = React.useState<number>(0);
  return (
    <div>
      <h2>Counter with React Hooks</h2>
      <input type="text" value={count} readOnly={true} />
      <button onClick={() => setCount(prevCount => prevCount + 1)}> Count </button>
    </div>
  );
};
