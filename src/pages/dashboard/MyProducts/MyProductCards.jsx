import styles from './MyProductCards.module.css'

import { Link } from 'react-router-dom'

export const Product = (props) => {
    const data = {
        "title":props.index,
        "value":"1",
        "id":"1",
        "none":"1",
    }
    const handleEdit= ()=>{
            setTimeout(() => {
                const editItemsSection = document.getElementById('edit');
                if (editItemsSection) {
                  editItemsSection.scrollIntoView({ behavior: 'smooth' });
                }
            },1000);
            props.setData(
                [data]
            )
    }
  
    return (
        <>
            <Link className={styles.Product}>
                <div className={styles.productImg}>
                    <img src="/dashboardassets/d.jpg"  alt="" />
                </div>
                <div className={styles.productTitle}>
                    <div className="text-2xl font-bold">Lorem ipsum dolor sit amet.</div>
                </div>
                <div className={`${styles.productPrice} text-primary text-sm`}>
                     <div className="span">
                        $ 20000
                     </div>
                     <span>120 Sales</span>
                     <span>12000 items left</span>
                </div>
                

                <div className='btnArea flex justify-between pt-5'>

                    <div onClick={handleEdit} className="btn  w-[160px] btn-primary text-sm">
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
