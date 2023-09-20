import { LoadingProductsCard, Product } from './MyProducts/MyProductCards'
import styles from './styles/ManageItems.module.css'


const ManageItems = ()=>{
    return (
        <>
            <div className={styles.ManageItemsSection}>
                <MyProducts />
            </div>
        </>
    )
}


const MyProducts = ()=>{
    return (
        <div className={styles.MyProductsArea}>
            <h1 className='text-2xl p-5'>My Products</h1>
            <hr />
            <div className={`${styles.searchArea} p-5`}>
                    <input type="text" placeholder="Type here" className={`max-w-[550px] ${styles.searchInput} input rounded-none input-bordered`} />
                    <button className={`max-w-[150px] ml-5 ${styles.homeSearchBtn} btn btn-primary`}>Search</button>
            </div>
            <div className={styles.MyProducts}>
                {Array.from({ length: 6 }, (_, index) => <Product key={index} />)}
            </div>
        </div>
    )
}

export default ManageItems;

