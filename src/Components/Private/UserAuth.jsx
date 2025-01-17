import { useEffect } from "react"
import { useSelector } from "react-redux"
import { Navigate } from "react-router-dom"


export const UserAuth = ({children}) => {
    const {isAuthenticate} = useSelector(state => state.userAuth)
    useEffect(() => {
        console.log(isAuthenticate)
    },[])
    if(!isAuthenticate){
        return (<Navigate to={'/'} />)
    }
    else {
        return (<>{children}</>)
    }
}

export const UserRequireAuth = ({children}) => {
    const {isAuthenticate} = useSelector(state => state.userAuth);
    if(isAuthenticate){
        return (<Navigate to={'/home'} />);
    }
    else {
        return(<>
        {children}
        </>)
    };
}