import { memo, useState } from 'react';
import styles from './styles/Purchase.module.css'

const Purchase = (props) => {
    return (
        <>
            <section className={`${styles.PurchaseHistorySection} `}>
                <div className={styles.PurchaseHistoryArea}>
                    <PurchaseHistory />
                </div>

            </section>
        </>
    )
};

const PurchaseHistory = () => {
    return (
        <div className={styles.PurchaseHistory}>
            <h1 className="text-4xl p-5">Purchase History</h1>
            <hr />
            <div className={styles.PurchaseHistoryArea}>

                <ul className={styles.PurchaseList}>
                    <li className={`${styles.Purchase} p-5 pb-0`}>
                    <div className="font-bold w-[100px] min-w-[70px]">ID</div> 
                        <div className='font-bold w-[120px] min-w-[120px]'>Title</div>
                        <div className="font-bold w-[100px] min-w-[80px]">Date</div>
                        <div className="font-bold w-[100px] min-w-[100px]">Product</div>
                        <div className="font-bold w-[100px] min-w-[50px]">QTY</div> 
                        <div className="font-bold w-[180px] min-w-[120px]">Order Status</div>
                        <div className="font-bold w-[180px] min-w-[120px]">Escrow Status</div>
                        <div className="font-bold w-[100px] min-w-[80px]">Total</div>
                        <div className="font-bold w-[100px] min-w-[120px]">Review</div>
                        <div className="font-bold w-[100px] min-w-[120px]">Seller Details</div>
                    </li>
                    <hr />
                    <PurchaseCard status={"failed"} props={["ark","emon"]} />
                    <PurchaseCard status={"complete"} paymenturl={"-"} />
                    <PurchaseCard status={"failed"} />
                    <PurchaseCard status={"pending"} paymenturl={"-"} />
                    <PurchaseCard status={"failed"} />
                    <PurchaseCard status={"complete"} />
                    <PurchaseCard status={"failed"} paymenturl={"-"}/>
                    <PurchaseCard status={"pending"} />
                </ul>
                <div className="DepositHistoryBtn flex justify-center p-5">
                    <button className='btn btn-primary w-[150px]'>Previous</button>
                    <button className='btn btn-primary w-[150px] ml-5'>Next</button>
                </div>
            </div>

        </div>
    )
}


export default memo(Purchase);


const PurchaseCard = (props) => {
    
    const pending = <div className='bg-warning text-sm text-white w-[100px] rounded text-center'> Pending </div>
    const complete = <div className='bg-success text-sm text-white w-[100px] rounded text-center'> Complete </div>
    const failed = <div className='bg-error text-sm text-white w-[100px] rounded text-center'> Failed </div>
    
    const escrow_pending = <button className='bg-primary text-xs py-2 text-white w-[110px] rounded'> Mark As Complete </button>
    const escrow_complete = <div className='bg-success text-sm text-white w-[100px]  rounded text-center'>Complete </div>
    const escrow_failed = <div className='bg-error text-sm text-white w-[100px] rounded text-center'>Failed </div>
    
    const review_pending = <button className='bg-primary text-sm text-white w-[100px] py-1  rounded text-center'> Write A Review </button>
    const review_complete = <div className='bg-success text-sm text-white w-[100px]  rounded text-center'> 5* </div>
    const review_failed = <div className=''> - </div>
    
    let status = pending
    let escrow = escrow_pending
    let review = review_pending

    if (props.status === "failed") {
        status = failed
        escrow = escrow_failed
        review = review_failed
    } else if (props.status === "complete") {
        status = complete
        escrow = escrow_complete
        review = review_complete
    }

    return (
        <>
            <li className={`${styles.Purchase} p-5 pt-0 pb-0 font-light`}>
                        <div className="w-[100px] min-w-[70px]">100000</div>
                        <div className='w-[120px] min-w-[120px]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero, id?</div>
                        <div className="w-[100px] min-w-[80px]">12/10/15</div> 
                        <div className="w-[100px] min-w-[100px] max-h-[80px]">
                            <img src="/dashboardassets/d.jpg" alt="" />
                        </div>
                        <div className=" w-[100px] min-w-[50px]">5000</div> 
                        <div className=" w-[180px] min-w-[120px]">
                            {status}
                        </div>
                        <div className=" w-[180px] min-w-[120px]">
                            {escrow}
                        </div>
                        <div className=" w-[100px] min-w-[80px]">$50000.00</div>
                        <div className=" w-[100px] min-w-[120px]">
                        {review}
                        </div>
                        <div className=" w-[100px] min-w-[120px]">
                            <button className='bg-primary text-sm text-white w-[100px] py-1  rounded text-center'> Contact Seller </button>
                        </div>
            </li>
            
        </>
    )
}

{/*const PurchaseHistory = () => {
    return (
        <div className={styles.PurchaseHistoryArea}>
            <h1 className="text-4xl p-5">Purchase History</h1>
            <hr />
            <div className={styles.PurchaseHistory}>

                <div className={styles.orderCard}>
                    <div className="imageArea w-[100%] h-[200px] overflow-hidden">
                        <img src="/dashboardassets/d.jpg" alt="" />
                    </div>
                    
                    <div className={`${styles.orderAndProdctBtn} text-center bg-info m-1 text-xl font-bold`}>
                        <button onClick={(event) => handleClick(event, 1)} className={`p-2 ${btnSelected===1?'text-primary underline':'text-white'} `} >
                            Order Details
                        </button>

                        <button onClick={(event) => handleClick(event, 2)} className={`p-2 ${btnSelected===2?'text-primary underline':'text-white'}`}>
                            Products Details
                        </button>
                    </div>
                    {btnSelected===1 ? <OrderDetails />:""}
                    {btnSelected===2 ? <ProductDetails />:""}
                    
                    
                    
                    
                    <div className='orderId flex justify-between p-2 font-light bg-info text-white rounded w-[98%] m-auto'>
                        <div>ORDER ID: 1000</div>
                        <div>Date : 12/10/20</div>
                    </div>
                    <h1 className="text-center font-bold">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, quam.</h1>
                    <div className='orderId flex justify-between p-2 font-light bg-success text-white rounded w-[98%] m-auto'>
                        <div>QTY: 1000</div>
                        <div>Price :  $50000.99</div>
                    </div>
                    <div className='orderId flex justify-between p-2 mt-2 mb-2 font-light bg-success text-white rounded w-[98%] m-auto'>
                        <div>Order Status: Failed</div>
                        <div>Total :  $50000.99</div>
                    </div> 
                </div>
                <OrderCard status = {"complete"}/>
                <OrderCard  status = {"failed"}/>
                <OrderCard  status = {"pending"}/>
                <OrderCard  status = {"complete"}/>
                <OrderCard  status = {"failed"}/>
                <OrderCard  status = {"pending"}/>

            </div>
        </div>
    )
}

const OrderDetails = (props)=>{
    
    return (
        <>
            <div className='flex justify-between w-[90%] m-auto my-2 items-center'>
                <h1 className='text-2xl'>ORDER ID</h1>
                <h1>1</h1>
            </div>
            <hr />
            <div className='flex justify-between w-[90%] m-auto my-2 items-center'>
                <h1 className='text-2xl'>Date</h1>
                <h1>12/10/10</h1>
            </div>
            <hr />
            <div className='flex justify-between w-[90%] m-auto my-2 items-center'>
                <h1 className='text-2xl '>Order Status</h1>
                <p>
                    {props.status}
                </p>
            </div>
            <hr />
            <div className='flex justify-between w-[90%] m-auto my-2 items-center'>
                <h1 className='text-2xl'>Escrow Status</h1>
                <p>
                    <button className='bg-primary text-xs py-2 text-white w-[110px] rounded'> Mark As Complete </button>
                </p>
            </div>
            <hr />
            <div className='flex justify-between w-[90%] m-auto my-2 items-center'>
                <h1 className='text-2xl'>Review</h1>
                <p className='font-light'>
                <button className='bg-primary text-sm text-white w-[100px] py-1  rounded text-center'> Write A Review </button>
                </p>
            </div>
        </>
    )
}

const ProductDetails = ()=>{
    return (
        <>
            <div className='flex justify-between w-[90%] m-auto my-2 max-h-[50px] overflow-hidden'>
                <h1 className='text-2xl min-w-[150px] mt-3'>Title</h1>
                <h1>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Et, porro.</h1>
            </div>
            <hr />
            <div className='flex justify-between w-[90%] m-auto my-2 items-center'>
                <h1 className='text-2xl'>Price</h1>
                <h1>$10</h1>
            </div>
            <hr />
            <div className='flex justify-between w-[90%] m-auto my-2 items-center'>
                <h1 className='text-2xl '>QTY</h1>
                <p>
                    100
                </p>
            </div>
            <hr />
            <div className='flex justify-between w-[90%] m-auto my-2 items-center'>
                <h1 className='text-2xl'>Total</h1>
                <p className='font-bold text-primary'>
                    $1000
                </p>
            </div>
            <hr />
            <div className='flex justify-between w-[90%] m-auto my-2 items-center'>
                <h1 className='text-2xl'>Seller</h1>
                <p className='font-light'>
                <button className='bg-primary text-sm text-white w-[100px] py-1  rounded text-center'> Contact Seller </button>
                </p>
            </div>

        </>
    )
}

const OrderCard = (props)=>{
    const pending = <div className='bg-warning text-sm text-white w-[100px] rounded text-center'> Pending </div>
    const complete = <div className='bg-success text-sm text-white w-[100px] rounded text-center'> Complete </div>
    const failed = <div className='bg-error text-sm text-white w-[100px] rounded text-center'> Failed </div>
    
    const escrow_pending = <button className='bg-primary text-xs py-2 text-white w-[110px] rounded'> Mark As Complete </button>
    const escrow_complete = <div className='bg-success text-sm text-white w-[100px]  rounded text-center'>Complete </div>
    const escrow_failed = <div className='bg-error text-sm text-white w-[100px] rounded text-center'>Failed </div>
    
    const review_pending = <button className='bg-primary text-sm text-white w-[100px] py-1  rounded text-center'> Write A Review </button>
    const review_complete = <div className='bg-success text-sm text-white w-[100px]  rounded text-center'> 5* </div>
    const review_failed = <div className=''> - </div>
    
    let status = pending
    let escrow = escrow_pending
    let review = review_pending

    if (props.status === "failed") {
        status = failed
        escrow = escrow_failed
        review = review_failed
    } else if (props.status === "complete") {
        status = complete
        escrow = escrow_complete
        review = review_complete
    }

    const [btnSelected , setBtnSelected] = useState(1)
    const handleClick = (event,index)=>{
        setBtnSelected(index)
    }
    return(
        <div className={`${styles.orderCard}  ${props.status=="complete"?styles.complete:""}  ${props.status=="failed"?styles.failed:""}`}>
                    <div className="imageArea w-[100%] h-[200px] overflow-hidden">
                        <img src="/dashboardassets/d.jpg" alt="" />
                    </div>
                    
                    <div className={`${styles.orderAndProdctBtn} text-center bg-[#1D1678] m-1 text-xl font-bold rounded`}>
                        <button onClick={(event) => handleClick(event, 1)} className={`p-2 ${btnSelected===1?'text-white underline':'text-white'} `} >
                            Order Details
                        </button>

                        <button onClick={(event) => handleClick(event, 2)} className={`p-2 ${btnSelected===2?'text-white underline':'text-white'}`}>
                            Products Details
                        </button>
                    </div>
                    {btnSelected===1 ? <OrderDetails status = {status} />:""}
                    {btnSelected===2 ? <ProductDetails />:""}
                    
                    
                    
                    
                    {/* <div className='orderId flex justify-between p-2 font-light bg-info text-white rounded w-[98%] m-auto'>
                        <div>ORDER ID: 1000</div>
                        <div>Date : 12/10/20</div>
                    </div>
                    <h1 className="text-center font-bold">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Blanditiis, quam.</h1>
                    <div className='orderId flex justify-between p-2 font-light bg-success text-white rounded w-[98%] m-auto'>
                        <div>QTY: 1000</div>
                        <div>Price :  $50000.99</div>
                    </div>
                    <div className='orderId flex justify-between p-2 mt-2 mb-2 font-light bg-success text-white rounded w-[98%] m-auto'>
                        <div>Order Status: Failed</div>
                        <div>Total :  $50000.99</div>
                    </div> 
                </div>
    )
}
*/}