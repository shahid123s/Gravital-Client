import React, { useState } from 'react'
import AdminContent from '../../Components/Admin/AdminContent'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import Pagination from '../../Components/Pagination'
import AdminTableComponent from '../../Components/Admin/AdminTableComponent'
import { adminAxiosInstance } from '../../utilities/axios'
import { toast } from 'sonner'
import TABLE_HEADERS from '../../enum/tableHeader'

function AdminPosts() {
  const [search, setSearch] = useState('');
  const [postDetails, setpostDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const  limit = 2;

  const fetchPostList = async () => {
    try {
      setIsLoading(true);
      const response  = await adminAxiosInstance.get('/posts',{
        params: {page: currentPage, limit, search},
      })
      console.log(response)
      if(response.data.totalPages < currentPage){
        setCurrentPage(1)
      }
      setpostDetails(response.data.postList);
      setTotalPages(response.data.totalPages);
      setIsLoading(false)
    
    } catch (error) {
      toast.error(error.message)  ;
    }
  }




  return (
    <div>
        <AdminSideBar/>
      <AdminContent name={'Post List'} search={search} setSearch={setSearch} >
        <AdminTableComponent
          search={search}
          fetchData={fetchPostList}
          isLoading={isLoading}
          fetchedDatas={postDetails}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
          TABLE_HEADERS={TABLE_HEADERS.POST_HEADER}
        />
      </AdminContent>
    </div>
  )
}

export default AdminPosts
