import { useEffect, useState } from 'react'
import styles from './Error.module.css'

export const Error = (props) => {
    return (
        <>
            <div className={styles.Error}>
                <div className="alert alert-error">
                    <span>Error! Failed to fetch. <br />
                    Reason: {props.error?props.error:"404"}.</span>
                </div>
            </div>
        </>
    )
}

export const EmptyMessage = (props) => {
    return (
        <>
            <div className={styles.Error}>
                <div className="alert alert-error min-w-[330px]">
                    <div className="text-center">{props.message}</div>
                </div>
            </div>
        </>
    )
}

export const FloatingError = (props) => {
    const [hidden,setHidden] = useState(false)
    const handleClick  = ()=>{
        return setHidden(true)
    }
    useEffect(() => {
        const timer = setTimeout(() => {
            setHidden(true);
        }, 10000);
    
        return () => clearTimeout(timer); 
    }, []);
    return (
        <>
            <div className={styles.FloatingError}>
                <div className={`alert alert-error ${hidden ?"hidden":""}`}>
                    <div className='flex justify-around items-center w-[100%]'> 
                        <div onClick={handleClick} className="cursor-pointer">
                            <svg  xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                        </div> 
                        <span>
                            {props.message}
                        </span>
                    </div>
                </div>
            </div>
        </>
    )
}