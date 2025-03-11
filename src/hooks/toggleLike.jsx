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
           const response =  await axiosInstance.patch('/like/post/toggle-like/', {postId});

        } catch (error) {
            toast.error(error.message);
            setLikedByUser(previousState);
            setLikes(likes)
        }
    }
    return {likes, likedByUser, toggleLike}
}

export default useLike