import styles from './MyProductCards.module.css'

import { Link } from 'react-router-dom'

export const Product = (props) => {
  
    return (
        <>
            <Link className={styles.Product}>
                <div className={styles.productImg}>
                    <img src="/dashboardassets/d.jpg"  alt="" />
                </div>
                <div className={styles.productTitle}>
                    <div className="text-2xl font-bold">Lorem ipsum dolor sit amet.</div>
                </div>
                <div className={`${styles.productPrice} text-primary text-xl`}>
                    $ 200
                </div>

                <div className='btnArea flex justify-between pt-5'>

                    <div className="btn  w-[160px] btn-primary text-sm">
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
