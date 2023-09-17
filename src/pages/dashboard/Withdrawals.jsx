import { memo, useState } from 'react';
import styles from './styles/Withdrawals.module.css'

const Withdrawals = (props) => {
    const [amount, setAmount] = useState(0)
    return (
        <>
            <section className={`${styles.WithdrawalsSection} `}>
                <div className={styles.WithdrawalsArea}>
                    <h1 className="text-4xl p-5">Withdrawals</h1>
                    <hr />
                    <div className="customWithdrawalsArea p-5">
                        <p className="text-2xl pb-5">Enter withdrawal amount</p>
                        <input onChange={(e) => setAmount(e.target.value)} placeholder={amount} type="text" className='input input-bordered rounded-none md:w-[80%] w-[100%] bg-[#EFF1F5]' />
                    </div>
                    <div className="div flex p-5">
                        <button className='btn btn-primary w-[330px] '>Withdraw</button>
                    </div>
                </div>

                <WithdrawalsHistory />
            </section>
        </>
    )
};

const WithdrawalsHistory = () => {
    return (
        <div className={styles.WithdrawalsHistory}>
            <div className={styles.WithdrawalsHistoryArea}>

                <ul className={styles.WithdrawalsList}>

                    <li className={`${styles.Withdrawals} p-5 pb-0`}>
                        <div className="text-xl w-[100px] min-w-[100px]">Date</div>
                        <div className="text-xl w-[150px] min-w-[150px]">Transaction ID</div>
                        <div className="text-xl w-[180px] min-w-[180px]">Transaction Status</div>
                        <div className="text-xl w-[100px] min-w-[100px]">Amount</div>
                        <div className="text-xl w-[100px] min-w-[100px]">TX ID</div>
                    </li>
                    <hr />
                    <Transaction status={"failed"} />
                    <Transaction status={"complete"}  />
                    <Transaction status={"failed"} />
                    <Transaction status={"pending"}  />
                    <Transaction status={"failed"} />
                    <Transaction status={"complete"} />
                    <Transaction status={"failed"}/>
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


export default memo(Withdrawals);


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
            <li className={`${styles.Withdrawals} p-5 pt-0 pb-0 font-light text-xl`}>
                <div className="w-[100px] min-w-[100px]">12/25/20</div>
                <div className="w-[150px] min-w-[150px]">2</div>
                <div className="w-[180px] min-w-[180px]">
                    {status}
                </div>
                <div className="w-[100px] min-w-[100px]">20</div>
                <div className="w-[100px] min-w-[100px]">-</div>
            </li>
            <hr />
        </>
    )
}