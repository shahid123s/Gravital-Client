import { toast } from "sonner";
import { adminAxiosInstance, axiosInstance } from "../../../utilities/axios"

export const postDetails = async (postId) => {
    try {
        const response = await adminAxiosInstance.get('/post-details', {
            params: {
                postId,
            }
            
        });
        return response.data.postData
    } catch (error) {
        
    }
}   

