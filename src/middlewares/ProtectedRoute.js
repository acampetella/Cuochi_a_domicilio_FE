import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";

const ProtectedRoutes = () => {

    const useAuth = () => {
        const session = localStorage.getItem("session");
        if (session) {
            return true
        }
        return false
    }

    const isAuthorized = useAuth();
    const navigate = useNavigate();

    useEffect(()=>{
        if (!isAuthorized){
            navigate("/", {replace:true});
        }
    },[navigate])
    return <Outlet />
}

export default ProtectedRoutes;