
import { PageLocation } from "./GlobalTemplates/PageLocation";

import LoginArea from "./login/LoginForm";
import Subscribe from "./home/Subscribe";
const Login = ()=>{
    return (
        <>
            <PageLocation head={"Login"} tail={"Home / Login"}/>

            <LoginArea />

            <Subscribe />
        </>
    )

}

export default Login