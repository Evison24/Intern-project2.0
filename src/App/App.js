import { ChakraProvider, theme } from '@chakra-ui/react';
import Navbar from '../components/Navbar';
import LandingPage from '../pages/LandingPage';
import HomePage from '../pages/HomePage';
import { Route, Routes } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';
import ProductsChart from '../components/charts/ProductsChart';
import XYusersChart from '../components/charts/XYusersChart';
import UserProfile from '../components/user/profile/UserProfile';

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
        <Route
          path="/user-chart"
          element={
            <PrivateRoute>
              <ProductsChart />
            </PrivateRoute>
          }
        />
        <Route
          path="/all-users-chart"
          element={
            <PrivateRoute>
              <XYusersChart />
            </PrivateRoute>
          }
        />
        <Route
          path="/my-profile"
          element={
            <PrivateRoute>
              <UserProfile />
            </PrivateRoute>
          }
        />
      </Routes>
    </ChakraProvider>
  );
}

export default App;
