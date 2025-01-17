import { toast } from "sonner";
import { adminAxiosInstance } from "../../../utilities/axios"

export const banUser = async (userId) => {
  const response = await adminAxiosInstance.patch('/ban-user', {userId});
  toast.success(response.data.message);
  return response.data;
}

export const unBanUser = async (userId) => {
    const response = await adminAxiosInstance.patch('/unban-user', {userId})
    toast.success(response.data.message);
    return response.data;
}

export const blockUser = async(userId) => {
  const response = await adminAxiosInstance.patch('/block-user', {userId})
  toast.success(response.data.message);
}

export const UnblockUser = async (userId) => {
  const response = await adminAxiosInstance.patch('/unblock-user', {userId});
  toast.success(response.data.message)
}

const actionManagement =async (action, id) => {

  switch(action){
    case 'Ban':
      await banUser(id)
      break;
    case 'Unban':
      await unBanUser(id)
      break;
    case 'Block':
      await blockUser(id)
      break;
    case "Unblock": 
      await UnblockUser(id)
      break;
    
  }

}

export default actionManagement