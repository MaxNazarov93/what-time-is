import Form from 'react-bootstrap/Form'
import 'moment-timezone'
import { useEffect, useState, useCallback, useRef } from 'react'
import { Col, Container, Modal, Row, Spinner } from 'react-bootstrap'
import { debounce } from 'lodash'
import { TimeZone } from '../../types/timezone.type'
import useTimeZonesContext from '../../hooks/useTimeZonesContext'
import './timezone-select.component.css'
import { getTimeZone, searchCity } from '../../utils/timezone.util'

export interface ITimeZoneSelectProps {
  tz?: TimeZone | null
  setIsShow(_value: boolean): void
}

export const TimeZoneSelectComponent = ({ tz, setIsShow }: ITimeZoneSelectProps) => {
  const [options, setOptions] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const [isShow, setShow] = useState<boolean>(true)
  const [search, setSearch] = useState<string>(tz?.label || '')

  const searchRef = useRef<any>(null)

  const { addTimeZone, changeTimeZone } = useTimeZonesContext()

  const onChangeTz = (option: any) => {
    setIsLoading(true)
    getTimeZone(option.properties.name, option.geometry.coordinates).then((result) => {
      if (tz) {
        changeTimeZone(tz, result)
      } else {
        addTimeZone(result)
      }

      setIsLoading(false)
      hide()
    })
  }

  const hide = () => {
    setShow(false)
    setIsShow(false)
  }

  useEffect(() => {
    if (isShow) {
      setSearch(tz?.label || '')
      if (tz) {
        autocomplete(tz.label)
      }
      if (!tz && searchRef.current) {
        searchRef.current.focus()
      }
    }
  }, [isShow])

  const autocomplete = useCallback(
    debounce(async (value: string) => {
      setIsLoading(true)
      searchCity(value).then((data: any) => {
        setOptions(data.features)
        setIsLoading(false)
      })
    }, 500),
    [],
  )

  useEffect(() => {
    console.log(isLoading)
  }, [isLoading])

  return (
    <Modal show={isShow} onHide={hide}>
      <Modal.Body className='bg-dark'>
        <Container>
          <Row>
            <Col>
              <Form.Control
                className='bg-dark'
                value={search}
                placeholder='Enter city name'
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setSearch(e.target.value)
                  autocomplete(e.target.value)
                }}
                ref={searchRef}
              />
            </Col>
            <Col xs={2} className='d-flex align-items-center justify-content-end'>
              <Spinner
                animation='border'
                variant='warning'
                className={!isLoading ? 'd-none' : ''}
              />
            </Col>
          </Row>
          {options.length > 0 && (
            <div className='timezone-select-list'>
              {options.map((option: any) => {
                return (
                  <div key={option.properties.osm_id}>
                    <button
                      key={option.properties.osm_id}
                      onClick={() => onChangeTz(option)}
                      style={{ textAlign: 'left' }}
                      className='bg-dark time-zone'>
                      {`${option.properties.name}, ${
                        option.properties.address.state
                          ? option.properties.address.state + ', '
                          : ''
                      } ${option.properties.address.country}`}
                    </button>
                    <br />
                  </div>
                )
              })}
            </div>
          )}
        </Container>
      </Modal.Body>
    </Modal>
  )
}
