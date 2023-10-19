import Form from 'react-bootstrap/Form'
import moment from 'moment-timezone'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BsTrash3Fill } from 'react-icons/bs'
import { TimeZoneSelectComponent } from '../timezone-select/timezone-select.component'
import { TimeZone } from '../../types/timezone.type'
import './time-input.component.css'
import useTimeZoneListContext from '../../hooks/useTimeZonesContext'

interface ITimeInputProps {
  readonly tz: TimeZone
}

const TimeInputComponent = ({ tz }: ITimeInputProps) => {
  const [show, setIsShow] = useState<boolean>(false)
  const { utcTime, setUtcTime, deleteTimeZone } = useTimeZoneListContext()

  const onChangeT = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUtcTime(moment.tz(e.target.value, 'HH:mm', tz.value).utc(false))
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Form.Control
              className='bg-dark'
              type='time'
              value={tz ? utcTime.tz(tz.value).format('HH:mm') : ''}
              onChange={onChangeT}
            />
            <button className='bg-dark time-zone' onClick={() => setIsShow(true)}>
              {tz.label} {tz.offset}
            </button>
          </Col>
          <Col xs={1} className='d-flex align-items-center'>
            <BsTrash3Fill className='orange' size={30} onClick={() => deleteTimeZone(tz)} />
          </Col>
        </Row>
      </Container>
      {show && <TimeZoneSelectComponent tz={tz} setIsShow={setIsShow} />}
    </>
  )
}

export default TimeInputComponent
