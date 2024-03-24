import {FC, PropsWithChildren, useEffect} from 'react';
import {useAuth} from "../store/UseAuth.ts";
import { useNavigate } from "react-router-dom";

const AuthProvider:FC<PropsWithChildren> = ({children}) => {
    const { isAuth } = useAuth();
    const navigate = useNavigate()

    useEffect(() => {
        if (!isAuth) {
            navigate("/login")
        }
    }, []);
    return children;
};

export default AuthProvider;