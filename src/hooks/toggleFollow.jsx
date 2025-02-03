import { useEffect, useState } from 'react';
import { axiosInstance } from '../utilities/axios';
import { toast } from 'sonner';


const useFollow = (initialFollowState = false) => {
  
  const [isFollowed, setIsFollowed] = useState( initialFollowState);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  useEffect(() =>{
    setIsFollowed(initialFollowState)
  },[initialFollowState])
  
  const toggleFollow = async (userId) => {
    try {
      setLoading(true);
      const response = await axiosInstance.post('/follow/toggle-follow', { userId });
      if (response.status === 200) {
        setIsFollowed((prevState) => !prevState);
        toast.success(isFollowed? 'Unfollowed': 'Followed')
      }
    } catch (err) {
      console.error('Error toggling follow:', err);
      setError(err.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return {
    isFollowed,
    toggleFollow,
    loading,
    error,
  };
};

export default useFollow;