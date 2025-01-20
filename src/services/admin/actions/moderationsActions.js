import { toast } from "sonner";
import { adminAxiosInstance } from "../../../utilities/axios"

export const banUser = async (userId) => {
  const response = await adminAxiosInstance.patch('/ban-user', { userId });
  toast.success(response.data.message);
  return response.data;
}

export const unBanUser = async (userId) => {
  const response = await adminAxiosInstance.patch('/unban-user', { userId })
  toast.success(response.data.message);
  return response.data;
}

export const blockUser = async (userId) => {
  const response = await adminAxiosInstance.patch('/block-user', { userId })
  toast.success(response.data.message);
}

export const UnblockUser = async (userId) => {
  const response = await adminAxiosInstance.patch('/unblock-user', { userId });
  toast.success(response.data.message)
}

export const restrictPost = async (postId) => {
  const response = await adminAxiosInstance.patch('/restrict-post', { postId })
  toast.success(response.data.message)
}

export const unRestrictPost = async (postId) => {
  const response = await adminAxiosInstance.patch('/unrestrict-post', { postId });
  toast.success(response.data.message)
}

export const boostPost = async (postId) => {
  const response = await adminAxiosInstance.patch('/boost-post', { postId });
  toast.success(response.data.message)
}

export const reportAction = async (reportId, action) => {

  const response = await adminAxiosInstance.patch('/report', {
    reportId, action
  })

}

const actionManagement = async (action, id) => {

  switch (action) {
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
    case 'Restrict':
      await restrictPost(id);
      break;
    case 'Unrestrict':
      await unRestrictPost(id);
      break;
    case 'Boost Post':
      await boostPost(id);
      break;
    case 'Resolved':
      await reportAction(id, 'resolved')
      break;
    case 'Reviewed':
      await reportAction(id, 'reviewed')
      break;
    default: 
      toast.error('No action is taking');
      break;
  }

}

export default actionManagement