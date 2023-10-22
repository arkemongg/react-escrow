import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import Subscribe from "./home/Subscribe"
import Conversation from "./messages/Converstion"
import { useEffect } from "react";

const Messages= ()=>{
    const { isLogged } = useAuth();
    const navigate = useNavigate()
    useEffect(()=>{
        if(!isLogged){
            navigate('/login')
        }
    },[])
    return (
        <>
            <Conversation />
            <Subscribe />
        </>
    )
}

export default Messages