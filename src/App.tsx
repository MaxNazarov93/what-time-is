import './App.css'
import Container from 'react-bootstrap/Container'
import Stack from 'react-bootstrap/Stack'
import { useState } from 'react'
import { Button } from 'react-bootstrap'

import { TimeZoneSelectComponent } from './components/timezone-select/timezone-select.component'
import TimeZonesProvider from './providers/time-zone/time-zones.provider'
import TimeZoneList from './components/timezone-list/timezone-list.component'

function App() {
  const [show, setIsShow] = useState<boolean>(false)

  return (
    <TimeZonesProvider>
      <Container className='p-3 justify-content-md-center'>
        <Stack gap={3}>
          <TimeZoneList />
          <Button variant='warning' onClick={() => setIsShow(true)}>
            +
          </Button>
        </Stack>
      </Container>
      {show && <TimeZoneSelectComponent setIsShow={setIsShow} />}
    </TimeZonesProvider>
  )
}

export default App
