import { memo, useEffect, useState } from 'react';
import styles from './styles/Sales.module.css'
import { AxiosInstanceJWT,convertDatetimeToDate,convertToFourDigits } from '../AxiosHeaders';
import LoadingArea from '../GlobalTemplates/LoadingArea';
import { EmptyMessage } from '../home/templates/Error';
import { useAuth } from '../../AuthContext';
import { Link } from 'react-router-dom';
import { apiUrl } from '../Urls';



const Sales = (props) => {
    const { logout } = useAuth();
    const axiosInstanceJWT = AxiosInstanceJWT()

    const [salesData,setSalesData] = useState([])

    useEffect(()=>{
        const timer = setTimeout(() => {
            const getSalesData = async ()=>{
                try {
                    const response = await axiosInstanceJWT.get(`/api/sales-dashboard/`);
                    return response
                  } catch (error) {
                    throw error
                  }
               }
               const data = getSalesData()
        
               data.then(data=>{
                    if(data.status === 200){
                        setSalesData(data.data)
                    }
               }).catch(err=>{
                if (err.response) {
                    if (err.response.status === 401) {
                        logout();
                    }
                }
               })
        }, 2000);

        return (()=>clearTimeout(timer))
    },[])
    
    return (
        <>
            <section className={`${styles.SalesHistorySection} `}>
                
                <div className={styles.SalesDetailsArea}>
                    <div className="balance flex flex-col items-center text-primary justify-center">
                        <h1 className='text-4xl'>{salesData.total_earnings===undefined?<LoadingArea /> : `$${convertToFourDigits(salesData.total_earnings)}`}</h1>
                        <div className="text-lg">Total Earnings</div>
                    </div>
                    <div className="escrowBalance flex flex-col items-center text-info justify-center">
                        <h1 className='text-4xl'>{salesData.pending_sales===undefined?<LoadingArea /> : `${convertToFourDigits(salesData.pending_sales)}`}</h1>
                        <div className="text-lg">Pending Sales</div>
                    </div>
                    <div className="totalDeposit flex flex-col items-center text-success justify-center">
                        
                        <h1 className='text-4xl'>{salesData.complete_sales===undefined?<LoadingArea /> : `${convertToFourDigits(salesData.complete_sales)}`}</h1>
                        <div className="text-lg">Complete Sales</div>
                    </div>
                    <div className="totalPurchase flex flex-col items-center text-error justify-center">
                        
                        <h1 className='text-4xl'>{salesData.failed_sales===undefined?<LoadingArea /> : `${convertToFourDigits(salesData.failed_sales)}`}</h1>
                        <div className="text-lg">Failed Sales</div>
                    </div>
                </div>
                
                <div className={styles.SalesHistoryArea}>
                    <SalesHistory />
                </div>
                <div className={styles.SalesBalanceHistory}>
                    <BalanceHistory />
                </div>

            </section>
        </>
    )
};




export default memo(Sales);

const SalesHistory = () => {

    const { logout } = useAuth();
    const axiosInstanceJWT = AxiosInstanceJWT()
    const [url, setUrl] = useState("/api/sales/")

    const [prevUrl, setPrevUrl] = useState(null)
    const [nextUrl, setNextUrl] = useState(null)

    const [sales, setSales] = useState([])
    const [totalSales, setTotalSales] = useState(-1)
    const [fetched, setFetched] = useState(false)

    const handlePrevBtn = (event) => {
        if (prevUrl === null) {
            return
        }
        setSales([])
        setUrl(prevUrl)
    }
    const handleFilter = (event)=>{
        
        if(event.target.value==="none"){
            setUrl("/api/sales/")
        }else{
            setUrl(`/api/sales/?order_status=${event.target.value}`)
        }
        
    }
    const handleNextBtn = (event) => {
        if (nextUrl === null) {
            return
        }
        setSales([])
        setUrl(nextUrl)
    }
    useEffect(() => {
        setFetched(false)
        const timer = setTimeout(() => {
            const getPurchasecHistory = async () => {
                try {
                    const response = await axiosInstanceJWT(url)
                    return response
                } catch (error) {
                    throw error
                }
            }
            const data = getPurchasecHistory()
            data.then(data => {
                console.log(data);
                if (data.status === 200) {
                    setTotalSales(data.data.count)
                    setSales(data.data.results);
                    setPrevUrl(data.data.previous)
                    setNextUrl(data.data.next)
                    setFetched(true)
                }
            }).catch(err => {
                if (err.response) {
                    if (err.response.status === 401) {
                        logout()
                    }
                } 
            })
        }, 2000);
        return (() => clearTimeout(timer))
    }, [url])

    return (
        <div className={styles.SalesHistory}>
            <div className='flex items-center justify-between pr-5'>
                <h1 className="text-2xl p-5">Sales History</h1>
                <select onChange={handleFilter} defaultValue={"filter"} className="select select-bordered rounded-none">
                    <option value="filter" disabled>Filter</option>
                    <option value="none">Clear Filter</option>
                    <option value="P">Pending</option>
                    <option value="C">Complete</option>
                    <option value="F">Failed</option>
                </select>
            </div>
            <div className={styles.SalesHistoryArea}>

                <ul className={styles.SalesList}>
                    <li className={`${styles.Sales} p-5 pb-0`}>
                    <div className="font-bold w-[100px] min-w-[70px]">ID</div> 
                        <div className='font-bold w-[120px] min-w-[120px]'>Title</div>
                        <div className="font-bold w-[120px] min-w-[120px]">Date</div>
                        <div className="font-bold w-[100px] min-w-[100px]">Product</div>
                        <div className="font-bold w-[100px] min-w-[50px]">QTY</div> 
                        <div className="font-bold w-[80px] min-w-[80px]">Price</div>
                        <div className="font-bold w-[180px] min-w-[120px]">Escrow Status</div>
                        <div className="font-bold w-[100px] min-w-[80px]">Total</div>
                        <div className="font-bold w-[100px] min-w-[120px]">Review ID</div>
                        <div className="font-bold w-[100px] min-w-[120px]">Shipping Details </div>
                    </li>
                    <hr />
                    {fetched ? (
                        sales.length > 0 ?
                            sales.map(sale => {
                                
                                return <SalesCard 
                                    key={sale.id}
                                    id={sale.id}
                                    status={sale.order_status}
                                    title={sale.orderitems[0].product_title}
                                    date={sale.created_at}
                                    img={sale.orderitems[0].product_img}
                                    price={sale.orderitems[0].unit_price}
                                    quantity={sale.orderitems[0].quantity}
                                    total={sale.total}
                                    escrow_id={sale.escrow_id}
                                    feedback={sale.feedback}
                                    seller_id={sale.seller}
                                    shipping_email = {sale.orderitems[0].shipping_email}
                                    shipping_details = {sale.orderitems[0].shipping_details}
                                />
                            }) : <EmptyMessage message={"No orders found."} />
                    ) : <LoadingArea />}
                </ul>
                <div className={`flex justify-center p-5 ${totalSales > 8 ? "" : "hidden"}`}>
                    <button onClick={handlePrevBtn} className={`btn btn-primary w-[150px] ${prevUrl === null ? "pointer-events-none" : ""}`}>Previous</button>
                    <button onClick={handleNextBtn} className={`btn btn-primary w-[150px] ml-5 ${nextUrl === null ? "pointer-events-none" : ""}`}>Next</button>
                </div>
            </div>
        </div>
    )
}


const SalesCard = (props) => {
    const [visible,setVisible] = useState(false)
    const handleShipping = ()=>{
        setVisible(true)
    }

    const escrow_pending = <div className='bg-warning text-sm text-white w-[100px] rounded text-center'> Pending </div>
    const escrow_complete = <div className='bg-success text-sm text-white w-[100px]  rounded text-center'>Complete </div>
    const escrow_failed = <div className='bg-error text-sm text-white w-[100px] rounded text-center'>Failed </div>
    
    const review_pending = <div className=''> - </div>

    let escrow = escrow_pending
    let review = review_pending

    if (props.status === "F") {
        escrow = escrow_failed
    } else if (props.status === "C") {
        escrow = escrow_complete
    }

    if(props.feedback===null){
        review = review_pending
    }else if(props.feedback.completed){
        review = <div className='bg-success text-sm text-white w-[100px]  rounded text-center'> {props.feedback.id} </div>
    }
  
    return (
        <>
            <li className={`${styles.Sales} p-5 pt-0 pb-0 font-light`}>
                        <div className="w-[100px] min-w-[70px]">{props.id}</div>
                        <div className='w-[120px] min-w-[120px]'> {props.title.length > 20 ? props.title.substring(0, 20) + "..." : props.title} </div>
                        <div className="w-[120px] min-w-[120px]">{convertDatetimeToDate(props.date)}</div> 
                        <div className="w-[100px] min-w-[100px] max-h-[80px] overflow-hidden">
                            <img className='w-[100%] object-cover' src={apiUrl + props.img} alt="productimg" />
                        </div>
                        <div className=" w-[100px] min-w-[50px]">{props.quantity}</div> 
                        <div className="w-[80px] min-w-[80px] text-primary">
                            ${props.price}
                        </div>
                        <div className=" w-[180px] min-w-[120px]">
                            {escrow}
                        </div>
                        <div className=" w-[100px] min-w-[80px] text-primary">${props.total}</div>
                        <div className=" w-[100px] min-w-[120px]">
                        {review}
                        </div>
                        <div className=" w-[100px] min-w-[120px]">
                        <button onClick={handleShipping} className='bg-primary text-sm text-white w-[100px] py-1  rounded text-center'> Click to see details </button>
                        </div>
            </li>
            <ShippingModal email = {props.shipping_email} details = {props.shipping_details}  visible={visible} setVisible={setVisible} />
        </>
    )
}

const ShippingModal = (props) => {
    
    const handle = (event) => {
        props.setVisible(false)
    }
    const renderedText = renderTextWithLineBreaks(props.details);
    return (
        <>
            <div className={`${styles.blurryBackgroundSection} ${styles.blurryBackground} ${props.visible ? "" : "hidden"} `}>
                <div className={styles.ModalArea}>
                    <button onClick={handle} className={styles.closeModal}>
                        <img src="/dashboardassets/delete.png" alt="" />
                    </button>
                    <div className="text-3xl text-center p-2">Shipping Details</div>
                    <hr />
                    <div className="text-xl text-center p-2">Email</div>
                   
                    <div className='text-sm w-[90%] m-auto text-center'>{props.email}</div>
                    <div className="text-xl text-center p-2">Details</div>
                    
                    <div className='text-sm w-[90%] m-auto text-center'>
                        {renderedText}
                    </div>
                </div>
            </div>
        </>
    )
}
function renderTextWithLineBreaks(text) {
    const lines = text.split(/\r?\n/);
    
    return lines.map((line, index) => <div key={index}>{line===""?<br/>:line}</div>);
  }


const BalanceHistory = () => {
    const { logout } = useAuth();
    const axiosInstanceJWT = AxiosInstanceJWT()
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
                    const response = await axiosInstanceJWT(url)
                    return response
                }catch(error){
                    throw error
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
                if (err.response) {
                    if (err.response.status === 401) {
                        logout();
                    }else if (err.response.status === 429) {
                        alert("Too many requests.");
                    }else {
                        alert("Unexpected error with status code: ", err.response.status);
                    }
                } else {
                    alert("No response received from the server.");
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
                        <div className="font-bold w-[100px] min-w-[100px]">Sales ID</div> 
                        <div className="font-bold w-[100px] min-w-[100px]">Type</div>
                        <div className="font-bold w-[100px] min-w-[100px]">Amount</div>
                        {/* <div className="font-bold w-[100px] min-w-[100px]">Last Blance</div> */}
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
                    <div className="w-[100px] min-w-[100px] text-success">+{props.amount}</div>
                    {/* <div className="w-[100px] min-w-[100px] text-success">${props.last_balance}</div> */}
            </li>
            
        </>
    )
}