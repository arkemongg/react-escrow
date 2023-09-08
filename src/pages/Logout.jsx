import { useAuth } from "../AuthContext"

const Logout = ()=>{
    const { isLogged, login, logout } = useAuth();
    const handle = ()=>{
        logout()
    }
    return (
        <>
            <button onClick={handle} className="btn btn-primary">Login</button>
        </>
    )

}

export default Logout