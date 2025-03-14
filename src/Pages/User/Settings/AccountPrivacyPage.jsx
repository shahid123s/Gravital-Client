import React from 'react'
import { UserAuth } from '../../../Components/Private/UserAuth'

function AccountPrivacyPage() {
  return (
    <UserAuth>

    <div className='min-h-screen flex'>
      <Sidebar/>
      <SettingsList/>

    </div>
    </UserAuth>
  )
}

export default AccountPrivacyPage
