import './App.css';
import Container from 'react-bootstrap/Container';

import TimeInputComponent from './components/time-input.component';

function App() {
  return (
    <Container className="p-3">
      <TimeInputComponent />
    </Container>
  );
}

export default App;
