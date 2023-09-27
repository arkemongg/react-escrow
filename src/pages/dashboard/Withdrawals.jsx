import { memo, useEffect, useState } from 'react';
import styles from './styles/Withdrawals.module.css'
import { AxiosInstanceJWT, convertDatetimeToDate } from '../AxiosHeaders';
import { EmptyMessage } from '../home/templates/Error';
import LoadingArea from '../GlobalTemplates/LoadingArea';

const Withdrawals = (props) => {
    const [amount, setAmount] = useState(0)
    const [address, setAddress] = useState(null)
    const [method, setMethod] = useState(null)
    console.log(method);
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

                    <div className="customWithdrawalsArea p-5">
                        <select onChange={e=>setMethod(e.target.value)} className="select select-bordered w-full max-w-xs" defaultValue="">
                            <option disabled value="">Select your withdraw currency?</option>
                            <option value="BTC">BTC</option>
                            <option value="LTC">LTC</option>
                        </select>
                    </div>
                    <div className="customWithdrawalsArea p-5">
                        <p className="text-2xl pb-5">Enter your selected method wallet address</p>
                        <input onChange={(e) => setAddress(e.target.value)} placeholder={"Enter your selected BTC/LTC wallet address."} type="text" className='input input-bordered rounded-none md:w-[80%] w-[100%] bg-[#EFF1F5]' />
                    </div>
                    <div className="div flex p-5">
                        <button className='btn btn-primary w-[310px] '>Withdraw</button>
                    </div>
                </div>

                <WithdrawalsHistory />
            </section>
        </>
    )
};

const WithdrawalsHistory = () => {
    const axiosInstanceJWT = AxiosInstanceJWT()
    const [url, setUrl] = useState("/api/transactions/?transaction_direction=OUT")

    const [prevUrl, setPrevUrl] = useState(null)
    const [nextUrl, setNextUrl] = useState(null)

    const [transactions, setTransactions] = useState([])
    const [totalTransactions, setTotalTransactions] = useState(-1)
    const [fetched, setFetched] = useState(false)

    const handlePrevBtn = (event) => {
        if (prevUrl === null) {
            return
        }
        setTransactions([])
        setUrl(prevUrl)

    }
    const handleNextBtn = (event) => {
        if (nextUrl === null) {
            return
        }
        setTransactions([])
        setUrl(nextUrl)
    }



    useEffect(() => {
        setFetched(false)
        const timer = setTimeout(() => {
            const getTransactions = async () => {
                try {
                    const response = axiosInstanceJWT(url)
                    return response
                } catch (error) {
                    return error
                }
            }
            const data = getTransactions()
            data.then(data => {
                if (data.status === 200) {
                    setTotalTransactions(data.data.count)
                    setTransactions(data.data.results);
                    setPrevUrl(data.data.previous)
                    setNextUrl(data.data.next)
                    setFetched(true)
                }
            }).catch(err => {
                if (err.response.status === 401) {
                    console.log("Authentication Error.");
                }
            })
        }, 2000);
        return (() => clearTimeout(timer))
    }, [url])

    return (
        <div className={styles.WithdrawalsHistory}>
            <div className={styles.WithdrawalsHistoryArea}>

                <ul className={styles.WithdrawalsList}>

                    <li className={`${styles.Withdrawals} p-5 pb-0`}>
                        <div className="text-xl w-[110px] min-w-[110px]">Date</div>
                        <div className="text-xl w-[150px] min-w-[150px]">Transaction ID</div>
                        <div className="text-xl w-[180px] min-w-[180px]">Transaction Status</div>
                        <div className="text-xl w-[100px] min-w-[100px]">Amount</div>
                        <div className="text-xl w-[100px] min-w-[100px]">TX ID</div>
                    </li>
                    <hr />
                    {fetched ? (
                        transactions.length > 0 ?
                            transactions.map(transaction => {
                                return <Transaction
                                    key={transaction.id}
                                    date={transaction.created_at}
                                    id={transaction.id}
                                    status={transaction.status}
                                    amount={transaction.amount}
                                    paymenturl={transaction.payment_url}
                                />
                            }) : <EmptyMessage message={"No transactions found."} />
                    ) : <LoadingArea />}
                </ul>
                <div className={`flex justify-center p-5 ${totalTransactions > 8 ? "" : "hidden"}`}>
                    <button onClick={handlePrevBtn} className={`btn btn-primary w-[150px] ${prevUrl === null ? "pointer-events-none" : ""}`}>Previous</button>
                    <button onClick={handleNextBtn} className={`btn btn-primary w-[150px] ml-5 ${nextUrl === null ? "pointer-events-none" : ""}`}>Next</button>
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

    if (props.status === "F") {
        status = failed
    } else if (props.status === "C") {
        status = complete
    }

    return (
        <>
            <li className={`${styles.Withdrawals} p-5 pt-0 pb-0 font-light text-xl`}>
                <div className="w-[110px] min-w-[110px]">{convertDatetimeToDate(props.date)}</div>
                <div className="w-[150px] min-w-[150px]">{props.id}</div>
                <div className="w-[180px] min-w-[180px]">
                    {status}
                </div>
                <div className="w-[100px] min-w-[100px]">${(props.amount).toFixed(2)}</div>
                <div className="w-[100px] min-w-[100px]">-</div>
            </li>
            <hr />
        </>
    )
}