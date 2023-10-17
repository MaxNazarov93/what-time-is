import './App.css'
import Container from 'react-bootstrap/Container'
import moment, { Moment } from 'moment-timezone'
import Stack from 'react-bootstrap/Stack'
import { useState } from 'react'
import { Button } from 'react-bootstrap'
import { TimeZone } from './types/timezone.type'

import TimeInputComponent from './components/time-input/time-input.component'
import { TimeZoneSelectComponent } from './components/timezone-select/timezone-select.component'
import { getList } from './utils/favourites.util'

function App() {
  const [t, setT] = useState<Moment>(moment())
  const favourites = getList()
  const [rows, setRows] = useState<{ tz: TimeZone; isFavourite: boolean }[]>(
    favourites.length > 0
      ? favourites.map((value) => ({
          tz: value.tz,
          isFavourite: true,
        }))
      : [
          {
            tz: new TimeZone(moment.tz.guess()),
            isFavourite: false,
          },
        ],
  )
  const [show, setIsShow] = useState<boolean>(false)

  const options: TimeZone[] = moment.tz
    .names()
    .map((item: string) => new TimeZone(item))
    .sort((a: TimeZone, b: TimeZone) => (a.label > b.label ? 1 : -1))

  const addRow = (tz: TimeZone) => {
    setRows([...rows, { tz, isFavourite: false }])
  }

  return (
    <>
      <Container className='p-3'>
        <Stack gap={3}>
          {rows.map(({ tz, isFavourite }: { tz: TimeZone; isFavourite: boolean }, i: number) => {
            return (
              <TimeInputComponent
                defaultIsFavourite={isFavourite}
                key={i}
                options={options}
                t={t}
                changeT={setT}
                defaultTz={tz}
              />
            )
          })}
          <Button variant='warning' onClick={() => setIsShow(true)}>
            +
          </Button>
        </Stack>
      </Container>
      {show && (
        <TimeZoneSelectComponent
          options={options}
          setIsShow={setIsShow}
          setTz={(tz: TimeZone) => {
            addRow(tz)
          }}
        />
      )}
    </>
  )
}

export default App
