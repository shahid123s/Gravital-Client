import { toast } from "sonner";
import { useState, useEffect } from "react";
import { axiosInstance } from '../utilities/axios';


const useLikedPosts = () => {
    const [likedPosts, setLikedPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchLikedPosts = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get("/post/liked-posts");
                setLikedPosts(response.data.posts || []); // Ensure it's an array
            } catch (error) {
                console.error("Error fetching liked posts:", error);
                setError(error);
                toast.error("Failed to fetch liked posts!");
            } finally {
                setLoading(false);
            }
        };

        fetchLikedPosts();
    },[])

    return {likedPosts, loading, error};
    
} 

export default useLikedPosts;









// const useLikedPosts = () => {
//     const { data: likedPosts, isLoading, error } = useQuery({
//         queryKey: ['likedPosts'],
//         queryFn: async () => {
//             const response = await fetch('/api/liked-posts');
//             if (!response.ok) {
//                 throw new Error('Failed to fetch liked posts');
//             }
//             return response.json();
//         }
//     });

//     return { likedPosts, isLoading, error };
// }