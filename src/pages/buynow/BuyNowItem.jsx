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
                <img src="/dashboardassets/d.jpg" alt="" />
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
            <hr />
            {/* <ProductDetails /> */}
            <ProductReviews />
        </>
    )
    
}

const ProductDetails = ()=>{
    return (
        <div className={`${styles.ProductDetailsArea} text-xl font-light pb-[100px]`}>
            
            <div className='text-center p-3 pb-5 font-bold'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis provident iste consequatur aliquam quos saepe ipsum quisquam esse, debitis nisi.
            </div>

            <div className='flex justify-between p-3'>
                <div className="id min-w-[200px]">
                    Product ID : 
                </div>
                <div className="id">
                    #1
                </div>
            </div>
            <hr />
            <div className='flex justify-between p-3'>
                <div className="category min-w-[200px]">
                    Category : 
                </div>
                <div className="id">
                    Gaming
                </div>
            </div>
            <hr />
            <div className='flex justify-between p-3'>
                <div className="inventory min-w-[200px]">
                    Inventory : 
                </div>
                <div className="id">
                    1000
                </div>
            </div>
            <hr />
            <div className='flex justify-between p-3'>
                <div className="condition min-w-[200px]">
                    Product Condition : 
                </div>
                <div className="id">
                    New
                </div>
            </div>
            <hr />
            <div className='flex justify-between p-3'>
                <div className="category min-w-[200px]">
                    Product Condition : 
                </div>
                <div className="id">
                    New
                </div>
            </div>
            <hr />
        </div>
    )
}
const ProductReviews = ()=>{
    return (
        <div className={`${styles.ProductReviewsArea}`}>
            <Review />
            <Review />
            <Review />
            <Review />
            <Review />
            <div className="btnArea flex justify-center p-5">
                <button className="btn btn-primary min-w-[150px] mr-2">
                    Previous
                </button>
                <button className="btn btn-primary min-w-[150px]">
                    Next
                </button>
            </div>
        </div>
    )
}

const Review = ()=>{
    return(
        <div className={styles.review}>
            <div className={styles.ProfileDetails}>
                <div className={styles.ProfileImageArea}>
                    <img src="/dashboardassets/d.jpg" alt="star" />
                </div>
                <div className="ProfileNames flex flex-col justify-center">
                    <div className="font-bold max-w-[400px]">
                        Lorem ipsum dolor sit amet asdasdasdasdasdsadasd asdasdasd!
                    </div>
                    <div className='flex font-bold text-xl items-center'>
                        <div>5</div>
                        <img className='w-[20px] h-[20px]' src="/dashboardassets/star.png" alt="" />
                    </div>
                </div>
            </div>
            <hr />
            <div className='text-sm font-light p-10'>
                Lorem ipsum, dolor sit amet consectetur adipisicing elit. Inventore fuga nemo molestias modi dicta magnam. Totam cupiditate ducimus esse, iusto perferendis dignissimos placeat id cumque adipisci corporis. Iusto, optio deserunt!
            </div>
            <hr />
        </div>
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

            <div className="btnArea p-5 flex flex-wrap justify-center">
                {/* <div className="btn btn-primary min-w-[320px]">Login</div> */}

                <input type="text" className='input input-bordered rounded-none m-5 min-w-[300px]' />
                <div className="btn btn-success min-w-[300px] mt-5">Buy Now</div>
            </div>

        </div>
    )

}

