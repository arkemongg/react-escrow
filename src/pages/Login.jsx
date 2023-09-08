import { useEffect } from "react";
import { useAuth } from "../AuthContext"
import { useNavigate } from "react-router-dom";
const Login = ()=>{
    const { isLogged, login, logout } = useAuth();
    const navigate = useNavigate()
    
    useEffect(()=>{
        if(isLogged){
            navigate('/*')
        }
    },[])

    const handleLogin = ()=>{
        localStorage.setItem('logged','yes')
        login()
        navigate('/')
    }
    return (
        <>
            <button onClick={handleLogin} className="btn btn-primary">Login</button>
        </>
    )

}

export default Login