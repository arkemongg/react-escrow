import styles from './styles/Featured.module.css'
import {FeaturedProductsCard} from './templates/featuredProducts';
import { Link } from 'react-router-dom';


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
                {Array.from({ length: 6 }, (_, index) => <FeaturedProductsCard/>)}    
                
                </div>
                <div className="btnArea flex justify-center w-full mt-5">
                    <Link className='btn btn-info text-white'>More Featured Products</Link>
                </div>
            </section>
        </>
    )
  };
  
  export default Featured;