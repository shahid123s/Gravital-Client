import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { axiosInstance } from '../utilities/axios';

const useFetchUserData = (username) => {
  const [userDetails, setUserDetails] = useState({
    profileImage: '',
    bio: '',
    gender: 'None',
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchUserData = async () => {
    setUserDetails({})
    try {
      const response = await axiosInstance.get('/user-details',{
        params: {username: username || null }
      });
      const data = response.data.user;
      setUserDetails(data);
      setLoading(false);
    } catch (err) {
      setError(err.message || 'Error fetching user data');
      toast.error(err.message || 'Error fetching user data');
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return { userDetails, setUserDetails, loading, error, refetch: fetchUserData };
};

export default useFetchUserData;