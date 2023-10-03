import { memo, useEffect, useState } from 'react';
import styles from './styles/Settings.module.css'
import { getJWT } from '../AxiosHeaders';
import { useAuth } from '../../AuthContext';
const Settings = (props) => {
    //Logout 
    const {logout} = useAuth()
    // Customer url
    const [url,setUrl] = useState('/api/customer/')
    const [fetched,setFetched] = useState('/api/customer/')
    
    // Personal Details
    const [userName,setUserName] = useState("")
    const [email,setEmail] = useState("")
    const [firstName,setFirstName] = useState("")
    const [lastName,setLastName] = useState("")

    //Shipping Details
    const [shippingEmail,setShippingEmail] = useState("")
    const [shippingDetails,setShippingDetails] = useState("")
    


    // Effect to get customer data
    useEffect(()=>{
        const timer = setTimeout(() => {
            const data = getJWT(url)
            data.then(data=>{
                if(data.status===200){
                    const customer = data.data[0]

                    //set Personal Details
                    setUserName(customer.username)
                    setEmail(customer.email)
                    setFirstName(customer.first_name)
                    setLastName(customer.lastName)
                    
                    //set sHIPPING Details

                    setShippingEmail(customer.shipping.email)
                    setShippingDetails(customer.shipping.details)
                }
            }).catch(err=>{
                if(err.response){
                    if(err.response.status === 401){
                        logout()
                    }
                }
            })
        }, 2000);
        return (() => clearTimeout(timer))
    },[url])
    
    const [img,setImg] = useState('./dashboardassets/subscrisbebg.jpg')
    
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
    
        if (file) {
          const reader = new FileReader();
    
          reader.onload = (e) => {
            setImg(e.target.result);
          };
    
          reader.readAsDataURL(file);
        }
      };
    const handleImageSave = ()=>{

    }
    
    return (
        <>
            <section className={`${styles.SettingsSection} `}>
                <div className={styles.SettingsArea}>
                    <div className={styles.profileImageArea}>
                        
                        <div className={styles.profileWrapper}>
                            <div className={styles.profileImage}>
                                <img src={img} alt="profile" />
                            </div>
                            <div className="btnArea">
                                <p className='text-error text-center'>Lorem ipsum dolor sit amet.</p>
                                <p className='text-success text-center'>Lorem ipsum dolor sit amet.</p>
                                <label className="btn btn-primary">
                                        Upload Image
                                        <input onChange={handleImageUpload} type="file" className="hidden" />
                                </label>
                                <div onClick={handleImageSave} className="btn btn-success ml-5">Save Image</div>
                            </div>
                        </div>
                    </div>
                </div>

                <PersonalInformantion username = {userName} email = {email} firstName = {firstName} lastName = {lastName} setFirstName = {setFirstName} setLastName = {setLastName} />
                <ShippingDetails shippingEmail = {shippingEmail} shippingDetails = {shippingDetails} />
                <SocialDetails />
                <div className="div flex justify-center pt-5">
                    <button className='btn btn-primary w-[330px] '>Save Profile</button>
                </div>
                <ChangePassword />

            </section>
        </>
    )
  };
  
  export default memo(Settings);



  const PersonalInformantion = (props)=>{
    return (
            <div className={styles.ProfileInformationArea}>
                <div className="text-4xl text-center p-5">Personal Details</div>
                <hr />

                <div className={styles.FormArea}>
                    <div className='flex grow flex-wrap'>
                        <div className="inptGroup flex flex-col p-5">
                            <label className='text-2xl pb-2' htmlFor="username">Username</label>
                            <input defaultValue={props.username} type="text" id='username' placeholder="username" className="input input-bordered rounded-none " disabled />   
                        </div>
                        <div className="inptGroup flex flex-col p-5">
                            <label className='text-2xl pb-2' htmlFor="email">Email</label>
                            <input defaultValue={props.email} type="text" id='email' placeholder="email@email.com" className="input input-bordered rounded-none" disabled />   
                        </div>
                    </div>

                    <div className='flex grow flex-wrap'>

                        <div className="inptGroup flex flex-col p-5">
                            <label className='text-2xl pb-2' htmlFor="firstname">First Name</label>
                            <input onChange={e=>props.setFirstName(e.target.value)} value={props.firstName} type="text" id='firstname' placeholder="First Name" className="input input-bordered rounded-none " />   
                        </div>
                        <div className="inptGroup flex flex-col p-5">
                            <label className='text-2xl pb-2' htmlFor="lastname">Last Name</label>
                            <input onChange={e=>props.setLastName(e.target.value)} value={props.LastName} type="text" id='lastname' placeholder="Last Name" className="input input-bordered  rounded-none" />   
                        </div>

                    </div>
                    
                </div>
            </div>
        )
  }

const ShippingDetails = (props)=>{
    return (
        <div className={styles.ShippingDetailsArea}>
            <h1 className='text-4xl p-5 text-center'>Shipping Details</h1>
            <hr />

            <div className={styles.ShippingDetails}>
                <div className='shippingEmail p-5'>
                    <label  className='text-2xl block pb-2' htmlFor="shippingEmail">
                        Shipping Email
                    </label>
                    <input defaultValue={props.shippingEmail} type="text" id='shippingemail' placeholder="Shipping Email" className="input input-bordered w-full rounded-none " /> 
                </div>
                 <div className="inptGroup flex flex-col p-5">
                        <label className='text-2xl pb-2' htmlFor="firstname ">Shipping Details</label>
                        <textarea defaultValue={props.shippingDetails} placeholder="Shipping Details" className="textarea textarea-bordered textarea-lg rounded-none w-full h-[250px]" ></textarea>  
                 </div>
            </div>
        </div>
    )
}


const SocialDetails = ()=>{
    return (
        <div className={styles.SocialDetailsArea}>
            <h1 className='text-4xl p-5 text-center'>Social Details</h1>
            <hr />

            <div className={styles.SocialDetails}>
                <div className="social flex p-5">
                    <div className="socialImgArea w-[80px]">
                        <img className='w-[50px]' src="./dashboardassets/facebook.png" alt="ok" />
                    </div>
                    <input  placeholder='Facebook Username' className='input rounded-none' type="text"/>
                </div>
                <div className="social flex p-5">
                    <div className="socialImgArea w-[80px]">
                        <img className='w-[50px]' src="./dashboardassets/twitter.png" alt="ok" />
                    </div>
                    <input placeholder={`X Username`} className='input rounded-none' type="text"/>
                </div>
                <div className="social flex p-5">
                    <div className="socialImgArea w-[80px]">
                        <img className='w-[50px]' src="./dashboardassets/telegram.png" alt="ok" />
                    </div>
                    <input  placeholder='Telegram Username' className='input rounded-none' type="text"/>
                </div>
            </div>
        </div>
    )
}

const ChangePassword = ()=>{
    return (
        <div className={styles.ChangePassoword}>
            <h1 className='text-4xl p-5 text-center'>Security Details</h1>
            <hr />
            <div className={styles.PasswordForm}>
                <div className="inptGroup flex flex-col pt-5">
                    <label className='text-2xl pb-2' htmlFor="firstname">Password</label>
                    <input type="password" id='password' placeholder="Password" className="input input-bordered w-full max-w-xl" />   
                </div>

                <div className="inptGroup flex flex-col pt-5">
                    <label className='text-2xl pb-2' htmlFor="firstname">Current Password</label>
                    <input type="password" id='currentpassword' placeholder="Current Password" className="input input-bordered w-full max-w-xl" />   
                </div>

                <div className="inptGroup flex flex-col pt-5">
                    <label className='text-2xl pb-2' htmlFor="firstname">Confrim Password</label>
                    <input type="password" id='confirmpassword' placeholder="Confrim Password" className="input input-bordered w-full max-w-xl" />   
                </div>


            </div>
            <div className="div flex justify-center pt-5 pb-5">
                    <button className='btn btn-primary w-[330px] '>Update Password</button>
            </div>
        </div>
    )
}