import { memo, useEffect, useState } from 'react';
import styles from './styles/Withdrawals.module.css'
import { AxiosInstanceJWT, convertDatetimeToDate, postJWT } from '../AxiosHeaders';
import { EmptyMessage } from '../home/templates/Error';
import LoadingArea from '../GlobalTemplates/LoadingArea';
import { useAuth } from '../../AuthContext';
import { FlaotingErrorCustom } from '../GlobalTemplates/FloatingErrorCustom';

const Withdrawals = (props) => {
    const [amount, setAmount] = useState(0)
    const [address, setAddress] = useState("")
    const [method, setMethod] = useState(null)

    const [success,setSuccess] = useState(false)
    const [clicked,setClicked] = useState(false)
    const [err,setErr] = useState(false)
    const [message,setMessage] = useState("")
    
    const handleWithdraw = ()=>{
        if(amount<10 || amount > 5000 || address.trim()==="" || method === null){
            setErr(true)
            if(amount<10 || amount > 5000){
                setMessage("Amount should be greater than 10 or smaller than 5000.")
            }else if(method===null){
                setMessage("Please select a currency.")
            }else if(address.trim()===""){
                setMessage("Please submit a valid crypto address.")
            }
            return
        }
        setClicked(true)
        const withdrawData = {
            amount:amount,
            crypto:method,
            cryptoaddress:address
        }

        setTimeout(() => {
            const url = '/api/withdraw/'
            const data = postJWT(url,withdrawData);
            data.then(data=>{
                if(data.status===201){
                    setSuccess(true)
                }else{
                    alert("Unexpected error.")
                }
            }).catch(err=>{
                setErr(true)
                if(err.response){
                    if(err.response.status===400){
                        if(err.response.data.error){
                            
                            setMessage(err.response.data.error)
                        }else{
                            alert("Unexpected error.")
                        }
                    }else if(err.response.status===429){
                        setMessage("Too many requests.")
                    }else{
                        alert("Unexpected error.")
                    }
                }else{
                    setMessage("No response received from the server.");
                    alert("No response from server.")
                }
            })
            setClicked(false)
        }, 2000);
    }
    return (
        <>
            {err?<FlaotingErrorCustom err = {err} setErr = {setErr} message = {message} />:""}
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
                    <p className='text-[13px] font-light text-error mx-5'>***Clicking the withdraw button will inititate a withdraw request.</p>
                    <div className="div flex px-5 pt-2 pb-5">
                        
                        <button onClick={handleWithdraw} className='btn btn-primary w-[310px] '>
                            {clicked?<span className="loading loading-dots loading-md"></span>:"Withdraw"}
                        </button>
                    </div>
                </div>
                <WithdrawSuccess success = {success} setSuccess={setSuccess} />
                <WithdrawalsHistory />
            </section>
        </>
    )
};


const WithdrawSuccess = (props)=>{
    const handleClose = ()=>{
        props.setSuccess(false)
    }
    return(
        <>
            <div className={` ${styles.blurryBackgroundSection} ${styles.blurryBackground} ${props.success?'':"hidden"}` }>
                <div className={`${styles.ModalArea}`}>
                    <div className='text-center text-3xl font-bold flex items-center'>
                    <img className='w-[20px] h-[20px]' src="dashboardassets/success.png"  alt="" />Withdraw request is successful. 
                    </div>
                    <p className='text-info text-sm'>We will process your withdraw as soon as possible.</p>
                    <br />
                    <div className='text-sm font-light text-primary p-5 text-center'>
                         <button onClick={handleClose} className='btn btn-error min-w-[150px]' >Close</button>
                    </div>
                </div>
            </div>
        </>
    )
}

const WithdrawalsHistory = () => {
    const {logout} = useAuth()
    const axiosInstanceJWT = AxiosInstanceJWT()
    const [url, setUrl] = useState("/api/transactions/?transaction_direction=OUT&limit=8")

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
                if (err.response) {
                    if (err.response.status === 401) {
                        logout();
                    }else if (err.response.status === 429) {
                        alert("Too many requests.");
                    } else {
                        alert("Unexpected error with status code: ", err.response.status);
                    }
                } else {
                    alert("No response received from the server.");
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
                        <div className="text-xl w-[500px] min-w-[500px]">TX ID</div>
                    </li>
                    
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
                                    TX_ID={transaction.TX_ID}
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
                <div title={props.TX_ID} className="w-[500px] min-w-[500px]">
                     {props.TX_ID}
                </div>
            </li>
            
        </>
    )
}