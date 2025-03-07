import React, { useState } from 'react'
import SettingsLink from './SettingsLink';
import UserLogo from '../../../assets/user.svg';
import PremiumLogo from '../../../assets/crown.svg';
import AccountPrivacyLogo from '../../../assets/privacy.svg';
import ContentPreferenceLogo from '../../../assets/content.svg';
import LikeAndCommentLogo from '../../../assets/likeAndComment.svg';
import Help from '../../../assets/question.svg';
import MutedAccountLogo from '../../../assets/muted.svg';
import AccountStatsLogo from '../../../assets/skills.svg';
import FamilyCenterLogo from '../../../assets/family.svg';
import BlokedUserLogo from '../../../assets/block-user.svg';
import ArchiveLogo from  '../../../assets/archive.svg'

function SettingsList() {
    const [search, setSearch] = useState('');
    const handleChange = (event) => {
        const { value } = event.target;
        setSearch(value);
        console.log(search)
    }


    return (
        <div className='fixed flex flex-col ml-56 bg-[#121212] w-96 h-screen items-start gap-3 pt-7 p-1  border-r-[.2px] border-[#828282] '>
            <div className='bg-inherit flex flex-col w-full gap-2  py-2'>
                <h1 className='bg-inherit text-4xl font-light pl-4  text-white font-poppins '>{'Settings'}</h1>

                <input type="text" value={search} onChange={handleChange} placeholder='Search' pattern="[a-zA-Z\s]" className='w-full p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl resize-none overflow-hidden text-white placeholder-gray-300' />

            </div>
            <div className='bg-inherit w-full flex flex-col gap-7 pl-5 '>
                <SettingsLink name={'Edit Profile'} logo={UserLogo} />
                <SettingsLink name={'Account Privacy'} logo={AccountPrivacyLogo} />
                <SettingsLink name={'Premium'} logo={PremiumLogo} />
                <SettingsLink name={'Archive'} logo={ArchiveLogo} />
                <SettingsLink name={'Activity'} logo={UserLogo} />
                <SettingsLink name={'Content Preference'} logo={ContentPreferenceLogo} />
                <SettingsLink name={'Likes and Comment'} logo={LikeAndCommentLogo} />
                <SettingsLink name={'Muted Account'} logo={MutedAccountLogo} />
                <SettingsLink name={'Help'} logo={Help} />
                <SettingsLink name={'Family Center'} logo={FamilyCenterLogo} />
                <SettingsLink name={'Block'} logo={BlokedUserLogo} />
                <SettingsLink name={'Account Status'} logo={AccountStatsLogo} />
            </div>
        </div>
    )
}

export default SettingsList
