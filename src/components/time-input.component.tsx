import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';

declare namespace Intl {
  type Key = 'calendar' | 'collation' | 'currency' | 'numberingSystem' | 'timeZone' | 'unit';

  function supportedValuesOf(input: Key): string[];
}

let formatDate = (date: Date) => {
  var hours = date.getHours();
  var minutes = date.getMinutes();
  return (hours < 10 ? '0' + hours : hours) + ':' + (minutes < 10 ? '0' + minutes : minutes);
}

const TimeInputComponent = () => {
  let currentTime = new Date()
  return (
    <Form>
      <Form.Control type="" value={ formatDate(currentTime) } />
      <Form.Select>
        {
          Intl.supportedValuesOf('timeZone').map((item: string) => {
            return <option key={item}>{item}</option>
          })
        }
      </Form.Select>
    </Form>
  )
}

export default TimeInputComponent;