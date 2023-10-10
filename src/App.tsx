import './App.css';
import Container from 'react-bootstrap/Container';
import moment, { Moment } from 'moment-timezone';
import Stack from 'react-bootstrap/Stack';
import { TimeZone } from './models/timezone';

import TimeInputComponent from './components/time-input/time-input.component';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import { TimeZoneSelectComponent } from './components/timezone-select/timezone-select.component';

function App() {
  const [ t, setT ] = useState<Moment>(moment())
  const [ rows, setRows ] = useState<TimeZone[]>([new TimeZone(moment.tz.guess())])
  const [ show, setIsShow ] = useState<boolean>(false)

  let options: TimeZone[] = moment.tz.names()
    .map((item: string) => new TimeZone(item))
    .sort((a: TimeZone, b: TimeZone) => a.label > b.label ? 1 : -1)

  const addRow = (tz: TimeZone) => {
    setRows([...rows, tz])
  }

  return (
    <>
      <Container className="p-3">
        <Stack gap={3}>
          { rows.map((v: TimeZone, i: number) => {
            return <TimeInputComponent
              key={ i }
              options={ options }
              t={ t }
              changeT={ setT }
              defaultTz={ v }
            />
          }) }
          <Button
            variant="warning"
            onClick={ () => setIsShow(true) }
          >
            +
          </Button>
        </Stack>
      </Container>
      { show && <TimeZoneSelectComponent
          options={ options }
          setIsShow={ setIsShow }
          setTz={ (tz: TimeZone) => { addRow(tz) } }
        />
      }
    </>
  );
}

export default App;
