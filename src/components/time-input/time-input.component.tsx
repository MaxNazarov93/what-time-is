import Form from 'react-bootstrap/Form'
import moment, { Moment } from 'moment-timezone'
import { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { BsStar, BsStarFill } from 'react-icons/bs'
import { TimeZoneSelectComponent } from '../timezone-select/timezone-select.component'
import { TimeZone } from '../../types/timezone.type'
import { saveFavourite, deleteFavourite } from '../../utils/favourites.util'

interface ITimeInputProps {
  readonly options: TimeZone[]
  readonly t: Moment
  readonly defaultTz: TimeZone
  readonly defaultIsFavourite: boolean
  changeT(_t: Moment): void
}

const TimeInputComponent = ({
  options,
  t,
  changeT,
  defaultTz,
  defaultIsFavourite,
}: ITimeInputProps) => {
  const [tz, setTz] = useState<TimeZone>(defaultTz)
  const [show, setIsShow] = useState<boolean>(false)
  const [isFavourite, setIsFavourite] = useState<boolean>(defaultIsFavourite)

  const onChangeT = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (tz) {
      changeT(moment(e.target.value, 'HH:mm').tz(tz.value))
    }
  }

  const changeIsFavourite = (value: boolean) => {
    if (value) {
      saveFavourite({ tz: tz })
    } else {
      deleteFavourite({ tz: tz })
    }
    setIsFavourite(value)
  }

  return (
    <>
      <Container>
        <Row>
          <Col>
            {isFavourite && (
              <BsStarFill className='orange' size={30} onClick={() => changeIsFavourite(false)} />
            )}
            {!isFavourite && (
              <BsStar className='orange' size={30} onClick={() => changeIsFavourite(true)} />
            )}
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
