import { PageLocation } from "./GlobalTemplates/PageLocation";
import RegisterArea from "./register/RegisterForm";
import Subscribe from "./home/Subscribe";
const Register = ()=>{
    return (
        <>
            <PageLocation head={"Register"} tail={"Home / register"}/>
            <RegisterArea />
            <Subscribe />
        </>
    )

}

export default Register