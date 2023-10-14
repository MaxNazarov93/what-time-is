import Form from 'react-bootstrap/Form'
import moment, { Moment } from 'moment-timezone'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BsStar, BsStarFill } from 'react-icons/bs'
import { TimeZoneSelectComponent } from '../timezone-select/timezone-select.component'
import { TimeZone } from '../../models/timezone'

interface ITimeInputProps {
  readonly options: TimeZone[]
  readonly t: Moment
  readonly defaultTz: TimeZone
  changeT(_t: Moment): void
}

const TimeInputComponent = ({ options, t, changeT, defaultTz }: ITimeInputProps) => {
  const [tz, setTz] = useState<TimeZone>(defaultTz)
  const [show, setIsShow] = useState<boolean>(false)

  const onChangeT = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (tz) {
      changeT(moment(e.target.value, 'HH:mm').tz(tz.value))
    }
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            <BsStar className='orange' size={30} />
            <BsStarFill className='orange' size={30} />
          </Col>
          <Col>
            <Form.Control
              className='bg-dark'
              type='time'
              value={tz && tz ? t.tz(tz.value).format('HH:mm') : ''}
              onChange={onChangeT}
            />
            <button className='bg-dark time-zone' onClick={() => setIsShow(true)}>
              {tz.label} {tz.offset}
            </button>
          </Col>
        </Row>
      </Container>
      {show && (
        <TimeZoneSelectComponent options={options} tz={tz} setIsShow={setIsShow} setTz={setTz} />
      )}
    </>
  )
}

export default TimeInputComponent
