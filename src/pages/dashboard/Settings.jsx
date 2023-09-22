import { memo, useState } from 'react';
import styles from './styles/Settings.module.css'

const Settings = (props) => {
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
                                <label className="btn btn-primary">
                                        Upload Image
                                        <input onChange={handleImageUpload} type="file" className="hidden" />
                                </label>
                                <div className="btn btn-success ml-5">Save Image</div>
                            </div>
                        </div>
                    </div>
                </div>

                <PersonalInformantion />
                <ShippingDetails />
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



  const PersonalInformantion = ()=>{
    return (
            <div className={styles.ProfileInformationArea}>
                <div className="text-4xl text-center p-5">Personal Details</div>
                <hr />

                <div className={styles.FormArea}>
                    <div className='flex grow flex-wrap'>
                        <div className="inptGroup flex flex-col p-5">
                            <label className='text-2xl pb-2' htmlFor="username">Username</label>
                            <input type="text" id='username' value="username" className="input input-bordered rounded-none " disabled />   
                        </div>
                        <div className="inptGroup flex flex-col p-5">
                            <label className='text-2xl pb-2' htmlFor="email">Email</label>
                            <input type="text" id='email' value="email@email.com" className="input input-bordered rounded-none" disabled />   
                        </div>
                    </div>

                    <div className='flex grow flex-wrap'>

                        <div className="inptGroup flex flex-col p-5">
                            <label className='text-2xl pb-2' htmlFor="firstname">First Name</label>
                            <input type="text" id='firstname' placeholder="First Name" className="input input-bordered rounded-none " />   
                        </div>
                        <div className="inptGroup flex flex-col p-5">
                            <label className='text-2xl pb-2' htmlFor="lastname">Last Name</label>
                            <input type="text" id='lastname' placeholder="Last Name" className="input input-bordered  rounded-none" />   
                        </div>

                    </div>
                    
                    {/* <div className="inptGroup flex flex-col p-5">
                        <label className='text-2xl pb-2' htmlFor="firstname ">Bio</label>
                        <textarea placeholder="Bio" className="textarea textarea-bordered textarea-lg w-full" ></textarea>  
                    </div> */}
                </div>
            </div>
        )
  }

const ShippingDetails = ()=>{
    return (
        <div className={styles.ShippingDetailsArea}>
            <h1 className='text-4xl p-5 text-center'>Shipping Details</h1>
            <hr />

            <div className={styles.ShippingDetails}>
                <div className='shippingEmail p-5'>
                    <label  className='text-2xl block pb-2' htmlFor="shippingEmail">
                        Shipping Email
                    </label>
                    <input type="text" id='lastname' placeholder="Shipping Email" className="input input-bordered w-full rounded-none " /> 
                </div>
                 <div className="inptGroup flex flex-col p-5">
                        <label className='text-2xl pb-2' htmlFor="firstname ">Shipping Details</label>
                        <textarea placeholder="Shipping Details" className="textarea textarea-bordered textarea-lg rounded-none w-full h-[250px]" ></textarea>  
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
                    <input className='input rounded-none' type="text"/>
                </div>
                <div className="social flex p-5">
                    <div className="socialImgArea w-[80px]">
                        <img className='w-[50px]' src="./dashboardassets/twitter.png" alt="ok" />
                    </div>
                    <input className='input rounded-none' type="text"/>
                </div>
                <div className="social flex p-5">
                    <div className="socialImgArea w-[80px]">
                        <img className='w-[50px]' src="./dashboardassets/telegram.png" alt="ok" />
                    </div>
                    <input className='input rounded-none' type="text"/>
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