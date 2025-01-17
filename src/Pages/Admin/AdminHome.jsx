import React from 'react'
import AdminContent from '../../Components/Admin/AdminContent'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import AdminTableComponent from '../../Components/Admin/AdminTableComponent'
import Modal from '../../Components/Modal'
import { AdminAuth } from '../../Components/Private/AdminAuth'

function AdminHome() {
    return (
        <div>
            <AdminAuth>
            <AdminSideBar />
            <AdminContent name={'Dashboard'} >
                <Modal/>
            </AdminContent>
            </AdminAuth>
        </div>
    )
}

export default AdminHome