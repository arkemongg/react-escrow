import styles from './styles/Featured.module.css'
import img from './assets/digitalss.jpg'
const Featured = () => {
    return (
        <>
            <section className={`${styles.featuredSection}`}>
                <div className="text-center text-5xl pt-10">
                    Featured Products
                </div>
                <div className=" text-center p-10">
                    Buy staff pciked featured products.
                </div>

                <div className={styles.featuredProudctsArea}>
                    <div className={styles.featuredProduct}>
                        <div  className={styles.productImg}>
                            <img src={img} alt="" />
                        </div>
                        <div  className={styles.productTitle}>
                            <p className="text-2xl">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consectetur, fugiat.</p>
                        </div>

                        <div  className={styles.productSeller}>
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
                        <div className={`${styles.productPrice} text-primary text-xl`}>
                            $ 10000.99
                        </div>
                    </div>

                </div>
            </section>
        </>
    )
  };
  
  export default Featured;