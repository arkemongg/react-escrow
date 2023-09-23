import { useState } from 'react';
import styles from './styles/DashboardOption.module.css'

const DashboardOption = (props) => {

    return (
        <>
            <section className={`${styles.DashboardOptionSection} `}>
                <div className={styles.DashboardOptionArea}>
                    <BalanceDetails />
                    <RecentSoldItems />
                    <PopularProducts/>
                </div>
            </section>
        </>
    )
  };
  
  export default DashboardOption;

  const BalanceDetails = ()=>{
    return(
        <div className={styles.BalanceDetailsArea}>
            <div className="balance flex flex-col items-center text-primary justify-center">
                <h1 className='text-4xl'>$0000</h1>
                <div className="text-lg">Balance</div>
            </div>
            <div className="escrowBalance flex flex-col items-center text-info justify-center">
                <h1 className='text-4xl'>$0000</h1>
                <div className="text-lg">In Escrow</div>
            </div>
            <div className="totalDeposit flex flex-col items-center text-success justify-center">
                <h1 className='text-4xl'>$0000</h1>
                <div className="text-lg">Total Deposit</div>
            </div>
            <div className="totalPurchase flex flex-col items-center text-error justify-center">
                <h1 className='text-4xl'>$0000</h1>
                <div className="text-lg">Total Withdraw</div>
            </div>
        </div>
    )
  }

  const RecentSoldItems = ()=>{
    return(
        <div className={`${styles.RecentSoldItemsArea}`}>
            <div className="text-2xl p-5">
                Recent Items Sales
            </div>
            <hr />

            <div className={styles.recentSoldItemsWrapper}>
                <RecentSoldItem/>
                <RecentSoldItem/>
                <RecentSoldItem/>
                <RecentSoldItem/>
                <RecentSoldItem/>
            </div>
            
        </div>
    )
  }

  const RecentSoldItem = ()=>{
    return(
        <>
        <div className={`${styles.SoldItemsArea} p-2`}>
                <div className={styles.imageArea}>
                    <img src="/dashboardassets/d.jpg" alt="" />
                </div>
                <div>
                    <p className='text-sm font-bold'> Lorem ipsum dolor sit amet.</p>
                    <p className='text-sm text-center text-primary'> $60</p>
                    <p className='text-sm text-center text-info'> 120 views</p>
                </div>
            </div>
        </>
    )
  }
  const RecentBlanceTransaction = ()=>{
    return(
        <>
            <div className={`${styles.RecentBlanceTransaction} p-2`}>
                
            </div>
        </>
    )
  }

  const PopularProducts = ()=>{
    return(
        <div className={`${styles.PopularProductsArea}`}>
            <div className="text-2xl p-5">
                Popular Items
            </div>
            <hr />

            <div className={styles.PopularProductWrapper}>
                <PopularProduct />
                <PopularProduct />
                <PopularProduct />
                <PopularProduct />
                <PopularProduct />
                <PopularProduct />
            </div>


        </div>
    )
  }

  const PopularProduct = ()=>{
    return(
        <>
        <div className={`${styles.PopularProductArea}`}>
                <div className={styles.imageArea}>
                    <img src="/dashboardassets/d.jpg" alt="" />
                </div>
                <div>
                    <p className='text-sm font-bold'> Lorem ipsum dolor sit amet.</p>
                    <p className='text-sm text-center text-primary'> $60</p>
                    <p className='text-sm text-center font-light'> 120 sales</p> 
                </div>

            </div>
        </>
    )
  }

  