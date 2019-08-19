import * as React from 'react';

type TemperatureInputProps = {
  label: 'Celsius' | 'Fahrenheit';
  value: number | null;
  onChange(newValue: number): void;
};

function TemperatureInput(props: TemperatureInputProps): React.ReactElement {
  return (
    <span>
      <input
        type="number"
        value={props.value}
        step={0.1}
        onChange={e => props.onChange(parseFloat(e.target.value))}
      />
      {props.label}
    </span>
  );
}

const useTempurature = () => {
  const [celsius, setCelsius] = React.useState<number | null>(null);
  const [fahrenheit, setFahrenheit] = React.useState<number | null>(null);

  return {
    celsius,
    setCelsius: c => {
      setCelsius(c);
      setFahrenheit(c * (9 / 5) + 32);
    },
    fahrenheit,
    setFahrenheit: f => {
      setFahrenheit(f);
      setCelsius((f - 32) * (5 / 9));
    },
  };
};

export function TemperatureConverter(): React.ReactElement {
  const { celsius, setCelsius, fahrenheit, setFahrenheit } = useTempurature();
  return (
    <div>
      <h2>Temperature Converter</h2>
      <TemperatureInput label={'Celsius'} value={celsius} onChange={setCelsius} />
      =
      <TemperatureInput label={'Fahrenheit'} value={fahrenheit} onChange={setFahrenheit} />
    </div>
  );
}
