import Form from 'react-bootstrap/Form';
import 'moment-timezone';
import moment, { Moment } from 'moment-timezone';
import { useState } from 'react';
import Select from 'react-select';
import { Option, getTimeZoneOption } from '../models/option';
import { Options } from 'react-select';
import { Col, Container, Row } from 'react-bootstrap';

interface ITimeInputProps {
  readonly options: Options<Option>
  readonly t: Moment
  readonly defaultTz?: string | null
  changeT(t: Moment): void;
}

const TimeInputComponent = ({ options, t, changeT, defaultTz }: ITimeInputProps) => {
  const [ tz, setTz ] = useState<Option | null>(getTimeZoneOption(defaultTz || ''))

  const onChangeT = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (tz) {
      changeT(moment(e.target.value, 'HH:mm').tz(tz.value))
    }
  }

  return (
    <Container>
      <Row>
        <Col>
          <Form.Control
            type="time"
            value={ tz && tz.value ? t.tz(tz.value).format('HH:mm') : '' }
            onChange={ onChangeT }
          />
        </Col>
        <Col>
        <Select
          isSearchable={ true }
          value={ options.find((option: Option) => option.value === tz?.value ) }
          options={ options }
          onChange={ setTz }
        />
        </Col>
      </Row>
    </Container>
  )
}

export default TimeInputComponent;