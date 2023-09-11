import styles from './styles/Counts.module.css'

import products from './assets/products.png'
import sales from './assets/sales.png'
import happy from './assets/happy.png'
import users from './assets/users.png'

const Counts = () => {
    
    return (
        <>
            <section className={`${styles.CountsSection}`}>
                
                <div className={styles.CountArea}>
                    
                    <div className={`${styles.Count}`}>
                            <img src={products} alt="products" />
                            <div className="text-4xl text-warning">
                                000000
                            </div>
                            <p className="text-xl text-center w-[250px] p-5">
                                ITEMS for Sale
                            </p>
                    </div>
                    <div className={`${styles.Count}`}>
                            <img src={sales} alt="sales" />
                            <div className="text-4xl text-success">
                                000000
                            </div>
                            <p className="text-xl text-center w-[250px] p-5">
                                ITEMS Sold
                            </p>
                    </div>
                    <div className={`${styles.Count}`}>
                            <img src={happy} alt="happy" />
                            <div className="text-4xl text-primary">
                                000000
                            </div>
                            <p className="text-xl text-center w-[250px] p-5">
                                Happy Customers
                            </p>
                    </div>
                    <div className={`${styles.Count}`}>
                            <img src={users} alt="users" />
                            <div className="text-4xl text-accent">
                                000000
                            </div>
                            <p className="text-xl text-center w-[250px] p-5">
                                Users
                            </p>
                    </div>

                </div>

            </section>
        </>
    )
};

export default Counts;