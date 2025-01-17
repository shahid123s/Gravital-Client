import React from 'react'
import Logo from '../../assets/logo-white.svg'
import SidebarLinks from '../SidebarLinks';
import dashboardLogo from '../../assets/dashboard.svg';
import commentLogo from '../../assets/comment.svg';
import premiumLogo from '../../assets/crown.svg';
import reportLogo from '../../assets/exclamation.svg';
import postLogo from '../../assets/post.svg';
import userLogo from '../../assets/user.svg';
import logoutLogo from '../../assets/out.svg';
import { useDispatch } from 'react-redux';
import { adminLogout } from '../../app/feature/adminSlice';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';
function AdminSideBar() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
    

  const handleLogout = async (event) => {
    event.preventDefault();

    dispatch(adminLogout())
    .unwrap()
    .then((res) => {
      console.log(res);
      toast.success(res.message);
      navigate('/admin/login');
    })
    .catch(err => toast.error(err));

  }
  return (
    <div className='fixed flex flex-col left-0 bg-[#333333] w-56 h-screen items-center pt-10  '>
        <img src={Logo} alt=""  className='bg-transparent w-11/12 mb-7'  />
        <div className='bg-inherit flex-col flex gap-9 items-start'>
        <SidebarLinks logo = {dashboardLogo} name= {'Dashboard'} isAdmin={true} ></SidebarLinks>
        <SidebarLinks logo = {userLogo} name= {'Users'} isAdmin={true} ></SidebarLinks>
        <SidebarLinks logo = {postLogo} name= {'Posts'} isAdmin={true} ></SidebarLinks>
        <SidebarLinks logo = {commentLogo} name= {'Comments'} isAdmin={true} ></SidebarLinks>
        <SidebarLinks logo = {reportLogo} name= {'Reports'} isAdmin={true} ></SidebarLinks>
        <SidebarLinks logo = {premiumLogo} name= {'Premium'} isAdmin={true} ></SidebarLinks>
        </div> 
        <button className='mt-auto mb-5  w-1/6 gap-2 flex justify-center items-center'  onClick={handleLogout}><img src={logoutLogo}/><span className='text-white text-md font-medium '>Logout</span></button>
    </div>
  )
}

export default AdminSideBar