import React, { act, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { adminAxiosInstance } from '../../utilities/axios';
import UserModal from '../UserModal';
import Spinner from '../Spinner';
import Pagination from '../Pagination';
import actionManagement, { banUser } from '../../services/admin/actions/moderationsActions';
import AdminTableBody from './AdminTableBody'
function AdminTableComponent({
  search,
  fetchData,
  isLoading,
  fetchedDatas,
  totalPages,
  currentPage,
  setCurrentPage,
  TABLE_HEADERS
}) {


  const [isOpen, setIsOpen] = useState(false);
  const [userData, setUserData] = useState('');

  useEffect(() => {
    fetchData()
  }, [search, currentPage]);


  const handlePageChange = (page) => {

    setCurrentPage(page);
  };

  const handleAction = async (action, userId) => {
    try {
      await actionManagement(action, userId)
      fetchData()
    } catch (error) {
      toast.error(error.message);
    }
  };


  const handleUser = async (userId) => {
    try {
      const response = await adminAxiosInstance.get('/user-data/', { params: { userId } });
      setUserData(response.data.user);
      setIsOpen(true);
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
  };

  return (
    <div className="p-4 bg-inherit">
      <div className="overflow-x-auto">
        {isLoading ? <Spinner bgColor={'grey'} /> : (
          <table className="min-w-full bg-gray-800 text-gray-300">
            <thead>
              <tr className="bg-gray-700">
                {TABLE_HEADERS.map(header => <th className="px-4 py-2 text-left">{header}</th>)}
              </tr>
            </thead>
            <AdminTableBody
              dataCollection={fetchedDatas}
              hanldeClick={handleUser}
              handleAction={handleAction}
            />
            {isOpen && <UserModal isOpen={isOpen} onClose={handleClose} userData={userData} />}



          </table>
        )}
      </div>
      <div className="flex justify-end mt-2 text-gray-400 bg-inherit">
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}

export default AdminTableComponent;