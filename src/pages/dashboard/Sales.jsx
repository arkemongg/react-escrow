import { memo, useEffect, useState } from 'react';
import styles from './styles/Sales.module.css'
import { AxiosInstanceJWT,convertToFourDigits } from '../AxiosHeaders';
import LoadingArea from '../GlobalTemplates/LoadingArea';
import { EmptyMessage } from '../home/templates/Error';



const Sales = (props) => {
    const axiosInstanceJWT = AxiosInstanceJWT()

    const [salesData,setSalesData] = useState([])

    useEffect(()=>{
        const timer = setTimeout(() => {
            const getSalesData = async ()=>{
                try {
                    const response = await axiosInstanceJWT.get(`/api/sales-dashboard/`);
                    return response
                  } catch (error) {
                    return error
                  }
               }
               const data = getSalesData()
        
               data.then(data=>{
                    if(data.status === 200){
                        setSalesData(data.data)
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
    return (
        <div className={styles.SalesHistory}>
            <div className='flex items-center justify-between pr-5'>
                <h1 className="text-2xl p-5">Sales History</h1>
                <select className="select select-bordered rounded-none">
                    <option defaultValue={"Filter"} disabled>Filter</option>
                    <option value={"pending"}>Pending</option>
                    <option value={"Completed"} >Completed</option>
                    <option value={"Failed"}>Failed</option>
               
                </select>
            </div>
            <div className={styles.SalesHistoryArea}>

                <ul className={styles.SalesList}>
                    <li className={`${styles.Sales} p-5 pb-0`}>
                    <div className="font-bold w-[100px] min-w-[70px]">ID</div> 
                        <div className='font-bold w-[120px] min-w-[120px]'>Title</div>
                        <div className="font-bold w-[100px] min-w-[80px]">Date</div>
                        <div className="font-bold w-[100px] min-w-[100px]">Product</div>
                        <div className="font-bold w-[100px] min-w-[50px]">QTY</div> 
                        <div className="font-bold w-[80px] min-w-[80px]">Price</div>
                        <div className="font-bold w-[180px] min-w-[120px]">Escrow Status</div>
                        <div className="font-bold w-[100px] min-w-[80px]">Total</div>
                        <div className="font-bold w-[100px] min-w-[120px]">Review</div>
                        <div className="font-bold w-[100px] min-w-[120px]">Shipping Details </div>
                    </li>
                    <hr />
                    <SalesCard status={"failed"} />
                    <SalesCard status={"complete"}  />
                    <SalesCard status={"failed"} />
                    <SalesCard status={"pending"}  />
                    <SalesCard status={"failed"} />
                    <SalesCard status={"complete"} />
                    <SalesCard status={"failed"} />
                    <SalesCard status={"pending"} />
                </ul>
                <div className="SalesHistoryBtn flex justify-center p-5">
                    <button className='btn btn-primary w-[150px]'>Previous</button>
                    <button className='btn btn-primary w-[150px] ml-5'>Next</button>
                </div>
            </div>

        </div>
    )
}


const SalesCard = (props) => {
    
    const pending = <div className='bg-warning text-sm text-white w-[100px] rounded text-center'> Pending </div>
    const complete = <div className='bg-success text-sm text-white w-[100px] rounded text-center'> Complete </div>
    const failed = <div className='bg-error text-sm text-white w-[100px] rounded text-center'> Failed </div>
    
    const escrow_pending = <div className='bg-warning text-sm text-white w-[100px] rounded text-center'> Pending </div>
    const escrow_complete = <div className='bg-success text-sm text-white w-[100px]  rounded text-center'>Complete </div>
    const escrow_failed = <div className='bg-error text-sm text-white w-[100px] rounded text-center'>Failed </div>
    
    const review_pending = <div className=''> - </div>
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
            <li className={`${styles.Sales} p-5 pt-0 pb-0 font-light`}>
                        <div className="w-[100px] min-w-[70px]">100000</div>
                        <div className='w-[120px] min-w-[120px]'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Libero, id?</div>
                        <div className="w-[100px] min-w-[80px]">12/10/15</div> 
                        <div className="w-[100px] min-w-[100px] max-h-[80px]">
                            <img src="/dashboardassets/d.jpg" alt="" />
                        </div>
                        <div className=" w-[100px] min-w-[50px]">5000</div> 
                        <div className="w-[80px] min-w-[80px]">
                            $50000.99
                        </div>
                        <div className=" w-[180px] min-w-[120px]">
                            {escrow}
                        </div>
                        <div className=" w-[100px] min-w-[80px]">$50000.00</div>
                        <div className=" w-[100px] min-w-[120px]">
                        {review}
                        </div>
                        <div className=" w-[100px] min-w-[120px]">
                        <button className='bg-primary text-sm text-white w-[100px] py-1  rounded text-center'> Click to see details </button>
                        </div>
            </li>
            
        </>
    )
}


const BalanceHistory = () => {
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
                        <div className="font-bold w-[100px] min-w-[100px]">Sales ID</div> 
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
                    <div className="w-[100px] min-w-[100px] text-success">+{props.amount}</div>
                    <div className="w-[100px] min-w-[100px] text-success">${props.last_balance}</div>
            </li>
            
        </>
    )
}