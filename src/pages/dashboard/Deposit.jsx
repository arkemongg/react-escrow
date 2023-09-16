import { memo, useState } from 'react';
import styles from './styles/Deposit.module.css'

const Deposit = (props) => {
    const [amount, setAmount] = useState(0)
    const handleAmount = (event, amount) => {
        setAmount(amount)
    }
    return (
        <>
            <section className={`${styles.DepositSection} `}>
                <div className={styles.DepositArea}>
                    <h1 className="text-4xl p-5">Deposit</h1>
                    <hr />
                    <p className="text-2xl p-5 pb-0">How much credit would you like to deposit?</p>
                    <div className="preDeposit flex flex-wrap">
                        <div onClick={(event) => handleAmount(event, 10)} className={`bg-[#EFF1F5] w-[100px] p-[15px] text-center cursor-pointer m-5 ${amount == 10 ? styles.active : ""}`}>$10</div>
                        <div onClick={(event) => handleAmount(event, 20)} className={`bg-[#EFF1F5] w-[100px] p-[15px] text-center cursor-pointer m-5 ${amount == 20 ? styles.active : ""}`}>$20</div>
                        <div onClick={(event) => handleAmount(event, 50)} className={`bg-[#EFF1F5] w-[100px] p-[15px] text-center cursor-pointer m-5 ${amount == 50 ? styles.active : ""}`}>$50</div>
                        <div onClick={(event) => handleAmount(event, 100)} className={`bg-[#EFF1F5] w-[100px] p-[15px] text-center cursor-pointer m-5 ${amount == 100 ? styles.active : ""}`}>$100</div>
                        <div onClick={(event) => handleAmount(event, 250)} className={`bg-[#EFF1F5] w-[100px] p-[15px] text-center cursor-pointer m-5 ${amount == 250 ? styles.active : ""}`}>$250</div>
                        <div onClick={(event) => handleAmount(event, 500)} className={`bg-[#EFF1F5] w-[100px] p-[15px] text-center cursor-pointer m-5 ${amount == 500 ? styles.active : ""}`}>$500</div>
                    </div>

                    <div className="customDepositArea p-5">
                        <p className="text-2xl pb-5">Enter custom amount</p>
                        <input onChange={(e) => setAmount(e.target.value)} placeholder={amount} type="text" className='input input-bordered rounded-none md:w-[80%] w-[100%] bg-[#EFF1F5]' />
                    </div>
                    <div className="div flex p-5">
                        <button className='btn btn-primary w-[330px] '>Deposit</button>
                    </div>
                </div>

                <DepositHistory />
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
                        <div className="text-xl w-[100px] min-w-[100px]">Date</div>
                        <div className="text-xl w-[150px] min-w-[150px]">Transaction ID</div>
                        <div className="text-xl w-[180px] min-w-[180px]">Transaction Status</div>
                        <div className="text-xl w-[100px] min-w-[100px]">Amount</div>
                        <div className="text-xl w-[150px] min-w-[150px]">Payment URL</div>
                        <div className="text-xl w-[100px] min-w-[100px]">TX ID</div>
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


export default memo(Deposit);


const Transaction = (props) => {
    const pending = <div className='bg-warning text-sm text-white w-[100px] rounded text-center'> Pending </div>
    const complete = <div className='bg-success text-sm text-white w-[100px] rounded text-center'> Complete </div>
    const failed = <div className='bg-error text-sm text-white w-[100px] rounded text-center'> Failed </div>

    let status = pending

    if (props.status === "failed") {
        status = failed
    } else if (props.status === "complete") {
        status = complete
    }

    return (
        <>
            <li className={`${styles.Deposits} p-5 pt-0 pb-0 font-light text-xl`}>
                <div className="w-[100px] min-w-[100px]">12/25/20</div>
                <div className="w-[150px] min-w-[150px]">2</div>
                <div className="w-[180px] min-w-[180px]">
                    {status}
                </div>
                <div className="w-[100px] min-w-[100px]">20</div>
                <div className="w-[150px] min-w-[150px]">
                    {props.paymenturl === '-'?"-":<a className='bg-primary text-sm text-white min-w-[100px] px-10 rounded text-center ' target='_blank' href='#'>Pay</a>}
                </div>
                <div className="w-[100px] min-w-[100px]">-</div>
            </li>
            <hr />
        </>
    )
}