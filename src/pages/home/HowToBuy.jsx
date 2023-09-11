import styles from './styles/HowToBuy.module.css'
import { FeaturedProductsCard } from './templates/featuredProducts';
import { Link } from 'react-router-dom';
import img from './assets/digitalss.jpg'

const HowToBuy = () => {
    return (
        <>
            <section className={`${styles.HowToBuySection}`}>
                <div className="step-area flex justify-center">
                    <div className="bg-info p-2 rounded-full px-10 m-5 text-white">Step 1 </div>
                </div>
                <div className={styles.HowToBuyArea}>
                    <div className={styles.LeftArea}>
                        <h1 className="text-4xl">Choose Your Product</h1>
                        <br /><br />
                        <p className="text-xl">
                            Choose your proucts from the marketplace.
                            Click on the product to go to the products 
                            details page.
                        </p>
                    </div>
                    <div className={styles.RightArea}>
                       
                       <img src={img} alt="" />
                        
                    </div>
                </div>
                <div className="step-area flex justify-center">
                    <div className="bg-info p-2 rounded-full px-10 m-5 text-white">Step 1 </div>
                </div>
                <div className={styles.HowToBuyAreaTwo}>
                    <div className={styles.LeftArea}>
                        <h1 className="text-4xl">Choose Your Product</h1>
                        <br /><br />
                        <p className="text-xl">
                            Choose your proucts from the marketplace.
                            Click on the product to go to the products 
                            details page.
                        </p>
                    </div>
                    <div className={styles.RightArea}>
                       
                       <img src={img} alt="" />
                        
                    </div>
                </div>
                <div className="step-area flex justify-center">
                    <div className="bg-info p-2 rounded-full px-10 m-5 text-white">Step 1 </div>
                </div>
                <div className={styles.HowToBuyArea}>
                    <div className={styles.LeftArea}>
                        <h1 className="text-4xl">Choose Your Product</h1>
                        <br /><br />
                        <p className="text-xl">
                            Choose your proucts from the marketplace.
                            Click on the product to go to the products 
                            details page.
                        </p>
                    </div>
                    <div className={styles.RightArea}>
                       
                       <img src={img} alt="" />
                        
                    </div>
                </div>
            </section>
            <hr />
        </>
    )
};

export default HowToBuy;