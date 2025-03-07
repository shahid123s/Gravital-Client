import React, { useState } from 'react'
import { calculateStatus } from '../../utilities/calculateStatus';
import ActionButton from '../Buttons/ActionButton';
import actionManagement from '../../services/admin/actions/moderationsActions';


function AdminTableBody({ dataCollection, hanldeClick, handleAction }) {
  const [dropdownOpen, setDropdownOpen] = useState(null);


  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  return (
    <tbody>
      {dataCollection.length > 0 ? dataCollection.map((data, index) => (
        <tr key={(data._id)} className="border-b border-gray-700 ">
          <td className="px-4 py-2">{index + 1}</td>
          <td className="px-10 py-2 " >
            <img src={data.profileImage || data.fileName || data.details.fileName || data.details.profileImage} className="w-14 rounded-xl " alt="data profile" />
          </td>
          <td className="px-4 py-2 cursor-pointer" onClick={() => hanldeClick(data._id, data.username ? 'user' : data.type? data.type : 'post')}>{data.fullName || data.userId?.username || (data.type === 'user' ? <p>user <span className= 'text-gray-400'>{`( ${data.details?.username} ) `}</span></p>: 'post' )} </td>
          <td className="px-4 py-2" onClick={() => ''}>{data.email || data.uploadDate || data.reportCount}</td>
          <td className="px-4 py-2">{data?.status || calculateStatus(data).status}</td>
          <td className="px-4 py-2">
            <button
              onClick={() => toggleDropdown(data._id)}
              className="hover:bg-[#4A90E2] text-white px-2 py-1 rounded"
            >
              View ▼
            </button>

            {dropdownOpen === data._id && (
              <div className="absolute right-0 mt-2 w-32 bg-gray-700 rounded  shadow-lg">
                {data.actions.map((action) => (
                  <ActionButton
                    title={action.title}
                    buttonColor={action.color}
                    actionId={data._id}
                    handleAction={handleAction}
                    key={`${action.title}-${data._id}`}
                  />

                ))}

              </div>
            )}



          </td>
        </tr>
      )) : <tr>
        <td colSpan="6" className="text-center py-4">No data available</td>
      </tr>}
    </tbody>
  )
}

export default AdminTableBody
