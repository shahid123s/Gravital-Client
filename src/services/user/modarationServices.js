import { toast } from "sonner";
import { axiosInstance } from "../../utilities/axios"

export const toggleRestriction = async(userId) => {
    const response = await axiosInstance.post('/toggle-restriction', {
        restrictedUser: userId
    });
    return response
}

export const reportUser = async (userId, message) => {
    const response = await axiosInstance.post('/report-user', {
        userId, 
        message,
    })
    return response
}

export const toggleBlock = async(userId) => {
    const response = await axiosInstance.post('/toggle-block', {
        userId,
    })
    return response 
}

// export const getUserProfileUrl = async(username) => {
//     const response = await axiosInstance.get('/get-profile-url',{
//         params: {
//             username
//         }
//     })
//     return response.data.link
//  }


export const archivePost = async (postId) => {
    const response = await axiosInstance.post('/post/archive', { postId });
    return response.data;
}

export const publishPost = async (postId) => {
    const response = await axiosInstance.post('/post/publish', { postId });
    return response.data
}

export const deletePost = async (postId) => {
    const response = await axiosInstance.post('/post/delete', { postId });
    return response.data;
}
 
export const reportPost = async (postId, userId, message) => {
    const response = await axiosInstance.post('/report-post',{
        postId,
        userId,
        message,
    })
    console.log('vanna')

}