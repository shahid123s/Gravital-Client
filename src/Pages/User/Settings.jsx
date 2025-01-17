
import React from 'react'
import Sidebar from '../../Components/User/Sidebar'
import SettingsList from '../../Components/User/settingsComponent/SettingsList'
import SettingsContent from '../../Components/User/settingsComponent/SettingsContent'
import { UserAuth } from '../../Components/Private/UserAuth'

function Settings() {
  return (
    <UserAuth>
      <div className='min-h-screen flex'>
        <Sidebar/>
        <SettingsList/>
        <SettingsContent/>
    </div>
    </UserAuth>
  )
}

export default Settings
