import styles from './styles/NewestProducts.module.css'
import { FeaturedProductsCard } from './templates/featuredProducts';
import { Link } from 'react-router-dom';


const NewProducts = () => {
    return (
        <>
            <section className={`${styles.NewProductsSection}`}>
                <div className="text-center text-5xl pt-10">
                        New Products
                    </div>
                    <div className=" text-center p-10">
                        Check out our newest listed products 
                </div>
                <div className={styles.categoryArea}>
                        <div className="btn btn-info">Gaming</div>
                        <div className="btn btn-info">Gaming Cards</div>
                        <div className="btn btn-info">Electronics</div>
                        <div className="btn btn-info">Electronics</div>
                        <div className="btn btn-info">Electronics</div>
                        <div className="btn btn-info">Gaming</div>
                        <div className="btn btn-info">Gaming Cards</div>
                        <div className="btn btn-info">Electronics</div>
                        <div className="btn btn-info">Electronics</div>
                        <div className="btn btn-info">Electronics</div>
                </div>
                <div className={styles.newProductsArea}>
                    {Array.from({ length: 6 }, (_, index) => <FeaturedProductsCard/>)}    
                </div>
                <div className="btnArea flex justify-center w-full mt-5">
                    <Link className='btn btn-info text-white'>More New Products</Link>
                </div>
            </section>
            <hr />
        </>
    )
};

export default NewProducts;