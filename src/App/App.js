import { ChakraProvider, theme } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import LandingPage from '../pages/LandingPage';
import HomePage from '../pages/HomePage';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <HomePage />
            </PrivateRoute>
          }
        />
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
