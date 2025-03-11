import { toast } from "sonner";
import { axiosInstance } from "../../utilities/axios";


export const sendComment = async (postId, comment) => {
    try {
        const response  = await axiosInstance.post('/comment/add-comment',{
            postId,
            comment,
        });

        toast.success('Comment sent');
        return response.data;
    } catch (error) {
        toast.error('Failed to send comment');
    }
}




export const getComments = async (postId) => {

    try {
        const response = await axiosInstance.get(`/comment/get-comments`,
            {
                params: {
                    postId,
                }
            }
        );
        return response.data.data;
    } catch (error) {
        toast.error('Failed to get comments');
    }
}