import Form from 'react-bootstrap/Form';
import 'moment-timezone';
import moment, { Moment } from 'moment-timezone';
import { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import { TimeZoneSelectComponent } from '../timezone-select/timezone-select.component';
import { TimeZone } from '../../models/timezone';

interface ITimeInputProps {
  readonly options: TimeZone[]
  readonly t: Moment
  readonly defaultTz: TimeZone
  changeT(t: Moment): void;
}

const TimeInputComponent = ({ options, t, changeT, defaultTz }: ITimeInputProps) => {
  const [ tz, setTz ] = useState<TimeZone>(defaultTz)
  const [ show, setIsShow ] = useState<boolean>(false)

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
            <Form.Control
              className='bg-dark'
              type="time"
              value={ tz && tz ? t.tz(tz.value).format('HH:mm') : '' }
              onChange={ onChangeT }
            />
            <p
              className='time-zone'
              onClick={ () => setIsShow(true) }
            >
              { tz.label } { tz.offset }
            </p>
          </Col>
        </Row>
      </Container>
      { show && <TimeZoneSelectComponent
          options={ options }
          tz={ tz }
          setIsShow={ setIsShow }
          setTz={ setTz }
        />
      }
    </>
  )
}

export default TimeInputComponent;