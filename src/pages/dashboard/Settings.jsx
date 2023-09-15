import { useState } from 'react';
import styles from './styles/Settings.module.css'

const Settings = (props) => {
    return (
        <>
            <section className={`${styles.SettingsSection} `}>
                <div className={styles.SettingsArea}>
                    <div className={styles.profileImageArea}>
                        
                        <div className={styles.profileWrapper}>
                            <div className={styles.profileImage}>
                                <img src="./dashboardassets/subscrisbebg.jpg" alt="profile" />
                            </div>
                            <div className="btnArea">
                                <div className="btn btn-primary">Upload Image</div>
                                <div className="btn btn-success ml-5">Save Image</div>
                            </div>
                        </div>
                    </div>
                </div>

                <PersonalInformantion />
                <ChangePassword />
            </section>
        </>
    )
  };
  
  export default Settings;



  const PersonalInformantion = ()=>{
    return (
            <div className={styles.ProfileInformationArea}>
                <div className="text-4xl text-center p-5">Personal Details</div>
                <hr />

                <div className={styles.FormArea}>
                    <div className="inptGroup flex flex-col p-5">
                        <label className='text-2xl pb-2' htmlFor="firstname">First Name</label>
                        <input type="text" id='firstname' placeholder="First Name" className="input input-bordered w-full max-w-xl" />   
                    </div>
                    <div className="inptGroup flex flex-col p-5">
                        <label className='text-2xl pb-2' htmlFor="lastname">Last Name</label>
                        <input type="text" id='lastname' placeholder="Last Name" className="input input-bordered w-full max-w-xl " />   
                    </div>
                    <div className="inptGroup flex flex-col p-5">
                        <label className='text-2xl pb-2' htmlFor="username">Username</label>
                        <input type="text" id='username' placeholder="User" className="input input-bordered w-full max-w-xl " disabled />   
                    </div>
                    <div className="inptGroup flex flex-col p-5">
                        <label className='text-2xl pb-2' htmlFor="email">Email</label>
                        <input type="text" id='email' placeholder="email@email.com" className="input input-bordered w-full max-w-xl " disabled />   
                    </div>
                    <div className="inptGroup flex flex-col p-5 w-[78%]">
                        <label className='text-2xl pb-2' htmlFor="firstname ">Bio</label>
                        <textarea placeholder="Bio" className="textarea textarea-bordered textarea-lg w-full" ></textarea>  
                    </div>
                </div>
                <div className="btnArea flex justify-center p-5">
                    <div className="btn btn-primary w-[350px]">Save</div>
                </div>
            </div>
        )
  }

  const ChangePassword = ()=>{
    return (
        <div className={styles.ChangePassowrd}>
            <div className="passWordForm">
                <div className="inptGroup flex flex-col p-5">
                    <label className='text-2xl pb-2' htmlFor="firstname">Password</label>
                    <input type="password" id='password' placeholder="Password" className="input input-bordered w-full max-w-xl" />   
                </div>

                <div className="inptGroup flex flex-col p-5">
                    <label className='text-2xl pb-2' htmlFor="firstname">Confrim Password</label>
                    <input type="password" id='confirmpassword' placeholder="Confrim Password" className="input input-bordered w-full max-w-xl" />   
                </div>

                <div className="inptGroup flex flex-col p-5">
                    <label className='text-2xl pb-2' htmlFor="firstname">Current Password</label>
                    <input type="password" id='currentpassword' placeholder="Current Password" className="input input-bordered w-full max-w-xl" />   
                </div>
            </div>
        </div>
    )
  }