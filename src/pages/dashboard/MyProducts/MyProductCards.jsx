import { useState } from 'react';
import { apiUrl } from '../../Urls';
import styles from './MyProductCards.module.css'

import { Link } from 'react-router-dom'
import { useAuth } from '../../../AuthContext';
import { AxiosInstanceJWT } from '../../AxiosHeaders';
import { FlaotingErrorCustom } from '../../GlobalTemplates/FloatingErrorCustom';

export const Product = (props) => {
    const data = props.data
    const handleEdit= ()=>{
            props.setEditData([])
            props.setEditData(data)
    }

    const [hidden,setHidden] = useState(true)
    const handleRemove= ()=>{
        setHidden(false)
    }
    
  
    return (
        <>
            
            <div className={styles.Product}>
                <div className={styles.productImg}>
                    <img src={apiUrl+data.image}  alt="" />
                </div>
                <div className={styles.productTitle}>
                    <Link target='_blank' to={`/buynow/${data.id}/${data.slug}`} className="text-2xl font-bold">{data.title}</Link>
                </div>
                <div className={`${styles.productPrice} text-primary text-sm`}>
                     <div className="span">
                        $ {parseFloat(data.price).toFixed(2)}
                     </div>
                     <span>{data.sales} Sales</span>
                     <span>{data.inventory} items left</span>
                </div>
                

                <div className='btnArea flex justify-between pt-5'>

                    <div onClick={handleEdit} className="btn  w-[160px] btn-primary text-sm">
                        Edit Product
                    </div>
                    <div onClick={handleRemove} className="btn w-[160px] btn-error">
                        Remove Product
                    </div>

                </div>

            </div>
            <CompleteDeleteModal id = {data.id} title={data.title} hidden={hidden} setHidden = {setHidden} />
        </>
    )
}

export const LoadingProductsCard = () => {
    return (
        <>
            <div className={`${styles.featuredProduct} flex justify-center items-center`}>
                <span className="loading loading-ring loading-lg"></span>
            </div>
        </>
    )
}

const CompleteDeleteModal = (props) => {
    const {logout} = useAuth()
    const [success, setSuccess] = useState(false)
    const [clicked, setClicked] = useState(false)
    const [err, setErr] = useState(false)
    const [message, setMessage] = useState("")

    // const [deleteModal, setDeleteModal] = useState(false)

    const handleClose = ()=>{
        props.setHidden(true)
    }
    const handleConfirm= ()=>{
        setClicked(true)
        const axiosInstanceJWT = AxiosInstanceJWT()
        const patchData = {
            "expired": true
        }
        const patchProductData = async () => {
            try {
                const response = await axiosInstanceJWT.patch(`/api/myproducts/${props.id}/`,patchData)
                return response
            } catch (error) {
                throw error
            }
        }
        const timeout =  setTimeout(() => {
            const data = patchProductData()
            data.then(data=>{
                if(data.status===200){
                    setSuccess(true)
                    setClicked(false)
                }else{
                    setClicked(false)
                    alert("Unexpected error.")
                }
            }).catch(err=>{
                setErr(true)
                if (err.response) {
                    
                    if (err.response.status === 401) {
                        logout();
                    }else if (err.response.status === 429) {
                        alert("Too many requests.");
                        setClicked(false)
                    } else {
                        setMessage("Unexpected error.");
                        setClicked(false)
                    }
                } else {
                    setMessage("No response received from the server.");
                    setClicked(false)
                }
                setSuccess(false)
            })
        }, 2000);
    }
    return (
        <>
            {err ? <FlaotingErrorCustom err={err} setErr={setErr} message={message} /> : ""}
            <div className={`${styles.blurryBackgroundSection} ${styles.blurryBackground} ${props.hidden ? 'hidden' : ""}`}>
                <div className={styles.ModalArea}>
                    <div className="relative ">
                        <div className="absolute m-8 rounded  inset-0 flex items-center justify-center">
                            <span className='btn btn-info  min-w-[150px]'>Prodct Name : {props.title.length>10?props.title.slice(0, 9):props.title} ....</span>
                        </div>
                    </div>
                    <button onClick={handleClose}  className={styles.closeModal}>
                        <img src="/dashboardassets/delete.png" alt="" />
                    </button>
                    <br />
                    <div className='text-center text-2xl font-bold'>
                        Do you want to remove this product?
                    </div>
                    <br />
                    <p className={`text-success text-center w-[80%] m-auto ${success?"":"hidden"}`}>Successfully removed the product.Please refresh to see the effect.</p>
                    <p className={`text-error text-center w-[80%] m-auto ${message===""?"hidden":""}`}>{message}</p>
                    <div className="btnArea flex justify-center">
                       <div onClick={handleConfirm} className="btn btn-success w-[150px]">
                        {clicked?<span className="loading loading-dots loading-md"></span>:"Confirm"}
                       </div>
                       <div onClick={handleClose}  className="btn btn-error w-[150px] ml-1">Close</div>
                    </div>
                </div>
            </div>
        </>
    )
}