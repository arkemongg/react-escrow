import styles from './styles/ResetPassword.module.css'
import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingArea from '../GlobalTemplates/LoadingArea';
import { post, validatePassword } from '../AxiosHeaders';
import { FlaotingErrorCustom } from '../GlobalTemplates/FloatingErrorCustom';

const ResetPasswordForm = () => {
    const location = useLocation();
    const url = new URLSearchParams(location.search);

    const uid = url.get('uid');
    const token = url.get('token');
    const [hidden, setHidden] = useState(true)
    const [confirm, setConfirm] = useState(false)

    const [err, setErr] = useState(false)
    const [message, setMessage] = useState("")
    const [success, setSuccess] = useState(false)
    const [email, setEmail] = useState("")


    useEffect(() => {
        if (uid !== null && token !== null) {
            setConfirm(true)
        }
    }, [])
    const handleSignUp = (event) => {
        const postData = {
            email: email
        }
        const url = `/auth/users/reset_password/`
        event.preventDefault()
        setHidden(false)
        const data = post(url, postData)
        data.then(data => {
            if (data.status === 204) {
                setSuccess(true)
            } else {
                alert("Unexpexcted error.")
            }
        }).catch(err => {
            if (err.response) {
                if (err.response.status === 400) {
                    setMessage("User with given email does not exist.")
                    setErr(true)
                    setHidden(true)
                } else if (err.response.status === 429) {
                    setMessage("Too many requests.")
                    setErr(true)
                    setHidden(true)
                } else {
                    alert("Unexpexcted error.")
                }
            } else {
                alert("Unexpected error.");
            }
        })
    }

    return (
        <>
            {err ? <FlaotingErrorCustom err={err} setErr={setErr} message={message} /> : ""}
            <section className={`${styles.ResetPasswordFormSection}`}>
                <div className={`${styles.ResetPasswordFormArea} ${success ? "hidden" : ""} ${confirm ? "hidden" : ""}`}>
                    <LoadingArea hidden={hidden} />
                    <div className={`${styles.FormArea} ${hidden ? '' : 'hidden'}`}>
                        <div className="titleArea text-xl text-center font-bold p-8">
                            Please submit your email to reset the passowrd!
                        </div>

                        <hr />
                        <div className="flex flex-col items-center mx-auto md:h-screen lg:py-0">
                            <div className="w-full bg-white rounded-lg  md:mt-0 sm:max-w-md xl:p-0">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                        Reset Password
                                    </h1>
                                    <form className="space-y-4 md:space-y-6" action="#">
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                            <input onChange={e => setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Email@domain.com" required />
                                        </div>
                                        <button onClick={handleSignUp} className="w-full text-white btn-primary  font-medium  px-5 py-2.5 text-center">Reset Password</button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Confirm confirm={confirm} />
                <Success success={success} />
            </section>
        </>
    )
};

export default ResetPasswordForm;

const Success = (props) => {
    return (
        <>
            <div className={`card  max-w-[550px] m-auto top-[120px] bg-[#B3E140] shadow-xl ${props.success ? "" : "hidden"}`}>

                <div className="card-body h-[200px]">
                    <h2 className="card-title">Password reset request success!</h2>
                    <p>Please check your email to reset your password.</p>
                </div>
            </div>
        </>
    )
}

const Confirm = (props) => {
    const location = useLocation();
    const url = new URLSearchParams(location.search);

    const uid = url.get('uid');
    const token = url.get('token');

    const [hidden, setHidden] = useState(true)
    const [success, setSuccess] = useState(false)

    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")

    const [err, setErr] = useState(false)
    const [message, setMessage] = useState("")

    const handleConfrim = (event) => {
        event.preventDefault()
        if(password.trim()===""||confirmPassword.trim()==="")
            {
                setErr(true)
                setMessage("Please recheck the password fields.")
                return 0
            }
        if(validatePassword(password)===false||password!=confirmPassword)
            {
                setErr(true)
                setMessage("Please recheck the password fields.")
                return 0
            }
        setHidden(false)
        setTimeout(() => {
            const url = '/auth/users/reset_password_confirm/'
            const postData = {
                uid:uid,
                token:token,
                new_password:password
            }
            
            const data = post(url,postData)
            data.then(data=>{
                if(data.status===204){
                    setSuccess(true)
                }
            }).catch(err=>{
                if(err.response){
                    if(err.response.status === 400){
                        setErr(true)
                        setMessage("Invalid or expired : Please send the reset request again.")
                    }else if(err.response.status === 429){
                        setErr(true)
                        setMessage("Too many requests.")
                        setHidden(true)
                    }else{
                        setErr(true)
                        setMessage("Unexpected error.")
                        setHidden(true)
                    }
                }else{
                    setErr(true)
                    setMessage("Unexpected error.")
                    setHidden(true)
                }
            })
        }, 2000);
    }
    return (
        <>
            {err ? <FlaotingErrorCustom err={err} setErr={setErr} message={message} /> : ""}

            <div className={`${styles.ResetPasswordConfrimArea} ${success ? "hidden" : ""} ${props.success ? "hidden" : ""} ${props.confirm ? "" : "hidden"}`}>
                <LoadingArea hidden={hidden} />
                <div className={`${styles.FormArea} ${hidden ? '' : 'hidden'}`}>
                    <div className="titleArea text-xl text-center font-bold p-8">
                        Please confirm your new passowrd!
                    </div>

                    <hr />

                    <div className="flex flex-col items-center mx-auto md:h-screen lg:py-0">
                        <div className="w-full bg-white rounded-lg  md:mt-0 sm:max-w-md xl:p-0">
                            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                    Reset Password
                                </h1>
                                <form className="space-y-4 md:space-y-6" action="#">
                                    <div>
                                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                        <input onChange={e => setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                                        <p className={`text-error text-sm ${password === "" ? "hidden" : validatePassword(password) ? "hidden" : ""}`}>Password length is between 8 and 20 characters & requires an uppercase, a lowercase, and a number.</p>
                                    </div>
                                    <div>
                                        <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                                        <input onChange={e => setConfirmPassword(e.target.value)} type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                                        <p className={`text-error text-sm ${confirmPassword === "" ? "hidden" : password === confirmPassword ? "hidden" : ""}`}>Password doesn't match.</p>
                                    </div>
                                    <button onClick={handleConfrim} className="w-full text-white btn-primary  font-medium  px-5 py-2.5 text-center">Reset Password</button>

                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <SuccessConfirm success = {success}/>
        </>
    )
}

const SuccessConfirm = (props) => {
    return (
        <>
            <div className={`card  max-w-[550px] m-auto top-[120px] bg-[#B3E140] shadow-xl ${props.success ? "" : "hidden"}`}>
                <div className="card-body h-[200px]">
                    <h2 className="card-title">Your password reset has been completed Successfully!</h2>
                </div>
            </div>
        </>
    )
}