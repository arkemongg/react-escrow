import styles from './styles/ResetPassword.module.css'
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingArea  from '../GlobalTemplates/LoadingArea';

const ResetPasswordForm = () => {
    const [hidden , setHidden]= useState(true)

    const handleSignUp = (event)=>{
        event.preventDefault()
        setHidden(false)
        
    }

    return (
        <>
            <section className={`${styles.ResetPasswordFormSection}`}>
                <div className={`${styles.ResetPasswordFormArea}`}>
                <LoadingArea hidden={hidden} />
                <div className={`${styles.FormArea} ${hidden?'':'hidden'}`}>
                        <div className="titleArea text-xl text-center font-bold p-8">
                            Pease submit your email to reset the passowrd!
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
                                            <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Email@domain.com" required />
                                        </div>
                                        <button onClick={handleSignUp} className="w-full text-white btn-primary  font-medium  px-5 py-2.5 text-center">Reset Password</button>

                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
};

export default ResetPasswordForm;