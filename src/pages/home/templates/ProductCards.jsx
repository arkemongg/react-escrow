import styles from './ProductCards.module.css'
import img from '../assets/digitalss.jpg'
import star from '../assets/star.png'
import { Link } from 'react-router-dom'

export const FeaturedProductsCard = () => {
    return (
        <>
            <div className={styles.featuredProduct}>
                <div className={styles.productImg}>
                    <img src={img} alt="" />
                </div>
                <div className={styles.productTitle}>
                    <Link className="text-2xl ">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, fugiat.</Link>
                </div>

                <div className={styles.productSeller}>
                    <div className={styles.sellerLogo}>
                        M
                    </div>
                    <div className={`${styles.sellerFirstName} text-xl`}>
                        Mr White
                    </div>
                    <div className={`${styles.ProductCategory} text-sm`}>
                        in GiftCard
                    </div>
                </div>
                <hr />
                <div className={`${styles.priceSection} flex justify-between pr-5`}>
                    <div className={`${styles.productPrice} text-primary text-xl`}>
                        $ 10000.99
                    </div>

                    <div className={`${styles.sellerRating} text-primary text-sm text-center`}>
                        Seller Review
                        <br />
                        <span className='flex text-xl items-center justify-center'>5.00 <img className={styles.star} src={star} alt="star" /></span>
                    </div>
                </div>
            </div>
        </>
    )
}

export const Product = (props) => {
    return (
        <>
            <div className={styles.Product}>
                <div className={styles.productImg}>
                    <img src={`http://127.0.0.1:8000${props.img}`} alt="" />
                </div>
                <div className={styles.productTitle}>
                    <Link className="text-2xl ">{props.title}</Link>
                </div>

                <div className={styles.productSeller}>
                    <div className={styles.sellerLogo}>
                        M
                    </div>
                    <div className={`${styles.sellerFirstName} text-xl`}>
                        Mr White
                    </div>
                    <div className={`${styles.ProductCategory} text-sm`}>
                        in GiftCard
                    </div>
                </div>
                <hr />
                <div className={`${styles.priceSection} flex justify-between pr-5`}>
                    <div className={`${styles.productPrice} text-primary text-xl`}>
                        $ {props.price.toFixed(2)}
                    </div>

                    <div className={`${styles.sellerRating} text-primary text-sm text-center`}>
                        Seller Review
                        <br />
                        <span className='flex text-xl items-center justify-center'>5.00 <img className={styles.star} src={star} alt="star" /></span>
                    </div>
                </div>
            </div>
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