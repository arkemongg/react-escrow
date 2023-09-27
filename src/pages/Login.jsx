
import { PageLocation } from "./GlobalTemplates/PageLocation";

import LoginArea from "./login/LoginForm";
import Subscribe from "./home/Subscribe";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../AuthContext";

const Login = ()=>{
    const { isLogged, login, logout } = useAuth();
    const navigate = useNavigate()
    useEffect(()=>{
        if(isLogged){
            navigate('/dashboard')
        }
    },[])

    return (
        <>
            <PageLocation head={"Login"} tail={"Home / Login"}/>

            <LoginArea />

            <Subscribe />
        </>
    )

}

export default Login