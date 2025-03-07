import { useCallback, useEffect, useState } from "react";
import { toast } from "sonner";
import debounce from "lodash.debounce";

const useInfiniteScroll = (fetchData, dependencies = [], delay = 30, params= {}) => {
    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [hasMore, setHasMore] = useState(true);

    // Core loadMore logic
    const loadMoreCore = useCallback(async () => {
        if (!hasMore || isLoading) {
            toast.success('Post Are done')
            console.log("No more data or already loading");
            return;
        }

        setIsLoading(true);

        try {
            const result = await fetchData(page, params);
            setData((prevData) => [...prevData, ...result.data]); // Append data
            setHasMore(result.hasMore);
            setPage((prev) => prev + 1); // Increment page
        } catch (error) {
            console.error("Error fetching data", error);
            toast.error(error.message);
        } finally {
            setIsLoading(false);
        }
    }, [fetchData, hasMore, isLoading, page]);

    // Debounced version of loadMore
    const loadMore = useCallback(debounce(loadMoreCore, delay), [loadMoreCore, delay]);

    useEffect(() => {
        loadMore(); // Initial load
    }, dependencies); // Dependencies determine when to re-trigger

    useEffect(() => {
        return () => {
            loadMore.cancel(); // Cancel pending debounce on unmount
        };
    }, [loadMore]);

    return { data, loadMore, isLoading, hasMore };
};

export default useInfiniteScroll;