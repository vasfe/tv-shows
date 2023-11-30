import { Search } from './components/Search';
import { ShowDetails } from './components/ShowDetails';
import { Container } from '@mui/material';

const App = () => {

  return (
    <Container>
      <Search />
      <ShowDetails/>
    </Container>
  );
}

export default App;
