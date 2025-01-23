import React, { useEffect, useState } from 'react'
import ActionButton from '../Buttons/ActionButton'
import { toast } from 'sonner';
import actionManagement from '../../services/admin/actions/moderationsActions';

function ReportModal({isOpen, setClose, datas, setDatas}) {
   if (!isOpen) return null

    const [actions, setActions] = useState([
        {title: 'Resolved', color: 'green' },
        {title: 'Reviewed', color: 'orange' },
    ]);
    const handleAction = async (title, id) => {
        try {
          // Call your action management service to update the status in the database
          await actionManagement(title, id);
    
          // Update the local state after action is completed
          setDatas((prevDatas) => {
            return prevDatas.map((data) => {
              if (data._id === id) {
                return { ...data, status: title }; // Update the status dynamically
              }
              return data;
            });
          });
    
          // Show success message
          toast.success(`${title} action successful`);
        } catch (error) {
          toast.error('Error while updating the report status');
        }
      };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
            <div className="bg-[#333333]  py-2 px-2 text-white justify-end rounded-lg shadow-lg text-center  flex flex-col gap-2">
            <div className="overflow-auto bg-inherit">
          {/* Table */}
          <table className="min-w-full table-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 border-b">Username</th>
                <th className="px-4 py-2 border-b">Status</th>
                <th className="px-4 py-2 border-b">Message</th>
                <th className="px-4 py-2 border-b">Action</th>
              </tr>
            </thead>
            <tbody>
              {datas && datas.length > 0 ? (
                datas.map((data, index) => (
                  <tr key={index}>
                    <td className="px-4 py-2 border-b">{data.username}</td>
                    <td className="px-4 py-2 border-b">{data.status}</td>
                    <td className="px-4 py-2 border-b">{data.reportMessage}</td>
                    <td className="px-4 py-2 border-b">

                    {data.status !== 'pending' ? <p> {data.status} </p>: 
                      actions.map((action) => (
                        <ActionButton
                        title={action.title} // You can pass the appropriate title or action here
                        buttonColor={action.color}
                        actionId={data._id}
                        handleAction={handleAction}
                      />
                      ))
                    }
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center px-4 py-2 border-b">No reports available</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
                <button className='text-sm ' onClick={setClose}>Cancel</button>
            </div>
        </div>
    )
}

export default ReportModal
