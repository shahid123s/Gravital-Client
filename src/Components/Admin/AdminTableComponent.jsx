import React, { act, useEffect, useState } from 'react';
import { toast } from 'sonner';
import { adminAxiosInstance } from '../../utilities/axios';
import UserModal from '../UserModal';
import Spinner from '../Spinner';
import Pagination from '../Pagination';
import actionManagement, { banUser } from '../../services/admin/actions/moderationsActions';
import AdminTableBody from './AdminTableBody'
import { useNavigate } from 'react-router-dom';
import ReportModal from '../Modals/ReportModal';
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
  const [reportModal, setReportModal] = useState(false)


  useEffect(() => {
    fetchData()
  }, [search, currentPage]);


  const handlePageChange = (page) => {

    setCurrentPage(page);
  };

  const handleAction = async (action, dataId) => {
    try {
      console.log(dataId)
      if (action === 'View Details') {
        const reportDetails = await adminAxiosInstance.get('/reports', {
          params: {
            reportId: dataId
          }
        })
        setReportModal(true)
        return
      }

      await actionManagement(action, dataId)
      fetchData()
    } catch (error) {
      toast.error(error.message);
    }
  };


  const hanldeModalClick = async (dataId, title) => {

    try {
      if(title === 'user'){
        const response = await adminAxiosInstance.get('/user-data/', { params: { userId: dataId } });
        setUserData(response.data.user);
        setIsOpen(true);
      } else if(title === 'post'){
        toast.success('post')
      }
      
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setReportModal(false)
  };

  return (
    <div className="p-4 bg-inherit">
      <div className="overflow-x-auto">
        {isLoading ? <Spinner bgColor={'grey'} /> : (
          <table className="min-w-full bg-gray-800 text-gray-300">
            <thead>
              <tr className="bg-gray-700">
                {TABLE_HEADERS.map((header, index) => <th key={index} className="px-4 py-2 text-left ">{header}</th>)}
              </tr>
            </thead>
            <AdminTableBody
              dataCollection={fetchedDatas}
              hanldeClick={hanldeModalClick}
              handleAction={handleAction}
            />

          </table>
        )}

        {isOpen && <UserModal isOpen={isOpen} onClose={handleClose} userData={userData} />}
        {reportModal &&
          <ReportModal
            setClose={handleClose}
          />}
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