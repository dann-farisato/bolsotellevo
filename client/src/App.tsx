import Signup from './components/Authentication/signup/Signup';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Login from './components/Authentication/login/Login';
import PrivateRoute from './components/Authentication/privateRoute/PrivateRoute'
import ForgotPassword from './components/Authentication/forgotPassword/ForgotPassword'
import UpdateProfile from './components/Authentication/updateProfile/UpdateProfile'
import Dashboard from './components/Trips/dashboard/Dashboard';
import Profile from './components/Authentication/profile/Profile';
import TripsBoard from './components/Trips/tripBoard/TripsBoard';
import GamesBoard from './components/Trips/gameBoard/GamesBoard';
import Requests from './components/Trips/requests/Requests';
import NewUI from './components/NewUI';

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
      {/* <NewUI /> */}
    </BrowserRouter>
  )
}

export default App