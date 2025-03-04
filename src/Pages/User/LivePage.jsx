
import React from 'react'
import { UserAuth } from '../../Components/Private/UserAuth'
import Sidebar from '../../Components/User/Sidebar'
import LiveComponent from '../../Components/User/LiveComponent'
import Viewer from '../../Components/User/Viewer'
import ViewerPage from './sream/ViewerPage'

function LivePage() {
  return (
    <UserAuth>
        <Sidebar/>
        <div className= 'min-h-screen bg-[#121212] w-full flex flex-col'>

          <ViewerPage/>
        </div>
    </UserAuth>
      

  )
}

export default LivePage;

