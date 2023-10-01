import styles from './ProductCards.module.css'
import img from '../assets/digitalsss.jpg'
import star from '../assets/star.png'
import verifeid from '../assets/check.png'
import superseller from '../assets/super.png'
import { Link } from 'react-router-dom'

export const FeaturedProductsCard = (props) => {
    return (
        <>
            <Link to={`/buynow/${props.id}/${props.slug}`} className={styles.featuredProduct}>
                <div className={styles.featuredLogo}>
                    Featured
                </div>
                <div className={styles.productImg}>
                    <img src={`http://127.0.0.1:8000${props.img}`} alt="" />
                </div>

                <div className={styles.productTitle}>
                    <div className="text-2xl font-bold">{props.title}</div>
                </div>

                <div className={styles.productSeller}>
                    <div className={styles.sellerLogo}>
                        <img src="/dashboardassets/featuredSeller.png" alt="" />
                    </div>
                    <div className={`${styles.sellerFirstName} text-xl flex`}>
                        {props.seller_name}
                        <img className={`w-[20px] h-[20px] m-1 ${props.verified?"":"hidden"}`} title='Verified'  src={verifeid} alt="verified" /> 
                        <img className={`w-[20px] h-[20px] m-1 ${props.super?"":"hidden"}`} title='Super Seller'  src={superseller} alt="super" />
                    </div>
                    <div className={`${styles.ProductCategory} text-sm`}>
                        in {props.category}
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
                        <span className='flex text-xl items-center justify-center'>{props.seller_review===null ? "0.00":props.seller_review.toFixed(2)} <img className={styles.star} src={star} alt="star" /> <span className='text-sm font-light m-1 mt-2'> ({props.seller_review_count})</span> </span>
                    </div>
                </div>
            </Link>
        </>
    )
}

export const Product = (props) => {
    
    return (
        <>
            <Link to={`/buynow/${props.id}/${props.slug}`} className={styles.Product}>
                <div className={styles.productImg}>
                    <img src={`http://127.0.0.1:8000${props.img}`} alt="" />
                </div>
                <div className={styles.productTitle}>
                    <div className="text-2xl font-bold">{props.title}</div>
                </div>

                <div className={styles.productSeller}>
                    <div className={styles.sellerLogo}>
                        <img src="/dashboardassets/user.png" alt="seller" />
                    </div>
                    
                    <div className={`${styles.sellerFirstName} text-xl flex `}>
                        {props.seller_name}
                        <img className={`w-[20px] h-[20px] m-1 ${props.verified?"":"hidden"}`} title='Verified'  src={verifeid} alt="verified" /> 
                        <img className={`w-[20px] h-[20px] m-1 ${props.super?"":"hidden"}`} title='Super Seller'  src={superseller} alt="super" />
                    </div>
                    <div className={`${styles.ProductCategory} text-sm`}>
                        in {props.category}
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
                        <span className='flex text-xl items-center justify-center'>{props.seller_review===null ? "0.00":props.seller_review.toFixed(2)} <img className={styles.star} src={star} alt="star" /> <span className='text-sm font-light m-1 mt-2'> ({props.seller_review_count})</span> </span>
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
