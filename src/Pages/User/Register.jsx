import React from 'react'
import TiltedComponent from '../../Components/User/TiltedComponent'
import RegisterComponent from '../../Components/User/RegisterComponent'
import LoginComponent from '../../Components/User/LoginComponent'
import Otpverfication from '../../Components/User/OtpVerfication'
import { Outlet } from 'react-router-dom'

function Register() {
  return (
    <div>
      <Outlet/>
      <TiltedComponent>
        <RegisterComponent/>
      </TiltedComponent>
    </div>
  )
}

export default Register
