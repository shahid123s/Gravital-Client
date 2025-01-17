import React from 'react'
import TiltedComponent from '../../Components/User/TiltedComponent'
import LoginComponent from '../../Components/User/LoginComponent'
import { UserRequireAuth } from '../../Components/Private/UserAuth'

function Login() {
  return (
    <div>
   <UserRequireAuth>
   <TiltedComponent>
        <LoginComponent/>
    </TiltedComponent>
   </UserRequireAuth>
    </div>
  )
}

export default Login
