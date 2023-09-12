import './App.css';
import Container from 'react-bootstrap/Container';
import moment, { Moment } from 'moment-timezone';
import Stack from 'react-bootstrap/Stack';
import { Options } from 'react-select';
import { Option, getTimeZoneOption } from './models/option';

import TimeInputComponent from './components/time-input.component';
import { useState } from 'react';
import { Button } from 'react-bootstrap';

function App() {
  const [ t, setT ] = useState<Moment>(moment())
  const [ rows, setRows ] = useState<number>(2)

  let options: Options<Option> = moment.tz.names().map(
    (item: string): {value: string, label: string} => getTimeZoneOption(item)
  ).sort((a: Option, b: Option) => a.label > b.label ? 1 : -1)

  const addRow = () => {
    setRows(rows+1)
  }

  return (
    <Container className="p-3">
      <Stack gap={3}>
        { [...Array(rows)].map((v: number, i: number) => {
          return <TimeInputComponent
            key={ i }
            options={ options }
            t={ t }
            changeT={ setT }
            defaultTz={ i === 0 ? moment.tz.guess() : null }
          />
        }) }
        <Button
          variant="success"
          onClick={ addRow }
        >
          +
        </Button>
      </Stack>
    </Container>
  );
}

export default App;
