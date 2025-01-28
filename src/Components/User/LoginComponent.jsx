import { useEffect, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../app/feature/userSlice";
import { adminLogin } from "../../app/feature/adminSlice";



function LoginComponent({ isAdmin }) {
    const [tilte, setTilte] = useState('LOGIN')
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const navigate = useNavigate()
    const dispatch = useDispatch();

    const { isAuthenticate, error, loading } = useSelector((state) => state.userAuth)
    const {isAdmin: validateAdmin} = useSelector(state => state.adminAuth)
   

    useEffect(() => {
        if (isAdmin) {
            setTilte('ADMIN LOGIN')
        }
        else{
        }
    }, []);

    const handleChange = (event) => {
        const { value, name } = event.target;
        setFormData({ ...formData, [name]: value })
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            if (isAdmin) {
                dispatch(adminLogin(formData))
                .unwrap()
                .then(res => {
                    console.log(res);
                    toast.success('Admin Login Successfully');
                    navigate('/admin/home');
                })                
                .catch(err => {
                    console.log(err)
                    toast.error(err)
                })
            } else {
                dispatch(login(formData))
                    .unwrap()
                    .then((res) => {
                        // console.log(res);
                        toast.success("Login Successfully")
                        navigate('/home')
                    })
                    .catch(err => {
                        toast.error(err)
                    })
            }
        } catch (error) {
            console.log(error, 'ooi')
        }
    }



    return (
        <div className="pb-5 flex flex-col sm:p-2 sm:w-96 md:w-96 md:p-8 items-center gap-5 rounded-lg justify-center bg-[#f9f9f9]'" >
            <h2 className='text-24px font-poppins font-medium text-[#000]' >{tilte}</h2>
            <form action=""
                onSubmit={handleSubmit}
                className='flex flex-col   gap-3  md:gap-4 w-full '
            >
                <div className='flex flex-col gap-1 w-full'>
                    <label htmlFor="username"
                        className='text-[#99775C] font-medium text-lg'
                    >Email</label>
                    <input
                        type="text"
                        name="email"
                        id="email"
                        placeholder='Value'
                        onChange={handleChange}
                        className='w-76 rounded-md px-3 py-2  border-1 border-black'
                    />
                </div>
                <div className='flex flex-col gap-1 w'>
                    <label htmlFor="username"
                        className='text-[#99775C] font-medium text-lg'
                    >Password</label>
                    <input
                        type="text"
                        name="password"
                        id="username"
                        onChange={handleChange}
                        placeholder='Value'
                        className='w-76 rounded-md px-3 py-2  border-1 border-black'

                    />
                </div>


                <input type="submit" value="Sign in"
                    className='bg-[#2c2c2c] rounded-md py-2 text-white font-poppins' />

            </form>
            {!isAdmin && <div className="flex flex-col justify-center items-center gap-1">
                <Link className='text-[#99775C] cursor-pointer hover:underline' to={'/reset-password/email'}>Forget Password ?</Link>
                <Link className='text-[#99775C] cursor-pointer hover:underline' to={'/register'}>Create a new Account ?</Link>

            </div>}
        </div>
    )
}

export default LoginComponent
