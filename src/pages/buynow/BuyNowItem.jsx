import { useState } from 'react'
import { PageLocation } from '../GlobalTemplates/PageLocation'
import styles from './styles/BuyNowItem.module.css'
import { Link } from 'react-router-dom'

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
            <div className='text-center p-3 pb-5 font-bold'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Reiciendis provident iste consequatur aliquam quos saepe ipsum quisquam esse, debitis nisi.
            </div>
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
                        <img className='w-[30px]' src="/dashboardassets/views.png" alt="views" />
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

const BuyNowProductsDetailsArea = () => {
    const [SelectedDetails,setSelectedDetails] = useState("Product Details")
    const handleCLick = (event)=>{
        const parent = event.target.parentElement
        const text = parent.querySelector('p').textContent

        setSelectedDetails(text)
    }
    return (
        <>
            <div className={`${styles.ProductsDetailsBtnArea} `}>
                <div onClick={handleCLick}  className={`text-xl Description flex items-center ${SelectedDetails==="Product Details"?styles.active:""}`} >
                    <img className='w-[20px] h-[20px]' src="/dashboardassets/details.png" alt="" />
                    <p className='ml-1 title'>
                        Product Details
                    </p>
                </div>

                <div onClick={handleCLick} className={`text-xl SellerProfile flex items-center ${SelectedDetails==="Seller Profile"?styles.active:""}`}>
                    <img className='w-[20px] h-[20px]' src="/dashboardassets/profile.png" alt="" />
                    <p className='ml-1'>
                        Seller Profile
                    </p>

                </div>

                <div onClick={handleCLick} className={`text-xl Reviews flex items-center ${SelectedDetails==="Reviews"?styles.active:""}`}>
                    <img className='w-[20px] h-[20px]' src="/dashboardassets/reviews.png" alt="" />
                    <p className='ml-1'>
                        Reviews
                    </p>
                </div>
            </div>
            <hr />
            {SelectedDetails==="Product Details"?<ProductDetails />:""}
            {SelectedDetails==="Reviews"?<ProductReviews />:""}
            {SelectedDetails==="Seller Profile"?<SellerProfile />:""}
            
        </>
    )

}

const ProductDetails = () => {
    return (
        <div className={`${styles.ProductDetailsArea} text-xl font-light pb-[100px]`}>

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

const SellerProfile = () => {
    return (
        <div className={`${styles.SellerProfileArea}`}>
            <div className={styles.ProfileDetails}>
                <div className={styles.ProfileImageArea}>
                    <img src="/dashboardassets/d.jpg" alt="star" />
                </div>
                <div className="ProfileNames flex flex-col justify-center">
                    <div className="font-bold max-w-[340px] m-4 mb-0">
                        MR WHITE HERROLD!
                    </div>
                    <div className='text-sm text-center pt-1 p-5 '>
                        <div className='font-bold'>Member Since</div>  
                        <div className='font-light'> 12/10/20 </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className="verified text-xl flex justify-between px-5 py-2">
                <div className='min-w-[200px] flex items-center'>
                    <img className='w-[20px] h-[20px]'  src="/dashboardassets/verified.png" alt="fb" />
                    <div className='px-1'>
                        Verified Seller : 
                    </div>
                </div>
                <div>
                    Yes
                </div>
            </div>
            <hr />
            <div className="super text-xl flex justify-between px-5 py-2">
                <div className='min-w-[200px] flex items-center'>
                    <img className='w-[20px] h-[20px]'  src="/dashboardassets/super.png" alt="fb" />
                    <div className='px-1'>
                        Super Seller : 
                    </div>
                </div>
                <div>
                    Yes
                </div>
            </div>
            <hr />
            <div className="total text-xl flex justify-between px-5 py-2">
                <div className='min-w-[200px] flex items-center'>
                    <img className='w-[20px] h-[20px]'  src="/dashboardassets/box.png" alt="fb" />
                    <div className='px-1'>
                        Total Products : 
                    </div>
                </div>
                <div>
                    1250
                </div>
            </div>
            <hr />

            <div className="social flex justify-end p-5">
                <div className='facebook m-2'>
                    <a href="#">
                        <img className='w-[50px]' src="/dashboardassets/facebook.png" alt="fb" />
                    </a>
                </div>
                <div className='twitter m-2'>
                    <a href="#">
                        <img className='w-[50px]' src="/dashboardassets/twitter.png" alt="twitter" />
                    </a>
                </div>
                <div className='twitter m-2'>
                    <a href="#">
                        <img className='w-[50px]' src="/dashboardassets/telegram.png" alt="twitter" />
                    </a>
                </div>
            </div>

        </div>
    )
}


const ProductReviews = () => {
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

const Review = () => {
    return (
        <div className={styles.review}>
            <div className={styles.ReviewProfileDetails}>
                <div className={styles.ReviewProfileImageArea}>
                    <img src="/dashboardassets/d.jpg" alt="star" />
                </div>
                <div className="ProfileNames flex flex-col justify-center">
                    <div className="font-bold max-w-[400px]">
                        Lorem ipsum dolor sit !
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
    const [total, setTotal] = useState(0.00)
    const [logged, setLogged] = useState(true)
    return (
        <div className={`${styles.BuyNowProductBuyArea} ${logged ? "max-h-[450px]" : "max-h-[250px]"}`}>

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

            <div className={`${styles.BuyNowBtnArea} p-5 `}>
                <Link to='/login' className={`btn btn-primary min-w-[320px] ${logged ? "hidden" : ""}`}>Login</Link>

                <input onChange={event => setTotal(event.target.value * 4.5)} placeholder='Quantity' type="text" className={`input grow input-bordered rounded-none ${logged ? '' : 'hidden'}`} />
                <div className={`btn btn-success grow ${logged ? "" : "hidden"}`}>Buy Now</div>
            </div>

            <div className={`${styles.ProductPrice} ${logged ? "" : "hidden"}`}>

                <div className={`text-center text-xl font-light p-2 flex items-center justify-center `}>
                    <img className='w-[25px]' src="/dashboardassets/money.png" alt="" />
                    <div className='ml-2'>
                        Total Price
                    </div>
                </div>
                <div className={`text-center font-light flex items-center justify-center`}>
                    <div className='text-4xl text-info overflow-hidden'>
                        ${total.toFixed(2)}
                    </div>
                </div>
            </div>
        </div>
    )

}

