import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { styled, Box } from '@mui/material'
import Header from './Components/Header';
import Home from './Pages/Home';
import SingleCoin from './Pages/SingleCoin';
import './App.css'
import Alert from './Components/Alert';


function App() {

  const Container = styled(Box)({
    backgroundColor: '#14161a',
    color: 'white',
    minHeight: '100vh'
  })

  return (
    <div className="App">
      <BrowserRouter>
        <Container>
          <Header />
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/coins/:id' element={<SingleCoin />} />
          </Routes>
        </Container>
        <Alert/>
      </BrowserRouter>
    </div>
  );
}

export default App;
