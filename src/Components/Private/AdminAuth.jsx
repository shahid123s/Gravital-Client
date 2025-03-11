import { useEffect } from "react";
import { useSelector } from "react-redux";
import { Navigate, useNavigate } from "react-router-dom";


export const AdminAuth = ({children}) => {
    const {isAdmin} =useSelector(state => state.adminAuth);
    
    if(!isAdmin){
        return (<Navigate to={'/admin/login'} />)
    }
    else {
        return(
            <>
            {children}
            </>
        )
    };
};

export const AdminRequireAuth = ({children}) => {
    const {isAdmin} = useSelector (state => state.adminAuth);
    const navigate = useNavigate();

    if(isAdmin){
        return (<Navigate to={'/admin/home'} />);
    }
    else {
        return(<>
        {children}
        </>)
    };

};

