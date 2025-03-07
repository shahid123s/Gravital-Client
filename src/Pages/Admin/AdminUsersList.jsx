import React, { useEffect, useState } from 'react'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import AdminContent from '../../Components/Admin/AdminContent'
import AdminTableComponent from '../../Components/Admin/AdminTableComponent'
import { AdminAuth } from '../../Components/Private/AdminAuth'
import { adminAxiosInstance } from '../../utilities/axios'
import TABLE_HEADERS from '../../enum/tableHeader';
import { toast } from 'sonner'

function AdminUsersList() {
  
  const [search, setSearch] = useState('');
  const [userDetails, setUserDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const  limit = 2;
  const fetchUsersList = async () => {
    try {
      setIsLoading(true);
      const response = await adminAxiosInstance.get('/users', {
        params: { page: currentPage, limit, search }
      });
      if(response.data.totalPage < currentPage) {
        setCurrentPage(1)
      }
      setUserDetails(response.data.userList);
      setTotalPages(response.data.totalPage);
      setIsLoading(false);
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <AdminAuth>
        <AdminSideBar/>
        <AdminContent name={'User List'} setSearch={setSearch} search={search} >
        <AdminTableComponent 
        search={search}
        fetchData={fetchUsersList}
        isLoading={isLoading}  
        fetchedDatas={userDetails}
        currentPage={currentPage} 
        setCurrentPage={setCurrentPage} 
        totalPages={totalPages} 
        TABLE_HEADERS={TABLE_HEADERS.USER_HEADER}
        />
        </AdminContent>
      </AdminAuth>
      
    </div>
  )
}

export default AdminUsersList
