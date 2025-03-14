import { useState } from 'react'
import validate from '../../../utilities/validate';
import { toast } from 'sonner';
import { axiosInstance } from '../../../utilities/axios';


function PasswordChangeForm({setClose}) {
    const [passwords, setPasswords] = useState({
        currentPassword: '',
        newPassword: '',
        confirmPassword: '',
    });
    const [error ,setError] = useState(null)

    const handleChange = (e) => {
        setError(null)
        const { name, value } = e.target;
        setPasswords(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    const handleSumbit = async (e) => {
        e.preventDefault()
        const {currentPassword, newPassword, confirmPassword} = passwords
        if(newPassword !== confirmPassword) return toast.error('Passwords do not match')
        if(newPassword === currentPassword) return toast.error('New password cannot be the same as the current password')
        const error = await validate({password: passwords.newPassword})
        if(error?.password) return toast.error(error.password)

        try {
            const response = await axiosInstance.patch('/user/change-password', passwords);
            toast.success('Password Changed Successfully')
            setClose()

        } catch (error) {
            toast.error(error.message || 'Error changing password')
        }
    }
    return (

        <form 
            onSubmit={handleSumbit}
            className='flex flex-col gap-2 w-full p-5'
        >
            <div className="mb-4 flex flex-col justify-start items-start" >
                <label htmlFor="currentPassword" className="block text-sm font-poppins font-medium text-white">Current Password</label>
                <input
                    type="password"
                    id="currentPassword"
                    name="currentPassword"
                    placeholder='Current Password'
                    autoComplete="off"
                    autoCorrect="off"
                    autoCapitalize="off"
                    spellCheck="false"
                    onChange={handleChange}
                    value={passwords.currentPassword}
                    className="mt-1 p-2 w-full border-black rounded-md"
                />
            </div>
            <div className="mb-4 flex flex-col justify-start items-start" >
                <label htmlFor="newPassword" className="block text-sm font-poppins font-medium text-white">New Password</label>
                <input 
                type="password" 
                id="newPassword" 
                placeholder='New Password' 
                name="newPassword" 
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                onChange={handleChange}
                value={passwords.newPassword}
                className="mt-1 p-2 w-full rounded-md" />
            </div>
            <div className="mb-4 flex flex-col justify-start items-start" >
                <label htmlFor="confirmPassword" className="block text-sm font-poppins font-medium text-white">Confirm Password</label>
                <input 
                type="password" 
                id="confirmPassword" 
                name="confirmPassword" 
                placeholder='Confirm Password' 
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                onChange={handleChange}
                value={passwords.confirmPassword}
                className="mt-1 p-2 w-full  rounded-md" />
            </div>
            <button 
            type="submit"
            className=" text-blue-500 px-4 py-2 rounded-md">Change Password</button>
        </form>


    )
}

export default PasswordChangeForm
