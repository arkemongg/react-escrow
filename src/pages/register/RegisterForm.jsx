import styles from './styles/RegisterForm.module.css'
import { Link } from 'react-router-dom';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import LoadingArea  from '../GlobalTemplates/LoadingArea';
import { FloatingError } from '../home/templates/Error';
import { FlaotingErrorCustom } from '../GlobalTemplates/FloatingErrorCustom';
import { post } from '../AxiosHeaders';

const RegisterArea = () => {
    const [hidden , setHidden]= useState(true)
    const [err,setErr] = useState(false)
    const [success,setSuccess] = useState(false)
    const [message,setMessage] = useState("")

    const [username,setUsername] = useState("")
    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")
    const [confirmPassword,setConfirmPassword] = useState("")
    const url = "/auth/users/"
    const handleSignUp = (event)=>{
        event.preventDefault()
        if(username.trim()===""||email.trim()===""
            ||password.trim()===""||confirmPassword.trim()==="")
        {
            setErr(true)
            setMessage("Please recheck the registration fields.")
            return 0
        }
        if(validateUsername(username)===false||validateEmail(email)===false
            ||validatePassword(password)===false||password!=confirmPassword)
        {
            setErr(true)
            setMessage("Please recheck the registration fields.")
            return 0
        }

        const postData = {
            email: email,
            username: username,
            password: password,
            re_password: confirmPassword
        }



        
        setHidden(false)

        setTimeout(() => {
            const data = post(url,postData)

            data.then(data=>{
                if(data.status===201){
                    setSuccess(true)
                }else{
                    alert("Unexpected error.")
                }
            }).catch(err=>{
                if(err.response){
                    if (err.response.status === 429) {
                        alert("Too many requests.");
                    }else if(err.response.status === 400){
                        setMessage("A user with that username or email already exists.")
                        setErr(true)
                    }else {
                        alert("Unexpected error with status code: ", err.response.status);
                    }
                    
                }else{
                    alert("Unexpected error.");
                }
            })
            setHidden(true)
        }, 2000);
        
    }

    return (
        <>
            {err?<FlaotingErrorCustom err={err} setErr = {setErr}  message = {message} />:""}
            <section className={`${styles.RegisterFormSection}`}>
            
                <div className={`${styles.RegisterFormArea} ${success?"hidden":""}`}>
                <LoadingArea hidden={hidden} />
                <div className={`${styles.FormArea} ${hidden?'':'hidden'}`}>
                        <div className="titleArea text-xl text-center font-bold p-8">
                            Thank You For Joining Us!
                        </div>

                        <hr />
                        <div className="flex flex-col items-center mx-auto md:h-screen lg:py-0">
                            <div className="w-full bg-white rounded-lg  md:mt-0 sm:max-w-md xl:p-0">
                                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                                        Sign up to your account
                                    </h1>
                                    <form className="space-y-4 md:space-y-6" action="#">
                                        <div>
                                            <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900">Username</label>
                                            <input onChange={e=>setUsername(e.target.value)} type="text" name="username" id="username" className={`bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 `} placeholder="Username" required />
                                            <p className={`text-error text-sm ${username === ""?"hidden":validateUsername(username) ? "hidden":""}`}>Letters and numbers only and a length between 4 and 20 characters</p>
                                        </div>
                                        <div>
                                            <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                                            <input onChange={e=>setEmail(e.target.value)} type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Email@domain.com" required />
                                            <p className={`text-error text-sm ${email === ""?"hidden":validateEmail(email) ? "hidden":""}`}>Please enter a valid email.</p>
                                        </div>
                                        <div>
                                            <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900">Password</label>
                                            <input onChange={e=>setPassword(e.target.value)} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                                            <p className={`text-error text-sm ${password === ""?"hidden":validatePassword(password) ? "hidden":""}`}>Password length is between 8 and 20 characters & requires an uppercase, a lowercase, and a number.</p>
                                        </div>
                                        <div>
                                            <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900">Confirm Password</label>
                                            <input onChange={e=>setConfirmPassword(e.target.value)} type="password" name="confirm-password" id="confirm-password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" required />
                                            <p className={`text-error text-sm ${confirmPassword === ""?"hidden":password===confirmPassword ? "hidden":""}`}>Password doesn't match.</p>
                                        </div>
                                    
                                        <button onClick={handleSignUp} className="w-full text-white btn-primary  font-medium  px-5 py-2.5 text-center">Sign up</button>
                                        <p className="text-sm text-black">
                                            Have an account? <Link to="/Login" className="font-bold text-primary hover:underline">Login</Link>
                                        </p>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <Success success={success} />
            </section>
            
        </>
    )
};

export default RegisterArea;


const Success = (props)=>{
    return (
        <>
            <div className={`card  max-w-[550px] m-auto bg-[#B3E140] shadow-xl ${props.success ? "":"hidden"}`}>
                
                <div className="card-body">
                    <h2 className="card-title">Successfully Registered!</h2>
                    <p>Please login to your account.</p>
                    <div className="card-actions justify-end">
                    <Link to='/login' className="btn btn-primary">Login</Link>
                    </div>
                </div>
            </div>
        </>
    )
}

function validatePassword(password) {
    // Regular expressions to check for uppercase, lowercase, and number
    const uppercaseRegex = /[A-Z]/;
    const lowercaseRegex = /[a-z]/;
    const numberRegex = /[0-9]/;
  
    // Check if the password meets all the requirements
    const hasUppercase = uppercaseRegex.test(password);
    const hasLowercase = lowercaseRegex.test(password);
    const hasNumber = numberRegex.test(password);
    
    // Check if the password length is between 8 and 20 characters
    const isValidLength = password.length >= 8 && password.length <= 20;
  
    // Return true if all conditions are met
    return hasUppercase && hasLowercase && hasNumber && isValidLength;
  }

function validateUsername(username) {
    // Regular expression to check for letters and numbers only and a length between 4 and 20 characters
    const usernameRegex = /^[a-zA-Z0-9]{4,20}$/;
    // Check if the username meets the requirement
    return usernameRegex.test(username);
  }

function validateEmail(email) {
    
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  
    
    return emailRegex.test(email);
  }