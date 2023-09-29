import { memo, useEffect, useState } from 'react';
import styles from './styles/Deposit.module.css'
import {AxiosInstanceJWT, convertDatetimeToDate} from '../AxiosHeaders.js';
import LoadingArea from '../GlobalTemplates/LoadingArea';
import { EmptyMessage, FloatingError } from '../home/templates/Error';
import {FlaotingErrorCustom} from '../GlobalTemplates/FloatingErrorCustom'
import Modal from '../GlobalTemplates/Modal';
import { useAuth } from '../../AuthContext';

const Deposit = (props) => {
    const axiosInstanceJWT = AxiosInstanceJWT()
    const { logout } = useAuth();
    
    const [amount, setAmount] = useState(0)
    const [depositError,setDepositError] = useState("")
    const [err,setErr] = useState(false)
    const [clicked,setClicked] = useState(false)

    const [depositData,setDepositData] = useState([])
    const [depositSuccess,setDepositSuccess] = useState(false)

    const handleAmount = (event, amount) => {
        setAmount(amount)
    }

    const handleDeposit = (event)=>{

        setErr(false)
        if(amount<10 || amount>5000){
            setErr(true)
            if(amount<10){
                setDepositError(`Ensure the amount is greater than or equal to $10.`)
            }else{
                setDepositError(`Ensure the amount is smaller than or equal to $5000.`)
            }
            return;
        }
        setClicked(true)
        setTimeout(() => {
            const Amount = parseFloat(amount).toFixed(2)
            const postDeposit = async ()=>{
                try{
                    const response =  await axiosInstanceJWT.post('/api/deposit/',{
                        amount:Amount
                    })
                    return response
                }catch(error){
                    throw error
                }
            }
            const data = postDeposit()
            data.then(data=>{
                if(data.status===201){
                    setDepositData(data.data)
                    setDepositSuccess(true)
                }
            }).catch(err=>{
                    setErr(true)
                    if (err.response) {
                        if (err.response.status === 401) {
                            logout();
                        }else if (err.response.status === 429) {
                            alert("Too many requests.");
                        } else {
                            setDepositError("Unexpected error with status code: ", err.response.status);
                        }
                    } else {
                        setDepositError("No response received from the server.");
                    }
            })
            setClicked(false)
        }, 2000);
    }
    return (
        <>  
            {err?<FlaotingErrorCustom err={err} setErr={setErr} message = {depositError}/>:""}
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

                    <div className="customDepositArea px-5">
                        <p className="text-2xl pb-5">Enter custom amount</p>
                        <input value={amount} onChange={(e) => setAmount(e.target.value)} placeholder={amount} type="text" className='input input-bordered rounded-none md:w-[80%] w-[100%] bg-[#EFF1F5]' />
                    </div>
                    <DepositModal hidden = {depositSuccess} setHidden={setDepositSuccess} data = {depositData} />
                    {/* <p className={`text-error px-5 py-0 ${err?"":"hidden"}`}>{depositError}</p> */}
                    <div className="div flex px-5 py-2">
                        <button onClick={handleDeposit} className='btn btn-primary w-[320px]'>
                            {clicked ? <span className="loading loading-dots loading-md"></span> : "Deposit"}
                        </button>
                    </div>
                </div>
                <DepositHistory />
            </section>
        </>
    )
};

const DepositHistory = () => {
    const { logout } = useAuth();
    const [url,setUrl] = useState("/api/transactions/?transaction_direction=IN")
    const axiosInstanceJWT = AxiosInstanceJWT()
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
                    const response =await axiosInstanceJWT(url)
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
                    } else {
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
        <div className={styles.DepositHistory}>
            <div className={styles.DepositHistoryArea}>
                <ul className={`${styles.DepositsList}`}>

                    <li className={`${styles.Deposits} p-5 pb-0`}>
                        <div className="text-xl w-[120px] min-w-[120px]">Date</div>
                        <div className="text-xl w-[150px] min-w-[150px]">Transaction ID</div>
                        <div className="text-xl w-[180px] min-w-[180px]">Transaction Status</div>
                        <div className="text-xl w-[120px] min-w-[120px]">Amount</div>
                        <div className="text-xl w-[150px] min-w-[150px]">Payment URL</div>
                        <div className="text-xl w-[100px] min-w-[100px]">TX ID</div>
                    </li>
                    
                    {fetched ? (
                        transactions.length > 0 ?
                        transactions.map(transaction=>{
                            return <Transaction 
                                key = {transaction.id}
                                date = {transaction.created_at}
                                id = {transaction.id}
                                status = {transaction.status}
                                amount = {transaction.amount}
                                paymenturl = {transaction.payment_url}
                            />
                        }):<EmptyMessage message = {"No transactions found."}/>
                    ):<LoadingArea />}
                </ul>
                
                <div  className={`DepositHistoryBtn flex justify-center p-5 ${totalTransactions > 8 ?"":"hidden"}`}>
                    <button onClick={handlePrevBtn} className={`btn btn-primary w-[150px] ${prevUrl===null?"pointer-events-none":""}`}>Previous</button>
                    <button onClick={handleNextBtn} className={`btn btn-primary w-[150px] ml-5 ${nextUrl===null?"pointer-events-none":""}`}>Next</button>
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

    if (props.status === "F") {
        status = failed
    } else if (props.status === "C") {
        status = complete
    }

    return (
        <>
            <li className={`${styles.Deposits} p-5 pt-0 pb-0 font-light text-xl`}>
                <div className="w-[120px] min-w-[120px]">{convertDatetimeToDate(props.date)}</div>
                <div className="w-[150px] min-w-[150px]">{props.id}</div>
                <div className="w-[180px] min-w-[180px]">
                    {status}
                </div>
                <div className="w-[120px] min-w-[120px]">${(props.amount).toFixed(2)}</div>
                <div className="w-[150px] min-w-[150px]">
                    {props.paymenturl === '-'?"-":<a className='bg-primary text-sm text-white min-w-[100px] px-10 rounded text-center py-0.5' target='_blank' href={props.paymenturl}>Pay</a>}
                </div>
                <div className="w-[100px] min-w-[100px]">-</div>
            </li>
            
        </>
    )
}


const DepositModal = (props)=>{
    
    const handleHideBtn = ()=>{
        props.setHidden(false)
    }
    return(
        <>
            <div className={`${styles.blurryBackgroundSection} ${styles.blurryBackground} ${props.hidden?'':"hidden"}` }>
                <div className={styles.ModalArea}>
                    <button onClick={handleHideBtn} className={styles.closeModal}>
                        <img src="/dashboardassets/delete.png" alt="" />
                    </button>
                    <div className='text-center text-2xl font-bold'>
                        Transaction Has been Created....
                    </div>
                    <br />
                    <div className='text-center text-sm font-light p-2'>
                        Amount = ${props.data.amount}
                    </div>
                    <div className="btnArea flex justify-center">
                        <a href={props.data.payment_url} target='_blank' className="btn btn-neutral">Pay with Crypto 
                            <img style={{width:'25px'}} src="/dashboardassets/cryptocurrency.png" alt="crypto" />
                        </a>
                    </div>
                    <div className='text-sm font-light text-info p-5 text-center'>
                            You can pay within an hour. Please check email or transactions history for details.
                    </div>
                </div>
            </div>
        </>
    )
}