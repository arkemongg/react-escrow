import { memo, useState } from 'react';
import styles from './styles/Sales.module.css'

const Sales = (props) => {
    return (
        <>
            <section className={`${styles.SalesHistorySection} `}>
                
                <div className={styles.SalesDetailsArea}>
                    <div className="balance flex flex-col items-center text-primary justify-center">
                        <h1 className='text-4xl'>$0000</h1>
                        <div className="text-lg">Total Earnings</div>
                    </div>
                    <div className="escrowBalance flex flex-col items-center text-info justify-center">
                        <h1 className='text-4xl'>0000</h1>
                        <div className="text-lg">Pending Sales</div>
                    </div>
                    <div className="totalDeposit flex flex-col items-center text-success justify-center">
                        <h1 className='text-4xl'>0000</h1>
                        <div className="text-lg">Complete Sales</div>
                    </div>
                    <div className="totalPurchase flex flex-col items-center text-error justify-center">
                        <h1 className='text-4xl'>0000</h1>
                        <div className="text-lg">Failed Sales</div>
                    </div>
                </div>
                
                <div className={styles.SalesHistoryArea}>
                    <SalesHistory />
                </div>

            </section>
        </>
    )
};

const SalesHistory = () => {
    return (
        <div className={styles.SalesHistory}>
            <div className='flex items-center justify-between pr-5'>
                <h1 className="text-2xl p-5">Sales History</h1>
                <select className="select select-bordered rounded-none">
                    <option selected disabled>Filter</option>
                    <option>Pending</option>
                    <option>Completed</option>
                    <option>Failed</option>
               
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


export default memo(Sales);


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