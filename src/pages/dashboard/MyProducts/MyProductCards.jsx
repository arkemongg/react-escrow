import { apiUrl } from '../../Urls';
import styles from './MyProductCards.module.css'

import { Link } from 'react-router-dom'

export const Product = (props) => {
    const data = props.data
    const handleEdit= ()=>{
            props.setEditData([])
            props.setEditData(data)
    }
  
    return (
        <>
            <Link className={styles.Product}>
                <div className={styles.productImg}>
                    <img src={apiUrl+data.image}  alt="" />
                </div>
                <div className={styles.productTitle}>
                    <div className="text-2xl font-bold">{data.title}</div>
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
                    <div className="btn w-[160px] btn-error">
                        Remove Product
                    </div>

                </div>

            </Link>
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
