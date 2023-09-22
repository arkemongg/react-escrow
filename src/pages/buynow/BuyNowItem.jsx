import { PageLocation } from '../GlobalTemplates/PageLocation'
import styles from './styles/BuyNowItem.module.css'

const BuyNowItem = () => {
    return (
        <>
            <PageLocation head={"Buy Now"} tail={`Home / ${"Buy Now"}`} />
            <section className={styles.BuyNowSection}>
                <div className={styles.BuyNowSectionWrapper}>
                    <BuyNowProductArea />
                    <BuyNowProductBuyArea />
                </div>
            </section>
        </>
    )
}

export default BuyNowItem



const BuyNowProductArea = () => {


    return (
        <div className={styles.BuyNowProductArea}>

            <div className={styles.BuyNowProductImageArea}>
                <img src="/dashboardassets/edit.png" alt="" />
            </div>

            <div className={`${styles.ProductsStats} `}>
                <div className={`SalesArea`}>
                    <div className="text-center text-xl font-light p-2 flex items-center justify-center">
                        <img className='w-[30px]' src="/dashboardassets/svg.png" alt="" />
                        <div className='ml-2'>
                            Total Sales
                        </div>
                    </div>
                    <div className="text-center font-light flex items-center justify-center">
                        <div className='text-2xl font-bold mr-1'>
                            120
                        </div>

                    </div>
                </div>
                <div className={`ReviewsArea`}>

                    <div className="text-center text-xl font-light p-2 flex items-center justify-center">
                        <img className='w-[30px]' src="/dashboardassets/feedback.png" alt="" />
                        <div className='ml-2'>
                            Seller Reviews
                        </div>
                    </div>
                    <div className="text-center font-light flex items-center justify-center">
                        <div className='text-2xl font-bold mr-1'>
                            4.50
                        </div>
                        <img className='w-[20px]' src="/dashboardassets/star.png" alt="star" />
                    </div>
                </div>

                <div className={`ReviewsArea`}>

                    <div className="text-center text-xl font-light p-2 flex items-center justify-center">
                        <img className='w-[30px]' src="/dashboardassets/views.png" alt="" />
                        <div className='ml-2'>
                            Total Views
                        </div>
                    </div>
                    <div className="text-center font-light flex items-center justify-center">
                        <div className='text-2xl font-bold mr-1'>
                            0000
                        </div>
                    </div>
                </div>
            </div>
                <div className="h-[10px] bg-[#F1F2F7]"></div>
                <BuyNowProductsDetailsArea />
                <hr />
        </div>
    )

}

const BuyNowProductsDetailsArea = ()=>{
    return (
        <>
            <div className={styles.ProductsDetailsBtnArea}>
                <div className={`text-xl Description ${styles.active} flex items-center`} >
                    <img className='w-[20px] h-[20px]' src="/dashboardassets/details.png" alt="" />
                    <div className='ml-1'>
                        Product Details
                    </div>
                </div>

                <div className={`text-xl SellerProfile flex items-center`}>
                    <img className='w-[20px] h-[20px]' src="/dashboardassets/profile.png" alt="" />
                    <div className='ml-1'>
                        Seller Profile
                    </div>
                    
                </div>

                <div className={`text-xl Reviews flex items-center`}>
                    <img className='w-[20px] h-[20px]' src="/dashboardassets/reviews.png" alt="" />
                    <div className='ml-1'>
                        Reviews
                    </div>
                </div>
            </div>
        </>
    )
}



const BuyNowProductBuyArea = () => {

    return (
        <div className={styles.BuyNowProductBuyArea}>

            <div className={`${styles.ProductPrice}`}>

                <div className="text-center text-xl font-light p-2 flex items-center justify-center">
                    <img className='w-[30px]' src="/dashboardassets/dollar.png" alt="" />
                    <div className='ml-2'>
                        Product Price
                    </div>
                </div>
                <div className="text-center font-light flex items-center justify-center">
                    <div className='text-4xl text-primary'>
                        $4.50
                    </div>
                </div>
            </div>

            <div className="btn btn-primary min-w-[250px]">Login</div>

        </div>
    )

}

