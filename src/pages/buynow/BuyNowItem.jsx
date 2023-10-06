import { useEffect, useState } from 'react'
import { PageLocation } from '../GlobalTemplates/PageLocation'
import styles from './styles/BuyNowItem.module.css'
import { Link, useParams } from 'react-router-dom'
import { axiosInstance, convertDatetimeToDate, postJWT } from '../AxiosHeaders'
import LoadingArea from '../GlobalTemplates/LoadingArea'
import { apiUrl } from '../Urls'
import { EmptyMessage } from '../home/templates/Error'
import { useAuth } from '../../AuthContext'
import { FlaotingErrorCustom } from '../GlobalTemplates/FloatingErrorCustom'

const BuyNowItem = () => {
    //get the id from route
    let { id } = useParams();

    //data 
    const [data, setData] = useState(null)
    const [fetched, setFetched] = useState(false)
    useEffect(() => {
        setFetched(false)
        const timer = setTimeout(() => {
            const url = `/api/products/${id}/`
            const getProducts = axiosInstance.get(url)
            getProducts.then(data => {
                if (data.status === 200) {
                    //set the product data
                    setData(data.data)
                    setFetched(true)
                }
            }).catch(err => {
                //error handling
                if (err.response) {
                    if (err.response.status === 429) {
                        alert("Too many requests.")
                    } else {
                        alert("Unexpected error.")
                    }
                } else {
                    alert("No response from server.")
                }
            })
        }, 2000);

        return (() => clearTimeout(timer))
    }, [id])

    return (
        <>
            <PageLocation head={"Buy Now"} tail={`Home / ${"Buy Now"}`} />
            <section className={styles.BuyNowSection}>
                <div className={styles.BuyNowSectionWrapper}>
                    {/* Pass the data to component */}
                    <BuyNowProductArea data={data} fetched={fetched} />
                    {fetched ? <BuyNowProductBuyArea data={data} /> : ""}
                </div>
            </section>
        </>
    )
}

export default BuyNowItem



const BuyNowProductArea = (props) => {
    //assign to data from props

    // Variables
    const [title, setTitle] = useState("")
    const [img, setImg] = useState("")

    const [sales, setSales] = useState("")
    const [total_feedback, setTotal_feedback] = useState("")
    const [rating, setRating] = useState("")
    const [views, setViews] = useState("")


    // assign data to variables

    useEffect(() => {
        if (props.data !== null) {

            setTitle(props.data.title)
            setImg(apiUrl + props.data.image)
            setSales(props.data.sales)
            setTotal_feedback(props.data.seller_review.total_feedback)
            setRating(props.data.seller_review.rating)
            setViews(props.data.view_count)
        }
    }, [props.data])

    return (
        <div className={styles.BuyNowProductArea}>
            {props.fetched ? <>
                <div className='text-center p-3 pb-5 font-bold'>
                    {title}
                </div>
                <div className={styles.BuyNowProductImageArea}>
                    <img src={img} alt="" />
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
                                {sales}
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
                                {rating === null ? "0.00" : parseFloat(rating).toFixed(2)}
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
                                {views}
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h-[10px] bg-[#F1F2F7]"></div>
                <BuyNowProductsDetailsArea total_feedback={total_feedback} data={props.data} />
            </> : <LoadingArea />}
        </div>
    )

}

const BuyNowProductsDetailsArea = (props) => {
    const [SelectedDetails, setSelectedDetails] = useState("Product Details")
    const handleCLick = (event) => {
        const parent = event.target.parentElement
        const text = parent.querySelector('p').textContent

        setSelectedDetails(text)
    }
    return (
        <>
            <div className={`${styles.ProductsDetailsBtnArea} `}>
                <div onClick={handleCLick} className={`text-xl Description flex items-center ${SelectedDetails === "Product Details" ? styles.active : ""}`} >
                    <img className='w-[20px] h-[20px]' src="/dashboardassets/details.png" alt="" />
                    <p className='ml-1 title'>
                        Product Details
                    </p>
                </div>

                <div onClick={handleCLick} className={`text-xl SellerProfile flex items-center ${SelectedDetails === "Seller Profile" ? styles.active : ""}`}>
                    <img className='w-[20px] h-[20px]' src="/dashboardassets/profile.png" alt="" />
                    <p className='ml-1'>
                        Seller Profile
                    </p>

                </div>

                <div onClick={handleCLick} className={`text-xl Reviews flex items-center ${SelectedDetails === "Reviews" ? styles.active : ""}`}>
                    <img className='w-[20px] h-[20px]' src="/dashboardassets/reviews.png" alt="" />
                    <p className='ml-1'>
                        Reviews
                    </p>
                    <span className="text-sm text-primary">
                        ({props.total_feedback})
                    </span>
                </div>
            </div>
            <hr />
            {SelectedDetails === "Product Details" ? <ProductDetails data={props.data} /> : ""}
            {SelectedDetails === "Reviews" ? <ProductReviews seller_id={props.data.seller} /> : ""}
            {SelectedDetails === "Seller Profile" ? <SellerProfile seller_id={props.data.seller} /> : ""}

        </>
    )

}

const ProductDetails = (props) => {
    const [id, setID] = useState("")

    const [category, setCategory] = useState("")
    const [description, setDescription] = useState("")
    const [featured, setFeatured] = useState("")
    const [condition, setCondition] = useState("")
    const [inventory, setInventory] = useState("")

    // assign data to variables
    useEffect(() => {
        if (props.data !== null) {
            setID(props.data.id)
            setCategory(props.data.category.title)
            setInventory(props.data.inventory)
            setCondition(props.data.condition)
            setDescription(props.data.description)
            setFeatured(props.data.featured)

        }
    }, [props.data])

    return (
        <div className={`${styles.ProductDetailsArea} text-xl font-light pb-[100px]`}>

            <div className='flex justify-between p-3'>
                <div className="id min-w-[200px]">
                    Product ID :
                </div>
                <div className="id">
                    #{id}
                </div>
            </div>
            <hr />
            <div className='flex justify-between p-3'>
                <div className="category min-w-[200px]">
                    Category :
                </div>
                <div className="id">
                    {category}
                </div>
            </div>
            <hr />
            <div className='flex justify-between p-3'>
                <div className="inventory min-w-[200px]">
                    Inventory :
                </div>
                <div className="id">
                    {inventory}
                </div>
            </div>
            <hr />

            <div className='flex justify-between p-3'>
                <div className="category min-w-[200px]">
                    Featured Product :
                </div>
                <div className="id">
                    {featured ? "Yes" : "No"}
                </div>

            </div>
            <hr />

            <div className='flex justify-between p-3'>
                <div className="category min-w-[200px]">
                    Product Condition :
                </div>
                <div className="id">
                    {condition}
                </div>
            </div>
            <hr />

            <div className='p-3'>
                <div className="category min-w-[200px]">
                    Product Description:
                </div>
                <div className="description pt-1 text-sm">
                    {renderTextWithLineBreaks(description)}
                </div>
            </div>
        </div>
    )
}
function renderTextWithLineBreaks(text) {
    const lines = text.split(/\r?\n/);

    return lines.map((line, index) => <div key={index}>{line === "" ? <br /> : line}</div>);
}

const SellerProfile = (props) => {

    //data 
    const [data, setData] = useState(null)
    const [fetched, setFetched] = useState(false)
    useEffect(() => {
        setFetched(false)
        const timer = setTimeout(() => {
            const url = `/api/seller/${props.seller_id}/`
            const getSeller = axiosInstance.get(url)
            getSeller.then(data => {
                if (data.status === 200) {
                    setData(data.data)
                    setFetched(true)
                }
            }).catch(err => {
                //error handling
                if (err.response) {
                    if (err.response.status === 429) {
                        alert("Too many requests.")
                    } else {
                        alert("Unexpected error.")
                    }
                } else {
                    alert("Unexpected error.")
                }
            })
        }, 2000);

        return (() => clearTimeout(timer))
    }, [props.seller_id])

    return (
        <div className={`${styles.SellerProfileArea}`}>
            {/* Loading animation with fetched before loading seller profile */}
            {fetched ? <><div className={styles.ProfileDetails}>
                <div className={styles.ProfileImageArea}>
                    <img src={data.avatar.profile === null ? "/dashboardassets/d.jpg" : data.avatar.profile} alt="profile" />
                </div>
                <div className="ProfileNames flex flex-col justify-center">
                    <div className="font-bold max-w-[340px] m-4 mb-0 text-center">
                        {data.first_name === "" ? "No Name" : (data.first_name + " " + data.last_name)}
                    </div>
                    <div className='text-sm text-center pt-1 p-5 '>
                        <div className='font-bold'>Member Since</div>
                        <div className='font-light'> {convertDatetimeToDate(data.member_since)} </div>
                    </div>
                </div>
            </div>
                <hr />
                <div className="verified text-xl flex justify-between px-5 py-2">
                    <div className='min-w-[200px] flex items-center'>
                        <img className='w-[20px] h-[20px]' src="/dashboardassets/verified.png" alt="fb" />
                        <div className='px-1'>
                            Verified Seller :
                        </div>
                    </div>
                    <div>
                        {data.verified_user ? "Yes" : "No"}
                    </div>
                </div>
                <hr />
                <div className="super text-xl flex justify-between px-5 py-2">
                    <div className='min-w-[200px] flex items-center'>
                        <img className='w-[20px] h-[20px]' src="/dashboardassets/super.png" alt="fb" />
                        <div className='px-1'>
                            Super Seller :
                        </div>
                    </div>
                    <div>
                        {data.super_seller ? "Yes" : "No"}
                    </div>
                </div>
                <hr />
                <div className="total text-xl flex justify-between px-5 py-2">
                    <div className='min-w-[200px] flex items-center'>
                        <img className='w-[20px] h-[20px]' src="/dashboardassets/box.png" alt="fb" />
                        <div className='px-1'>
                            Total Sales :
                        </div>
                    </div>
                    <div>
                        {data.total_sales}
                    </div>
                </div>
                <hr />

                <div className="social flex justify-end p-5">
                    <div className='facebook m-2'>
                        <a target='_blank' rel="noreferrer" href={`https://facebook.com/${data.facebook}`}>
                            <img className='w-[50px]' src="/dashboardassets/facebook.png" alt="fb" />
                        </a>
                    </div>
                    <div className='twitter m-2'>
                        <a target='_blank' rel="noreferrer" href={`https://x.com/${data.twitter}`} >
                            <img className='w-[50px]' src="/dashboardassets/twitter.png" alt="twitter" />
                        </a>
                    </div>
                    <div className='telegram m-2'>
                        <a target='_blank' rel="noreferrer" href={`https://t.me/@${data.telegram}`}>
                            <img className='w-[50px]' src="/dashboardassets/telegram.png" alt="twitter" />
                        </a>
                    </div>
                </div>
            </> : <LoadingArea />}
        </div>
    )
}


const ProductReviews = (props) => {
    //data 
    const [url, setUrl] = useState(`/api/feedback/?seller__id=${props.seller_id}`)
    const [nextUrl, setNextUrl] = useState(null)
    const [prevUrl, setPrevUrl] = useState(null)

    const [data, setData] = useState([])
    const [fetched, setFetched] = useState(false)
    const [count, setCount] = useState(-1)

    const handlePrevious = () => {
        if (prevUrl === null) {
            return;
        }
        setUrl(prevUrl)
        const element = document.getElementById('buynowreview');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    const handleNext = () => {
        if (nextUrl === null) {
            return;
        }
        setUrl(nextUrl)
        const element = document.getElementById('buynowreview');
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
    }
    useEffect(() => {
        setFetched(false)
        const timer = setTimeout(() => {
            const getSeller = axiosInstance.get(url)
            getSeller.then(data => {
                if (data.status === 200) {
                    setData(data.data.results)
                    setFetched(true)
                    setCount(data.data.count)

                    //Set prev and next url
                    setPrevUrl(data.data.previous)
                    setNextUrl(data.data.next)
                }
            }).catch(err => {
                //error handling
                if (err.response) {
                    if (err.response.status === 429) {
                        alert("Too many requests.")
                    } else {
                        alert("Unexpected error.")
                    }

                } else {
                    alert("Unexpected error.")
                }

            })

        }, 2000);

        return (() => clearTimeout(timer))
    }, [url])

    return (
        <div id='buynowreview' className={`${styles.ProductReviewsArea}`}>
            <div className={styles.reviewArea}>
                {fetched ? (
                    data.length > 0 ? data.map(review => {
                        return <Review key={review.id} data={review} />
                    }) : <EmptyMessage message={"No reviews found."} />
                ) : <LoadingArea />}
            </div>
            <div className={`btnArea flex justify-center p-5 ${count > 5 ? "" : "hidden"}`}>
                <button onClick={handlePrevious} className="btn btn-primary min-w-[150px] mr-2">
                    Previous
                </button>
                <button onClick={handleNext} className="btn btn-primary min-w-[150px]">
                    Next
                </button>
            </div>
        </div>
    )
}

const Review = (props) => {
    return (
        <div className={styles.review}>
            <div className={styles.ReviewProfileDetails}>
                <div className={styles.ReviewProfileImageArea}>
                    <img src={props.data.profile === "" ? "/dashboardassets/d.jpg" : `${apiUrl}/media/${props.data.profile}`} alt="profile" />
                </div>
                <div className="ProfileNames flex flex-col justify-center">
                    <div className="font-bold max-w-[400px]">
                        {props.data.reviewer_name === "not_set" ? "Name not set" : props.data.reviewer_name}
                    </div>
                    <div className='flex font-bold text-xl items-center'>
                        <div>{props.data.rating}</div>
                        <img className='w-[20px] h-[20px]' src="/dashboardassets/star.png" alt="star" />
                    </div>
                </div>
            </div>
            <hr />
            <div className='text-sm font-light p-10'>
                {props.data.comment}
            </div>
            <hr />
        </div>
    )
}



const BuyNowProductBuyArea = (props) => {
    const [price, setPrice] = useState("")
    const [quantity, setQuantity] = useState("")
    const { isLogged, logout } = useAuth();

    const [orderId, setOrderId] = useState("")
    const [success, setSuccess] = useState(false)
    const [err, setErr] = useState(false)
    const [message, setMessage] = useState("")
    const [clicked, setClicked] = useState(false)
    // assign data to variables
    useEffect(() => {
        if (props.data !== null) {
            setPrice(props.data.price)
        }
    }, [props.data])

    const handleBuyNow = () => {
        if ( quantity <= 0) {
            setErr(true)
            setMessage("Quantity can't be smaller than 1.")
            return;
        }

        if (props.data.inventory < quantity) {
            setErr(true)
            setMessage("Quantity can't be greater than inventory.")
            return;
        }
        setClicked(true)
        setTimeout(() => {
            const postData = {
                "product_id": props.data.id,
                "quantity": quantity
            }
            const url = '/api/create-order/'

            const getOrderData = postJWT(url, postData)

            getOrderData.then(data => {
                if (data.status === 201) {
                    setSuccess(true)
                    setOrderId(data.data.id)
                } else {
                    alert("Unexpected error.")
                }
            }).catch(err => {
                setErr(true)
                if (err.response) {
                    if (err.response.status === 400) {
                        if (err.response.data.error) {
                            setMessage(err.response.data.error)
                        }
                    } else if (err.response.status === 401) {
                        logout();
                    } else if (err.response.status === 429) {
                        alert("Too many requests.");
                        setMessage("Too many requests.")
                    } else {
                        setMessage("Unexpected error.");
                    }
                } else {
                    setMessage("No response received from the server.");
                }
            })
            setClicked(false)
        }, 3000);
    }

    const [total, setTotal] = useState(0.00)

    return (<>
        {err ? <FlaotingErrorCustom err={err} setErr={setErr} message={message} /> : ""}
        <div className={`${styles.BuyNowProductBuyArea} ${isLogged ? "max-h-[450px]" : "max-h-[250px]"}`}>

            <div className={`${styles.ProductPrice}`}>

                <div className="text-center text-xl font-light p-2 flex items-center justify-center">
                    <img className='w-[30px]' src="/dashboardassets/dollar.png" alt="" />
                    <div className='ml-2'>
                        Product Price
                    </div>
                </div>
                <div className="text-center font-light flex items-center justify-center">
                    <div className='text-4xl text-primary'>
                        ${price}
                    </div>
                </div>
            </div>

            <div className={`${styles.BuyNowBtnArea} p-5 min-w-[100%]`}>
                <Link to='/login' className={`btn btn-primary min-w-[320px] ${isLogged ? "hidden" : ""}`}>Login to buy</Link>

                <input
                    onChange={event => {
                        setQuantity(event.target.value);
                        setTotal(event.target.value * price);
                    }}
                    placeholder='Quantity'
                    type="text"
                    className={`input grow input-bordered rounded-none min-w-[330px] ${isLogged ? '' : 'hidden'}`}
                />
                <div onClick={handleBuyNow} className={`btn btn-success grow min-w-[330px] ${isLogged ? "" : "hidden"}`}>
                    {clicked ? <span className="loading loading-dots loading-md"></span> : "Buy Now"}
                </div>
            </div>

            <div className={`${styles.ProductPrice} ${isLogged ? "" : "hidden"}`}>

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
        <ConfirmedModal id={orderId} success={success} setSuccess={setSuccess} />
    </>
    )

}


const ConfirmedModal = (props) => {
    const handle = (event) => {
        props.setSuccess(false)
    }
    return (
        <>
            <div className={`${styles.blurryBackgroundSection} ${styles.blurryBackground} ${props.success ? "" : "hidden"} `}>
                <div className={styles.ModalArea}>
                    <button onClick={handle} className={styles.closeModal}>
                        <img src="/dashboardassets/delete.png" alt="" />
                    </button>
                    <div className='text-xl font-bold flex justify-center items-center h-[100px]'>
                        <img className='m-1' style={{ width: "25px" }} src="/dashboardassets/success.png" alt="" /> Order successfully created.
                    </div>
                    <div className='text-xl text-center'>
                        ORDER ID #{props.id}
                    </div>
                    <div className='text-xl text-center pt-3'>
                        <Link to={'/dashboard'} className="btn btn-primary">Go to Dashboard</Link>
                    </div>
                </div>
            </div>
        </>
    )
}