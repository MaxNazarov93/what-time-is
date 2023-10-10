import Form from 'react-bootstrap/Form';
import 'moment-timezone';
import { useEffect, useState } from 'react';
import { Container, Modal } from 'react-bootstrap';
import { TimeZone } from '../../models/timezone';

export interface ITimeZoneSelectProps {
  options: TimeZone[]
  tz?: TimeZone | null
  setIsShow(value: boolean): void
  setTz(tz: TimeZone): void
}

export const TimeZoneSelectComponent = ({ options, tz, setTz, setIsShow }: ITimeZoneSelectProps) => {
  const [ isShow, setShow ] = useState<boolean>(true)
  const [ search, setSearch ] = useState<string>(tz?.label || '')

  const onSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onChangeTz = (tz: TimeZone) => {
    setTz(tz)
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

  return <Modal
      show={isShow}
      onHide={ hide }
  >
    <Modal.Body className='bg-dark'>
    <Container>
      <Form.Control
      className='bg-dark'
      value={ search }
      onChange={ onSearch }
      />
      { options
          .filter((timezone: TimeZone) => timezone.value.toLowerCase().includes(search.toLowerCase()))
          .map((timezone: TimeZone) => {
            return (
              <p
                key={ timezone.value }
                onClick={ () => onChangeTz(timezone) }
              >
                { timezone.label }
              </p>
            )
          })
      }
    </Container>
    </Modal.Body>
  </Modal>
}