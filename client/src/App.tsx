import Signup from './components/Authentication/Signup';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Authentication/Login';
import PrivateRoute from './components/Authentication/PrivateRoute'
import ForgotPassword from './components/Authentication/ForgotPassword'
import UpdateProfile from './components/Authentication/UpdateProfile'
import Dashboard from './components/Trips/dashboard/Dashboard';
import Profile from './components/Authentication/Profile';
import TripsBoard from './components/Trips/TripsBoard';
import GamesBoard from './components/Trips/GamesBoard';
import Requests from './components/Trips/Requests';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          {/*Trips*/}
          <Route path="/" element={<Dashboard />} />
          <Route path="/trips/:gameId" element={<TripsBoard />} />
          <Route path="/user/next" element={<GamesBoard />} />

          {/*Profile TODO: private route*/}
          <Route path="/user" element={<Profile />} />
          <Route path="/update-profile" element={
            <UpdateProfile />
          } />
          <Route path="/user/requests" element={
            <Requests />
          } />

          {/*Authenticate*/}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App