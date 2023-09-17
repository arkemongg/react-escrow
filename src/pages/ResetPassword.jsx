
import { PageLocation } from "./GlobalTemplates/PageLocation";
import Subscribe from "./home/Subscribe";
import ResetPasswordForm from "./resetpassword/ResetPasswordForm";


const ResetPassword = ()=>{
    return (
        <>
            <PageLocation head={"Reset"} tail={"Home / Reset"}/>
            <ResetPasswordForm />
            <Subscribe />
        </>
    )

}

export default ResetPassword