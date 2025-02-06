import { useState, useEffect } from "react";
import { toast } from "sonner";
import { axiosInstance } from "../utilities/axios";

const useArchivedPosts = () => {
    const [archivePosts, setArchivePosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchArchivePost = async () => {
            try {
                setLoading(true);
                const response = await axiosInstance.get("/archive");
                setArchivePosts(response.data.posts || []); // Ensure it's an array
            } catch (error) {
                console.error("Error fetching archived posts:", error);
                setError(error);
                toast.error("Failed to fetch archived posts!");
            } finally {
                setLoading(false);
            }
        };

        fetchArchivePost();
    }, []); 

    return { archivePosts, loading, error };
};

export default useArchivedPosts;