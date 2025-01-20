import {  lazy, Suspense } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Home from './Pages/User/Home'
import Login from './Pages/User/Login'
import OTPVerification from './Pages/User/OTPVerification'
import LoadingSpinner from './Components/LoadingSpinner'
import AdminLogin from './Pages/Admin/AdminLogin'
import AdminHome from './Pages/Admin/AdminHome'
import AdminUsersList from './Pages/Admin/AdminUsersList'
import AdminPosts from './Pages/Admin/AdminPosts'
import ForgetPassword from './Pages/User/ForgetPassword'
import ForgetEmailPassword from './Pages/User/ForgetEmailPassword'
import UserProfile from './Pages/User/UserProfile'
import Settings from './Pages/User/Settings'
import Favourites from './Pages/User/Favourites'
import AdminReport from './Pages/Admin/AdminReport'


const Register = lazy(() => import('./Pages/User/Register'));
const PersonalInformtion = lazy(() => import('./Pages/User/PersonalInformtion'));

function App() {


  return (
    <>
      <Suspense fallback={<LoadingSpinner />}>

        <Router>
          <Routes>
            <Route path='/' >
              <Route index element={<Navigate to={'login'} replace />} />
              <Route path='register' element={<Register />} >
                <Route path='personal-info' element={<PersonalInformtion />} />
              </Route>
              <Route path='otp-verification' element={<OTPVerification />} />
              <Route path='login' element={<Login />} />
              <Route path='reset-password' element={<ForgetPassword />} />
              <Route path='reset-password/email' element={<ForgetEmailPassword />} />
              <Route path='home' element={<Home />} />
              <Route path='profile' element={<UserProfile />} />
              <Route path='/:username' element ={<UserProfile isCurrentUser={false}/>} />
              <Route path='settings'   >
                <Route index element={<Navigate to="edit-profile" replace />} />
                <Route path='edit-profile' element={<Settings />} />
                <Route path='account-privacy' element={<Settings />} />
              </Route>
              <Route path ='favourites' element = { <Favourites/> } />
            </Route>
            <Route path='/admin'>
              <Route index element={<AdminLogin />} replace />
              <Route path='login' element={<AdminLogin />} />
              <Route path='home' element={<Navigate to={'/admin/dashboard'} replace />} />
              <Route path='dashboard' element={<AdminHome />} />
              <Route path='users' element={<AdminUsersList />} />
              <Route path='posts' element={<AdminPosts />} />
              <Route path='reports' element={<AdminReport/>} />
            </Route>
          </Routes>
        </Router>
      </Suspense>

    </>
  )
}

export default App
