import { memo, useEffect, useState } from 'react';
import styles from './styles/Purchase.module.css'
import { axiosInstanceJWT, convertToFourDigits } from '../AxiosHeaders';
import LoadingArea from '../GlobalTemplates/LoadingArea';
import { EmptyMessage } from '../home/templates/Error';

const Purchase = (props) => {
    const [purchaseData,setPurchaseData] = useState([])

    useEffect(()=>{
        const timer = setTimeout(() => {
            const getPurchaseData = async ()=>{
                try {
                    const response = await axiosInstanceJWT.get(`/api/orders-dashboard/`);
                    return response
                  } catch (error) {
                    return error
                  }
               }
               const data = getPurchaseData()
        
               data.then(data=>{
                    if(data.status === 200){
                        setPurchaseData(data.data)
                    }
               })
        }, 2000);

        return (()=>clearTimeout(timer))
    },[])
    return (
        <>
            <section className={`${styles.PurchaseHistorySection} `}>
            <div className={styles.PurchaseDetailsArea}>
                    <div className="balance flex flex-col items-center text-primary justify-center">
                        <h1 className='text-4xl'>{purchaseData.total_purchased===undefined?<LoadingArea /> : `$${convertToFourDigits(purchaseData.total_purchased)}`}</h1>
                        <div className="text-lg">Total Spent</div>
                    </div>
                    <div className="escrowBalance flex flex-col items-center text-info justify-center">
                        <h1 className='text-4xl'>{purchaseData.pending_orders===undefined?<LoadingArea /> : `${convertToFourDigits(purchaseData.pending_orders)}`}</h1>
                        <div className="text-lg">Pending Purchases</div>
                    </div>
                    <div className="totalDeposit flex flex-col items-center text-success justify-center">

                        <h1 className='text-4xl'>{purchaseData.complete_orders===undefined?<LoadingArea /> : `${convertToFourDigits(purchaseData.complete_orders)}`}</h1>
                        <div className="text-lg">Complete Purchases</div>
                    </div>
                    <div className="totalPurchase flex flex-col items-center text-error justify-center">

                        <h1 className='text-4xl'>{purchaseData.failed_orders===undefined?<LoadingArea /> : `${convertToFourDigits(purchaseData.failed_orders)}`}</h1>
                        <div className="text-lg">Failed Purchases</div>
                    </div>
                </div>
                
                <div className={styles.PurchaseHistoryArea}>
                    <PurchaseHistory />
                </div>
                <div className={styles.SalesBalanceHistory}>
                    <BalanceHistory />
                </div>

            </section>
        </>
    )
};

const PurchaseHistory = () => {
    return (

        <div className={styles.PurchaseHistory}>
            <div className='flex items-center justify-between pr-5'>
                <h1 className="text-2xl p-5">Purchase History</h1>
                <select className="select select-bordered rounded-none">
                    <option selected disabled>Filter</option>
                    <option>Pending</option>
                    <option>Completed</option>
                    <option>Failed</option>
               
                </select>
            </div>
            <hr />
            
            <div className={styles.PurchaseHistoryArea}>

                <ul className={styles.PurchaseList}>
                    <li className={`${styles.Purchase} p-5 pb-0`}>
                    <div className="font-bold w-[100px] min-w-[70px]">ID</div> 
                        <div className='font-bold w-[120px] min-w-[120px]'>Title</div>
                        <div className="font-bold w-[100px] min-w-[80px]">Date</div>
                        <div className="font-bold w-[100px] min-w-[100px]">Product</div>
                        <div className="font-bold w-[100px] min-w-[50px]">QTY</div> 
                        <div className="font-bold w-[120px] min-w-[120px]">Price</div>
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
                        <div className=" w-[120px] min-w-[120px]">
                            $10000000.99
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

const BalanceHistory = () => {
    const [url,setUrl] = useState("/api/balancehistory/?transaction_direction=IN")

    const [prevUrl,setPrevUrl] = useState(null)
    const [nextUrl,setNextUrl] = useState(null)

    const [transactions,setTransactions] = useState([])
    const [totalTransactions,setTotalTransactions] = useState(-1)
    const [fetched,setFetched] = useState(false)

    const handlePrevBtn = (event)=>{
        if(prevUrl===null){
            return
        }
        setTransactions([])
        setUrl(prevUrl)
    }
    const handleNextBtn = (event)=>{
        if(nextUrl===null){
            return
        }
        setTransactions([])
        setUrl(nextUrl)
    }
    useEffect(()=>{
        setFetched(false)
        const timer =setTimeout(() => {
            const getTransactions = async ()=>{
                try{
                    const response = axiosInstanceJWT(url)
                    return response
                }catch(error){
                    return error
                }
            }
            const data = getTransactions()
            data.then(data=>{
                if(data.status === 200){
                    setTotalTransactions(data.data.count)
                    setTransactions(data.data.results);
                    setPrevUrl(data.data.previous)
                    setNextUrl(data.data.next)
                    setFetched(true)
                }
            }).catch(err=>{
                if(err.response.status===401){
                    console.log("Authentication Error.");
                }
            })
        }, 2000);
        return (()=>clearTimeout(timer))
    },[url])

    return (
        <div className={styles.BalanceHistory}>
            <div className='flex items-center justify-between pr-5'>
                <h1 className="text-2xl p-5">Balance History</h1>
            </div>
            <div className={styles.BalanceHistoryArea}>

                <ul className={styles.BalanceList}>
                    <li className={`${styles.Balance} p-5 pb-0`}>
                        <div className="font-bold w-[100px] min-w-[100px]">Transfer ID</div>
                        <div className="font-bold w-[100px] min-w-[100px]">Order ID</div> 
                        <div className="font-bold w-[100px] min-w-[100px]">Type</div>
                        <div className="font-bold w-[100px] min-w-[100px]">Amount</div>
                        <div className="font-bold w-[100px] min-w-[100px]">Last Blance</div>
                    </li>
                    <hr />
                    {fetched ? (
                        transactions.length > 0 ?
                        transactions.map(transaction=>{
                            return <BalanceCard
                                key = {transaction.id}
                                id = {transaction.id}
                                order = {transaction.order}
                                amount = {transaction.amount}
                                last_balance = {transaction.last_balance}
                            />
                        }):<EmptyMessage message = {"No transactions found."}/>
                    ):<LoadingArea />}
                </ul>
                <div className={`flex justify-center p-5 ${totalTransactions > 8 ?"":"hidden"}`}>
                    <button onClick={handlePrevBtn} className={`btn btn-primary w-[150px] ${prevUrl===null?"pointer-events-none":""}`}>Previous</button>
                    <button onClick={handleNextBtn} className={`btn btn-primary w-[150px] ml-5 ${nextUrl===null?"pointer-events-none":""}`}>Next</button>
                </div>
            </div>

        </div>
    )
}

const BalanceCard = (props) => {
    return (
        <>
            <li className={`${styles.Balance} p-5 pt-0 pb-0 font-light`}>
                    <div className="w-[100px] min-w-[100px]">{props.id}</div>
                    <div className="w-[100px] min-w-[100px]">{props.order}</div> 
                    <div className="w-[100px] min-w-[100px]">Marketplace</div>
                    <div className="w-[100px] min-w-[100px] text-error">-{props.amount}$</div>
                    <div className="w-[100px] min-w-[100px] text-error">${props.last_balance}</div>
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