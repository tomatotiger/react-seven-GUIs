import * as React from 'react';

export function Timer(): React.ReactElement {
  const [elapsedTime, setElapsedTime] = React.useState<number>(0);
  const [duration, setDuration] = React.useState<number>(0);

  React.useEffect(() => {
    if (elapsedTime < duration) {
      const timer = setInterval(() => {
        setElapsedTime(currentTime => currentTime + 0.05);
      }, 50);
      return () => clearInterval(timer);
    }
  }, [duration > elapsedTime]);

  return (
    <div>
      <h2>Timer</h2>
      Elapsed Time: <progress value={elapsedTime} max={duration}></progress>
      <label>{elapsedTime.toFixed(0)}</label>
      <input
        type="range"
        min="0"
        max="60"
        value={duration}
        onChange={e => {
          setDuration(Number(e.target.value));
        }}
      />
      <button>Reset</button>
    </div>
  );
}
