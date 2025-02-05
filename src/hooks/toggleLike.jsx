import { useState } from "react"
import { toast } from "sonner";
import { axiosInstance } from "../utilities/axios";


const useLike = (initialLikes, initialLikedByUser, postId) => {
    const [likes, setLikes] = useState(initialLikes);
    const [likedByUser, setLikedByUser] = useState(initialLikedByUser);

    const toggleLike = async () => {
        const previousState =  likedByUser;
        const  newLikes = likedByUser ? likes - 1 : likes + 1 ;

        setLikedByUser(!likedByUser);
        setLikes(newLikes);

        try {
           const response =  await axiosInstance.post('/like/post/toggle-like/', {postId});
           console.log(response)
        } catch (error) {
            toast.error(error.message);
            setLikedByUser(previousState);
            setLikes(likes)
        }
    }
    return {likes, likedByUser, toggleLike}
}

export default useLike