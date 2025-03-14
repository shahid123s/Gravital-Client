import React from 'react'
import { UserAuth } from '../../../Components/Private/UserAuth'
import Sidebar from '../../../Components/User/Sidebar'
import SettingsList from '../../../Components/User/settingsComponent/SettingsList'
import AccountPrivacy from '../../../Components/User/settingsComponent/AccountPrivacy'

function AccountPrivacyPage() {
  return (
    <UserAuth>

      <div className='min-h-screen flex'>
        <Sidebar />
        <SettingsList />
        <AccountPrivacy />
      </div>
    </UserAuth>
  )
}

export default AccountPrivacyPage
