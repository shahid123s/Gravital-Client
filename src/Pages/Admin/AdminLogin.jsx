import React from 'react'
import TiltedComponent from '../../Components/User/TiltedComponent'
import LoginComponent from '../../Components/User/LoginComponent'
import { AdminRequireAuth } from '../../Components/Private/AdminAuth'

function AdminLogin() {
  return (
    <AdminRequireAuth>
        <TiltedComponent isAdmin={true}>
            <LoginComponent isAdmin={true}>
            </LoginComponent>
        </TiltedComponent>
    </AdminRequireAuth>
  )
}

export default AdminLogin
