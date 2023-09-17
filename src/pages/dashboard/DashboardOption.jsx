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

            <RecentSoldItem/>
            <RecentSoldItem/>

            <RecentSoldItem/>

            <RecentSoldItem/>

            <RecentSoldItem/>

        </div>
    )
  }

  const RecentSoldItem = ()=>{
    return(
        <>
        <div className={`${styles.SoldItemsArea} p-5`}>
                <div className={styles.imageArea}>
                    <img src="/dashboardassets/d.jpg" alt="" />
                </div>

                <div className={`${styles.titleArea} text-center`}>
                    <div className="text-2xl">
                        Lorem ipsum dolor sit amet.
                    </div>
                </div>
                
                <div className='priceArea'>
                    <div className="text-3xl font-light text-primary">
                        $40
                    </div>
                </div>
            </div>
            <hr />
        </>
    )
  }

  const PopularProducts = ()=>{
    return(
        <div className={`${styles.RecentSoldItemsArea}`}>
            <div className="text-2xl p-5">
                Popular Items
            </div>
            <hr />

            <PopularProduct />
            <PopularProduct />
            <PopularProduct />
            <PopularProduct />
            <PopularProduct />

        </div>
    )
  }

  const PopularProduct = ()=>{
    return(
        <>
        <div className={`${styles.PopularProductArea} p-5`}>
                <div className={styles.imageArea}>
                    <img src="/dashboardassets/d.jpg" alt="" />
                </div>

                <div className={`${styles.titleArea} text-center`}>
                    <div className="text-2xl">
                        Lorem ipsum dolor sit amet.
                    </div>
                </div>
                <div className='priceArea p-5'>
                    <div className="text-sm font-light">
                        120 sales
                    </div>
                </div>
                <div className='priceArea'>
                    <div className="text-3xl font-light text-success">
                        $40
                    </div>
                </div>
            </div>
            <hr />
        </>
    )
  }

  