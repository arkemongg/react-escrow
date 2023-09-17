import { memo, useState } from 'react';
import styles from './styles/Purchase.module.css'

const Purchase = (props) => {
    return (
        <>
            <section className={`${styles.DepositSection} `}>
                <div className={styles.DepositArea}>
                    <h1 className="text-4xl p-5">Purchase History</h1>
                    <hr />
                    <DepositHistory />
                </div>

                
            </section>
        </>
    )
};

const DepositHistory = () => {
    return (
        <div className={styles.DepositHistory}>
            <div className={styles.DepositHistoryArea}>

                <ul className={styles.DepositsList}>
                    <li className={`${styles.Deposits} p-5 pb-0`}>
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
                    <Transaction status={"failed"} />
                    <Transaction status={"complete"} paymenturl={"-"} />
                    <Transaction status={"failed"} />
                    <Transaction status={"pending"} paymenturl={"-"} />
                    <Transaction status={"failed"} />
                    <Transaction status={"complete"} />
                    <Transaction status={"failed"} paymenturl={"-"}/>
                    <Transaction status={"pending"} />
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


const Transaction = (props) => {
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
            <li className={`${styles.Deposits} p-5 pt-0 pb-0 font-light`}>
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
                        <div className=" w-[100px] min-w-[120px]">Seller Details</div>
            </li>
            
        </>
    )
}