import styles from './featuredProducts.module.css'
import img from '../home/assets/digitalss.jpg'
import { Link } from 'react-router-dom'

export const FeaturedProductsCard = () => {
    return (
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
                    <span>5 Star</span>
                </div>
            </div>
        </div>
    )
}

