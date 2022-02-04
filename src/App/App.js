import { ChakraProvider, theme } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import LandingPage from '../pages/LandingPage';
import { Route, Routes } from 'react-router-dom';
import Login from '../components/Login';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route path="/" element={<LandingPage />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
