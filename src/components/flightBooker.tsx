import * as React from 'react';

type FlightType = 'oneWay' | 'return';

const getFlightOptionText = (k: FlightType) => {
  switch (k) {
    case 'oneWay':
      return 'One-way flight';
    case 'return':
      return 'Return flight';
  }
};
//TODO: pick dateinput as a component

function FlightTypeOption(props: { flightType: FlightType }) {
  return <option value={props.flightType}>{getFlightOptionText(props.flightType)}</option>;
}

export function FlightBooker(): React.ReactElement {
  const initialDate = new Date('2019-09-12');
  const [flightType, setFlightType] = React.useState<FlightType>('oneWay');
  const [startDate, setStartDate] = React.useState<Date>(initialDate);
  const [returnDate, setReturnDate] = React.useState<Date>(initialDate);

  const formatDate = (d: Date) => {
    const dIso = d.toISOString();
    return dIso.split('T')[0];
  };

  const showFlight = () => {
    if (flightType === 'oneWay') {
      alert(`You have booked a ${getFlightOptionText(flightType)} on ${formatDate(startDate)}.`);
    } else {
      alert(
        `You have booked a ${getFlightOptionText(flightType)} which starts on ${formatDate(
          startDate,
        )} and returns on ${formatDate(returnDate)}.`,
      );
    }
  };

  return (
    <div>
      <h2>Flight Booker</h2>
      <select value={flightType} onChange={e => setFlightType(e.target.value as FlightType)}>
        <FlightTypeOption flightType={'oneWay'} />
        <FlightTypeOption flightType={'return'} />
      </select>
      <input
        type="date"
        value={formatDate(startDate)}
        onChange={e => setStartDate(new Date(e.target.value))}
      />
      <input
        disabled={flightType === 'oneWay'}
        type="date"
        value={formatDate(returnDate)}
        onChange={e => setReturnDate(new Date(e.target.value))}
      />
      <button disabled={returnDate < startDate} onClick={showFlight}>
        Book
      </button>
    </div>
  );
}
