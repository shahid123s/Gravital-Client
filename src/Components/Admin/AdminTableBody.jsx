import React, { useState } from 'react'
import { calculateStatus } from '../../utilities/calculateStatus';
import ActionButton from '../Buttons/ActionButton';
import actionManagement from '../../services/admin/actions/moderationsActions';


function AdminTableBody({ dataCollection, hanldeClick , handleAction}) {
  const [dropdownOpen, setDropdownOpen] = useState(null);


  const toggleDropdown = (id) => {
    setDropdownOpen(dropdownOpen === id ? null : id);
  };

  // const handleAction = async (action, dataId) => {
  //   try {
  //     await actionManagement(action, dataId)
  //   } catch (error) {

  //   }
  // }


  return (
    <tbody>
      {dataCollection.length > 0 ? dataCollection.map((data, index) => (
        <tr key={data._id} className="border-b border-gray-700">
          <td className="px-4 py-2">{index + 1}</td>
          <td className="px-4 py-2">
            <img src={data.profileImage || data.fileName} className="w-14 rounded-xl" alt="data profile" />
          </td>
          <td className="px-4 py-2" onClick={() => hanldeClick(data._id)}>{data.fullName || data.userID?.username}</td>
          <td className="px-4 py-2" onClick={() => ''}>{data.email || data.uploadDate}</td>
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
                  />

                ))}

              </div>
            )}



          </td>
        </tr>
      )) : ''}
    </tbody>
  )
}

export default AdminTableBody
