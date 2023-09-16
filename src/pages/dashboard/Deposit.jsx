import { memo, useState } from 'react';
import styles from './styles/Deposit.module.css'

const Deposit = (props) => {
    const [amount,setAmount] = useState(0)
    const handleAmount = (event,amount)=>{
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
                        <div onClick={(event) => handleAmount(event, 10)} className={`bg-[#EFF1F5] w-[100px] p-[15px] text-center cursor-pointer m-5 ${amount==10?styles.active:""}`}>$10</div>
                        <div onClick={(event) => handleAmount(event, 20)} className={`bg-[#EFF1F5] w-[100px] p-[15px] text-center cursor-pointer m-5 ${amount==20?styles.active:""}`}>$20</div>
                        <div onClick={(event) => handleAmount(event, 50)} className={`bg-[#EFF1F5] w-[100px] p-[15px] text-center cursor-pointer m-5 ${amount==50?styles.active:""}`}>$50</div>
                        <div onClick={(event) => handleAmount(event, 100)} className={`bg-[#EFF1F5] w-[100px] p-[15px] text-center cursor-pointer m-5 ${amount==100?styles.active:""}`}>$100</div>
                        <div onClick={(event) => handleAmount(event, 250)} className={`bg-[#EFF1F5] w-[100px] p-[15px] text-center cursor-pointer m-5 ${amount==250?styles.active:""}`}>$250</div>
                        <div onClick={(event) => handleAmount(event, 500)} className={`bg-[#EFF1F5] w-[100px] p-[15px] text-center cursor-pointer m-5 ${amount==500?styles.active:""}`}>$500</div>
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

  const DepositHistory = ()=>{
    return (
        <div className={styles.DepositHistory}>
            <h1 className="text-4xl p-5">Deposit History </h1>
            <hr />
        </div>
    )
  }

  
  export default memo(Deposit);
