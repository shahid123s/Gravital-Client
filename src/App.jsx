import { lazy, Suspense } from 'react'
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
import Archive from './Pages/User/Archive'
// import LivePage from './Pages/User/LivePage'
// import Video from './Pages/User/Video'
// import BroadcasterPage from './Pages/User/sream/BroadcasterPage'
import MessagePage from './Pages/User/MessagePage'
import { ChatProvider } from './contextApi/chatContext'
import SeachPage from './Components/Modals/SearchModel'
import Trending from './Pages/User/Trending'
import PostCard from './Components/PostCard'
import PostPage from './Pages/User/PostPage'
import UpdatePage from './Pages/UpdatePage'
// import StreamingPage from './Pages/User/StreamingPage'


const Register = lazy(() => import('./Pages/User/Register'));
const PersonalInformtion = lazy(() => import('./Pages/User/PersonalInformtion'));
const StreamingPage = lazy(() => import('./Pages/User/StreamingPage'));

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
              <Route path='trending' element={<Trending />} />
              <Route path='post/:postId' element={<PostPage />} />
              {/* <Route path='live' element={<LivePage />} /> */}
              {/* <Route path='okay' element={<Video />} /> */}
              {/* <Route path='stream' element={<BroadcasterPage/>} /> */}
              <Route path='message' element={
                <ChatProvider>
                  <MessagePage />
                </ChatProvider>
              } />

              <Route path='/:username' element={<UserProfile isCurrentUser={false} />} />
              <Route path='settings'   >
                <Route index element={<Navigate to="edit-profile" replace />} />
                <Route path='edit-profile' element={<Settings />} />
                <Route path='account-privacy' element={<Settings />} />
                <Route path='archive' element={<Archive />} />
                <Route path='*' element={<UpdatePage />} />
              </Route>
              <Route path='favourites' element={<Favourites />} />
            </Route>
            <Route path='/admin'>
              <Route index element={<AdminLogin />}  />
              <Route path='login' element={<AdminLogin />} />
              <Route path='home' element={<Navigate to={'/admin/dashboard'} replace />} />
              <Route path='dashboard' element={<AdminHome />} />
              <Route path='users' element={<AdminUsersList />} />
              <Route path='posts' element={<AdminPosts />} />
              <Route path='reports' element={<AdminReport />} />
            </Route>
            <Route path='*' element={<div>Not Found</div>} />
            <Route path='/not-found' element={<div>Not Found</div>} />
          </Routes>
        </Router>
      </Suspense>

    </>
  )
}

export default App
