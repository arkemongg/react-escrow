import { memo, useEffect, useState } from 'react';
import styles from './styles/Settings.module.css'
import { AxiosInstanceImageJWT, AxiosInstanceJWT, getJWT, postJWT } from '../AxiosHeaders';
import { useAuth } from '../../AuthContext';
import { FlaotingErrorCustom } from '../GlobalTemplates/FloatingErrorCustom';
import { apiUrl } from '../Urls';
import LoadingArea from '../GlobalTemplates/LoadingArea';
const Settings = (props) => {
    //Logout 
    const { logout } = useAuth()

    // Image data post axios
    const axiosInstanceImageJWT = AxiosInstanceImageJWT()

    // Customer url
    const [url, setUrl] = useState('/api/customer/')
    const [fetched, setFetched] = useState('/api/customer/')

    // Personal Details
    const [id, setId] = useState("")
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [superSeller,setSuperSeller] = useState(false)
    const [verifiedUser,setVerifiedUser] = useState(false)

    //Shipping Details
    const [shippingEmail, setShippingEmail] = useState("")
    const [shippingDetails, setShippingDetails] = useState("")

    //Social Details

    const [facebook,setFacebook] = useState("")
    const [twitter,setTwitter] = useState("")
    const [telegram,setTelegram] = useState("")

    // Avatar id 
    const [avatarId, setAvatarId] = useState("")

    //Image fields
    const [img, setImg] = useState('./dashboardassets/subscrisbebg.jpg')
    const [image, setImage] = useState(null)

    // Effect to get customer data
    useEffect(() => {
        setFetched(false)
        const timer = setTimeout(() => {
            const data = getJWT(url)
            data.then(data => {
                if (data.status === 200) {
                    const customer = data.data[0]

                    //set Personal Details
                    setId(customer.id)
                    setUserName(customer.username)
                    setEmail(customer.email)
                    setFirstName(customer.first_name)
                    setLastName(customer.last_name)
                    setSuperSeller(customer.super_seller)
                    setVerifiedUser(customer.verified_user)
                    //set sHIPPING Details

                    setShippingEmail(customer.shipping.email)
                    setShippingDetails(customer.shipping.details)

                    //setSocial
                    setFacebook(customer.facebook)
                    setTwitter(customer.twitter)
                    setTelegram(customer.telegram)

                    // SET AVATAR IMAGE and id
                    setAvatarId(customer.avatar.id)
                    if (customer.avatar.profile !== null) {
                        setImg(`${apiUrl}${customer.avatar.profile}`)
                    }
                    // SET FETCHED TRUE
                    setFetched(true)
                }
            }).catch(err => {
                if (err.response) {
                    if (err.response.status === 401) {
                        logout()
                    }
                }
            })
        }, 2000);
        return (() => clearTimeout(timer))
    }, [url])



    //Upload image handler
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        setImage(file)
        if (file) {
            const reader = new FileReader();

            reader.onload = (e) => {
                setImg(e.target.result);
            };

            reader.readAsDataURL(file);
        }
    };

    //   Image save and error handler
    const [saveImgClicked, setSaveImgClicked] = useState(false)
    const [success, setSuccess] = useState(false)
    const [imgErr, setImgErr] = useState(false)
    const [imgMessage, setImgMessage] = useState("")
    const handleImageSave = () => {

        if (image === null || image.size / 1024 > 2048) {
            setImgErr(true)
            setImgMessage("No image uploaded or image size is greater than 2MB.")
            return;
        }
        const formData = new FormData();
        formData.append('profile', image);
        setSaveImgClicked(true)

        setTimeout(() => {
            // Edit product request
            const patchImageData = async () => {
                try {
                    const response = await axiosInstanceImageJWT.patch(`/api/customer/${id}/avatar/${avatarId}/`, formData)
                    return response
                } catch (error) {
                    throw error
                }
            }
            const imageData = patchImageData()
            imageData.then(data => {
                if (data.status === 200 || data.status === 201) {
                    setSuccess(true)
                }
            }).catch(err => {
                setImgErr(true)
                if (err.response) {
                    console.log(err);
                    if (err.response.status === 401) {
                        logout();
                    } else if (err.response.status === 429) {
                        alert("Too many requests.");

                    } else {
                        setImgMessage("Unexpected error.");

                    }
                } else {
                    setImgMessage("No response received from the server.");
                }
            })
            setSaveImgClicked(false)
        }, 2000);
    }

    // Save profle data
    const [clicked,setClicked] = useState(false)
    const [err,setErr] = useState(false)
    const [successProfile,setSuccessProfile] = useState(false)
    const [message,setMessage] = useState("")
    const handleSaveProfile = ()=>{
        const axiosInstanceJWT = AxiosInstanceJWT()
        const profileData = {
            first_name: firstName,
            last_name: lastName,
            facebook: facebook,
            twitter: twitter,
            telegram: telegram
        }
        setClicked(true)
        setTimeout(() => {
            const data = axiosInstanceJWT.patch(`/api/customer/${id}/`,profileData)
            data.then(data=>{
                if(data.status===200){
                    setSuccessProfile(true)
                }else{
                    alert("Too many requests.");
                }
            }).catch(err=>{
                setErr(true)
                if (err.response) {
                    
                    if (err.response.status === 401) {
                        logout();
                    } else if (err.response.status === 429) {
                        alert("Too many requests.");

                    } else {
                        setMessage("Unexpected error.");
                    }
                } else {
                    setMessage("No response received from the server.");
                }
            })
            setClicked(false)
        }, 2000);
    }

    return (
        <>
            {/* Custom floating error for image */}
            {imgErr ? <FlaotingErrorCustom err={imgErr} setErr={setImgErr} message={imgMessage} /> : ""}

            {err ? <FlaotingErrorCustom err={err} setErr={setErr} message={message} /> : ""}

            <section className={`${styles.SettingsSection} `}>
                <div className={styles.SettingsArea}>
                    <div className={styles.profileImageArea}>

                        <div className={styles.profileWrapper}>
                            <div className={styles.profileImage}>
                                {/* Image loader */}
                                {fetched ? <img src={img} alt="profile" /> : <LoadingArea />}
                            </div>
                            <div className="btnArea">
                                {/* Upload success */}
                                {success ? <p className='text-success text-center'>Successfully uploaded.</p> : ""}
                                <label className="btn btn-primary">
                                    Upload Image
                                    <input onChange={handleImageUpload} type="file" className="hidden" />
                                </label>
                                <div onClick={handleImageSave} className="btn btn-success ml-5 min-w-[120px]">
                                    {saveImgClicked ? <span className="loading loading-dots loading-md"></span> : "Save Image"}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <PersonalInformantion fetched={fetched} username={userName} email={email} firstName={firstName} lastName={lastName} setFirstName={setFirstName} setLastName={setLastName} super = {superSeller} verified = {verifiedUser} />
                
                <SocialDetails fetched={fetched} facebook={facebook} setFacebook = {setFacebook} twitter = {twitter} setTwitter = {setTwitter} telegram = {telegram} setTelegram = {setTelegram} />

                <div className="div flex justify-center pt-5">
                    <button onClick={handleSaveProfile} className='btn btn-primary w-[330px] '>
                        {clicked?<span className="loading loading-dots loading-md"></span>:"Save Profile"}
                    </button>
                </div>
                <ShippingDetails shippingEmail={shippingEmail} shippingDetails={shippingDetails} setShippingEmail = {setShippingEmail}  setShippingDetails={setShippingDetails} />
                <ChangePassword />

            </section>

            <Success success= {successProfile} setSuccess = {setSuccessProfile} />
        </>
    )
};

export default memo(Settings);

const PersonalInformantion = (props) => {
    return (
        <div className={styles.ProfileInformationArea}>
            <div className="text-4xl text-center p-5">Personal Details</div>
            <hr />

            {props.fetched ? <div className={styles.FormArea}>
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

                    <div className="inputGroup flex flex-col p-5">
                        <label className='text-2xl pb-2' htmlFor="super">Super Seller</label>
                        <input defaultValue={props.super?"YES":"NO"} type="text" id='super' placeholder="super" className="input input-bordered rounded-none" disabled />
                    </div>
                    <div className="inputGroup flex flex-col p-5">
                        <label className='text-2xl pb-2' htmlFor="verified">Verified User</label>
                        <input defaultValue={props.verified?"YES":"NO"} type="text" id='verified' placeholder="super" className="input input-bordered rounded-none" disabled />
                    </div>
                </div>

                <div className='flex grow flex-wrap'>

                    <div className="inputGroup flex flex-col p-5">
                        <label className='text-2xl pb-2' htmlFor="firstname">First Name</label>
                        <input onChange={e => props.setFirstName(e.target.value)} value={props.firstName} type="text" id='firstname' placeholder="First Name" className="input input-bordered rounded-none " />
                    </div>
                    <div className="inputGroup flex flex-col p-5">
                        <label className='text-2xl pb-2' htmlFor="lastname">Last Name</label>
                        <input onChange={e => props.setLastName(e.target.value)} value={props.lastName} type="text" id='lastname' placeholder="Last Name" className="input input-bordered  rounded-none" />
                    </div>


                </div>


            </div> : <LoadingArea />}
        </div>
    )
}
const SocialDetails = (props) => {
    return (
        <div className={styles.SocialDetailsArea}>
            <h1 className='text-4xl p-5 text-center'>
                Social Details <br />
            <span className='text-sm font-light text-info'>***Only Usernames***</span>
            </h1>
            <hr />

            <div className={styles.SocialDetails}>
                <div className="social flex p-5">
                    <div className="socialImgArea w-[80px]">
                        <img className='w-[50px]' src="./dashboardassets/facebook.png" alt="ok" />
                    </div>
                    <input onChange={e=>props.setFacebook(e.target.value)} value={props.facebook} placeholder='Facebook Username' className='input rounded-none' type="text" />
                </div>
                <div className="social flex p-5">
                    <div className="socialImgArea w-[80px]">
                        <img className='w-[50px]' src="./dashboardassets/twitter.png" alt="ok" />
                    </div>
                    <input onChange={e=>props.setTwitter(e.target.value)} value={props.twitter} placeholder={`X Username`} className='input rounded-none' type="text" />
                </div>
                <div className="social flex p-5">
                    <div className="socialImgArea w-[80px]">
                        <img className='w-[50px]' src="./dashboardassets/telegram.png" alt="ok" />
                    </div>
                    <input onChange={e=>props.setTelegram(e.target.value)} value={props.telegram} placeholder='Telegram Username' className='input rounded-none' type="text" />
                </div>
            </div>
        </div>
    )
}

const ShippingDetails = (props) => {
    return (
        <div className={styles.ShippingDetailsArea}>
            <h1 className='text-4xl p-5 text-center'>
            Shipping Details <br />
            <span className='text-sm font-light text-info'>***Changing Won't effect current orders***</span>
            </h1>
            <hr />

            <div className={styles.ShippingDetails}>
                <div className='shippingEmail p-5'>
                    <label className='text-2xl block pb-2' htmlFor="shippingEmail">
                        Shipping Email
                    </label>
                    <input onChange={e=>props.setShippingEmail(e.target.value)} defaultValue={props.shippingEmail} type="text" id='shippingemail' placeholder="Shipping Email" className="input input-bordered w-full rounded-none " />
                </div>
                <div className="inptGroup flex flex-col p-5">
                    <label className='text-2xl pb-2' htmlFor="firstname ">Shipping Details</label>
                    <textarea onChange={e=>props.setShippingDetails(e.target.value)} defaultValue={props.shippingDetails} placeholder="Shipping Details" className="textarea textarea-bordered textarea-lg rounded-none w-full h-[250px]" ></textarea>
                </div>
            </div>
            <div className="div flex justify-center pt-5 pb-5">
                <button className='btn btn-primary w-[330px] '>Save Shipping</button>
            </div>
        </div>
    )
}




const ChangePassword = () => {
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

//Modal

const Success = (props)=>{
    const handle = (event) => {
        props.setSuccess(false)
    }
    return(
        <>
            <div className={` ${styles.blurryBackgroundSection} ${styles.blurryBackground} ${props.success?'':"hidden"}` }>
                
                <div className={`${styles.ModalArea}`}>
                    <button onClick={handle} className={styles.closeModal}>
                        <img src="/dashboardassets/delete.png" alt="" />
                    </button>
                    <div className='text-center text-2xl font-bold'>
                        Successfully updated.
                    </div>

                </div>
            </div>
        </>
    )
}