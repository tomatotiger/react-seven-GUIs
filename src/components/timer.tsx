import * as React from 'react';

type TimerClassState = {
  elapsedTime: number;
  duration: number;
};

interface Timer {
  elapsedTime: number;
  duration: number;
  setDuration(duration: number);
  resetElapsedTime();
}

function withTimer<Props extends Timer>(
  WrappedComponent: React.Component<Props>,
): React.Component {
  return class extends React.Component<{}, TimerClassState> {
    static displayName = 'WithTimer';
    state = {
      elapsedTime: 0,
      duration: 0,
    };

    private timer: NodeJS.Timeout;
    private intervalMS = 50;

    setDuration = (d: number) => {
      this.setState({ duration: d });
    };

    createTimer = () => {
      if (!this.timer) {
        this.timer = setInterval(() => {
          this.setState(currentState => ({
            elapsedTime: currentState.elapsedTime + this.intervalMS / 1000,
          }));
        }, this.intervalMS);
      }
    };

    quitTimer = () => {
      if (this.timer) {
        clearInterval(this.timer);
        this.timer = null;
      }
    };
    UNSAFE_componentWillUpdate(nextProps, nextState) {
      if (nextState.elapsedTime < nextState.duration) {
        this.createTimer();
      } else {
        this.quitTimer();
      }
    }

    componentWillUnmount() {
      this.quitTimer();
    }

    resetElapsedTime = () => {
      this.setState({ elapsedTime: 0 });
    };

    render() {
      return (
        <WrappedComponent
          elapsedTime={this.state.elapsedTime}
          duration={this.state.duration}
          setDuration={this.setDuration}
          resetElapsedTime={this.resetElapsedTime}
        />
      );
    }
  };
}

class UnconnectedTimer extends React.Component<Timer> {
  render() {
    const { elapsedTime, duration } = this.props;
    return (
      <div>
        <h2>Timer</h2>
        Elapsed Time: <progress value={elapsedTime} max={duration}></progress>
        <label>{elapsedTime.toFixed(1)}</label>
        <input
          type="range"
          min="0"
          max="60"
          value={duration}
          onChange={e => this.props.setDuration(Number(e.target.value))}
        />
        <button onClick={this.props.resetElapsedTime}>Reset</button>
      </div>
    );
  }
}

export const TimerClass = withTimer(UnconnectedTimer);

const useTimer = (): Timer => {
  const intervalInMS = 50;
  const [elapsedTime, setElapsedTime] = React.useState<number>(0);
  const [duration, setDuration] = React.useState<number>(0);

  React.useEffect(() => {
    if (elapsedTime < duration) {
      const timer = setInterval(() => {
        setElapsedTime(currentTime => currentTime + intervalInMS / 1000);
      }, intervalInMS);
      return () => clearInterval(timer);
    }
  }, [duration > elapsedTime]);

  const resetElapsedTime = (): void => {
    setElapsedTime(0);
  };

  return { elapsedTime, duration, setDuration, resetElapsedTime };
};

export function TimerHook(): React.ReactElement {
  const timer = useTimer();

  return (
    <div>
      <h2>Timer with React Hooks</h2>
      Elapsed Time: <progress value={timer.elapsedTime} max={timer.duration}></progress>
      <label>{timer.elapsedTime.toFixed(1)}</label>
      <input
        type="range"
        min="0"
        max="60"
        value={timer.duration}
        onChange={e => {
          timer.setDuration(Number(e.target.value));
        }}
      />
      <button onClick={() => timer.resetElapsedTime()}>Reset</button>
    </div>
  );
}
