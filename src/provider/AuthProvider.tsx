import {FC, PropsWithChildren, useEffect} from 'react';
import {useAuth} from "../store/UseAuth.ts";
import {useLocation, useNavigate} from "react-router-dom";

const AuthProvider:FC<PropsWithChildren> = ({children}) => {
    const { isAuth } = useAuth();
    const navigate = useNavigate()
    const location = useLocation()
    console.log(location)

    useEffect(() => {
        if (!isAuth) {
            navigate("/login",{state:{myPath:location.pathname}})
        }
    }, []);
    return children;
};

export default AuthProvider;