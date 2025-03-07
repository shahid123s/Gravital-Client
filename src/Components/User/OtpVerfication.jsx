import { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import {axiosInstance} from "../../utilities/axios";
import { toast } from "sonner";
import Spinner from '../LoadingSpinner'

function Otpverfication() {
    const [timeLeft, setTimeLeft] = useState(0);
    const location = useLocation()
    const navigate = useNavigate()
    const [error, setError] = useState('')
    const [data, setData] = useState({
        otp: '',
        email : location.state?.email,
    // expireTime :                 
    });
    const expireTime = location.state?.expireTime 
    useEffect(()=> {
        console.log(location)
        if(!location.state?.from){
            navigate('/login')
        }
    },[])

    useEffect(() => {
        const interval = setInterval(() => {
            const remaining = Math.max(0, expireTime - Date.now());
            setTimeLeft(remaining);
            if (remaining === 0) clearInterval(interval); // Clear interval at end of timer
        }, 1000);

        return () => clearInterval(interval); // Clear interval on component unmount
    }, [location.state]);

    

    const formatTimeLeft = () => {
        const minutes = Math.floor(timeLeft / 60000);
        const seconds = Math.floor((timeLeft % 60000) / 1000);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };


    const handleChange = (event) => {
        const {name, value} = event.target;
        console.log(value,data)
        setData({...data, [name] : value });
    }
    const handleSubmit = async (event) => {
        event.preventDefault();

        try {
            let response ;
          if(!location.state?.isResetPassword){
            response = await axiosInstance.post('/auth/otp-verification',data);
          }
          else{
            response = await axiosInstance.post('/auth/otp-verification', data)
          }
            console.log(response.data)
            toast.success(response?.data?.message,{
                position: 'top-left',
                closeOnClick: true,
                draggable: false,
                style : {backgroundColor : 'transparent'}
              } )
              if(location.state?.isResetPassword){
                navigate('/reset-password', {state: {data, from: 'otp'}})
              }else{
                  navigate('/register/personal-info', {state : {data, from: 'otp'}})
              }
        } catch (error) {
            console.log(error);
            toast.warning(error?.response?.data?.message,{
                position: 'top-left',
                closeOnClick: true,
                draggable: false,
                style : {backgroundColor : 'transparent'}
              })
        }
    }

    const handleResend = async(event) => {
        event.preventDefault();
        try {
        const response = axiosInstance.post('/auth/send-otp', data)
        navigate('/otp-verification' , {state :{email : data.email, expireTime: Date.now() + 2* 60 * 1000} })
        } catch (error) {
            toast.warning(error,{
          position: 'top-left',
          closeOnClick: true,
          draggable: false,
          style : {backgroundColor : 'transparent'}
        })
        }
    }

    return (
        <div className='pb-5   flex flex-col gap-5   sm:p-2   sm:w-96   md:w-96  md:px-8 md:py-20  items-center rounded-lg justify-center bg-[#f9f9f9]' >
            <h2 className='text-24px font-poppins font-normal text-[#000]' >OTP verification</h2>
            {/* {error && <p className='text-red-500'>Username is Already used</p>} */}
            <form action=""
                onSubmit={handleSubmit}
                className='flex flex-col   gap-3  md:gap-8 w-full '
            >
                <div className='flex flex-col  gap-5 w-full'>
                    <label htmlFor="username"
                        className='text-[#99775C] text-md font-light '
                    >Please Enter the OTP send to the email. shah*********s@gmail.com</label>
                    <input
                        type="number"
                        name="otp"
                        id="otp"
                        placeholder='Value'
                        onChange={handleChange}
                        className='w-76 rounded-md px-3 py-2  border-1 border-black'
                    />
                </div>
                <input type="submit" value="Submit"
                    className='bg-[#2c2c2c] rounded-md py-2 text-white font-poppins' />

            </form>
            {timeLeft!== 0 &&  <p className='text-red-500'>{formatTimeLeft(timeLeft)}</p>}
            {!timeLeft && <Link className='text-[#99775C] cursor-pointer hover:underline'onClick={handleResend} >Resent OTP</Link>}
            {!location.state?.isResetPassword&&<Link className='text-[#99775C] cursor-pointer hover:underline' to={'/register'}>Change your Email</Link>}

        </div>
    )
}

export default Otpverfication
