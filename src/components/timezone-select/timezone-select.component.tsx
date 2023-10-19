import Form from 'react-bootstrap/Form'
import 'moment-timezone'
import { useEffect, useState } from 'react'
import { Container, Modal } from 'react-bootstrap'
import { TimeZone } from '../../types/timezone.type'
import useTimeZonesContext from '../../hooks/useTimeZonesContext'
import { getAvailableTimeZones } from '../../utils/time-zones.util'

export interface ITimeZoneSelectProps {
  tz?: TimeZone | null
  setIsShow(_value: boolean): void
}

export const TimeZoneSelectComponent = ({ tz, setIsShow }: ITimeZoneSelectProps) => {
  const options: TimeZone[] = getAvailableTimeZones()

  const [isShow, setShow] = useState<boolean>(true)
  const [search, setSearch] = useState<string>(tz?.label || '')

  const { addTimeZone, changeTimeZone } = useTimeZonesContext()

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onChangeTz = (selectedTimeZone: TimeZone) => {
    if (tz) {
      changeTimeZone(tz, selectedTimeZone)
    } else {
      addTimeZone(selectedTimeZone)
    }

    hide()
  }

  const hide = () => {
    setShow(false)
    setIsShow(false)
  }

  useEffect(() => {
    if (isShow) {
      setSearch(tz?.label || '')
    }
  }, [isShow])

  return (
    <Modal show={isShow} onHide={hide}>
      <Modal.Body className='bg-dark'>
        <Container>
          <Form.Control className='bg-dark' value={search} onChange={onSearch} />
          {options
            .filter((timezone: TimeZone) =>
              timezone.value.toLowerCase().includes(search.toLowerCase()),
            )
            .map((timezone: TimeZone) => {
              return (
                <>
                  <button
                    key={timezone.value}
                    onClick={() => onChangeTz(timezone)}
                    className='bg-dark time-zone'>
                    {timezone.label}
                  </button>
                  <br />
                </>
              )
            })}
        </Container>
      </Modal.Body>
    </Modal>
  )
}
