import React, { useState } from 'react'
import AdminSideBar from '../../Components/Admin/AdminSideBar'
import AdminContent from '../../Components/Admin/AdminContent'
import AdminTableComponent from '../../Components/Admin/AdminTableComponent'
import { adminAxiosInstance } from '../../utilities/axios';
import TABLE_HEADERS from '../../enum/tableHeader';
import { toast } from 'sonner';

function AdminReport() {
    const [search, setSearch] = useState('');
    const [reportDetails, setReportDetials] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [filter, setFilter] = useState('Filter');
    const limit = 2;


    const fetchReportList = async () => {
        try {
            setIsLoading(true);

            const response = await adminAxiosInstance.get('/reports', {
                params: { page: currentPage, limit, search, filter: filter === 'Filter'? 'All' : filter},
            })
            console.log(response)

            if (response.data.totalPages < currentPage) {
                setCurrentPage(1);
            }
            setReportDetials(response.data.reportDetails);
            setTotalPages(response.data.totalPage);
            setIsLoading(false);

        } catch (error) {
            toast .error(error.message);

        }
    }

    

    return (
        <div>
            <AdminSideBar />
            <AdminContent name={'Report List'} search={search} setSearch={setSearch}>
        
                <AdminTableComponent
                    search={search}
                    fetchData={fetchReportList}
                    isLoading={isLoading}
                    fetchedDatas={reportDetails}
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPages={totalPages}
                    TABLE_HEADERS={TABLE_HEADERS.REPORT_HEADER}
                    setFilter = {setFilter}
                    filter={filter}
                />
            </AdminContent>
        </div>
    )
}

export default AdminReport
