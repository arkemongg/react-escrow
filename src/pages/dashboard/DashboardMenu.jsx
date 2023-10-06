import { useEffect, useState } from 'react';
import styles from './styles/DashboardMenu.module.css'

const DashboardMenu = (props) => {

    const [buttonIndex, setButtonIndex] = useState(0);

    useEffect(()=>{
        if(props.index!==null){
            setButtonIndex(props.index)
            console.log(buttonIndex);
            console.log(props.index);
        }
    },[props.index])

    const handleClick = (event,buttonIndex)=>{
        setButtonIndex(buttonIndex)
        const head = event.target.closest('button').textContent
        props.setActive(head)
        props.setHead(head)
        props.setTail(head)
    }

    return (
        <>
            <section className={`${styles.DashboardMenuSection} `}>
                <div className={styles.DashboardMenuArea}>
                    <button onClick={(event) => handleClick(event, 0)} className={`${styles.dashboard} flex justify-center items-center text-white ${styles.button} ${buttonIndex===0?styles.clicked:""}`}>
                        <img src="./dashboardassets/dashboard.png" alt="" /> 
                        <div className="ml-2">Dashboard</div>
                    </button>

                    <button onClick={(event) => handleClick(event, 1)} className={`${styles.dashboard} flex justify-center items-center text-white ${styles.button} ${buttonIndex===1?styles.clicked:""}`}>
                        <img src="./dashboardassets/settings.png" alt="" /> 
                        <div className=" ml-2">Settings</div>
                    </button>

                    <button onClick={(event) => handleClick(event, 2)} className={`${styles.dashboard} flex justify-center items-center text-white ${styles.button} ${buttonIndex===2?styles.clicked:""}`}>
                        <img src="./dashboardassets/purchase.png" alt="" /> 
                        <div className="ml-2">Purchase</div>
                    </button>
                    <button onClick={(event) => handleClick(event, 3)} className={`${styles.dashboard} flex justify-center items-center text-white ${styles.button} ${buttonIndex===3?styles.clicked:""}`}>
                        <img src="./dashboardassets/deposit.png" alt="" /> 
                        <div className="ml-2">Deposit</div>
                    </button>
                    <button onClick={(event) => handleClick(event, 4)} className={`${styles.dashboard} flex justify-center items-center text-white ${styles.button} ${buttonIndex===4?styles.clicked:""}`}>
                        <img src="./dashboardassets/sales.png" alt="" /> 
                        <div className="ml-2">Sales</div>
                    </button>
                    <button onClick={(event) => handleClick(event, 5)} className={`${styles.dashboard} flex justify-center items-center text-white ${styles.button} ${buttonIndex===5?styles.clicked:""}`}>
                        <img src="./dashboardassets/sell.png" alt="" /> 
                        <div className="ml-2">Sell Items</div>
                    </button>
                    <button onClick={(event) => handleClick(event, 6)} className={`${styles.dashboard} flex justify-center items-center text-white ${styles.button} ${buttonIndex===6?styles.clicked:""}`}>
                        <img src="./dashboardassets/edit.png" alt="" /> 
                        <div className=" ml-2">Manage Items</div>
                    </button>
                    <button onClick={(event) => handleClick(event, 7)} className={`${styles.dashboard} flex justify-center items-center text-white ${styles.button} ${buttonIndex===7?styles.clicked:""}`}>
                        <img src="./dashboardassets/withdrawal.png" alt="" /> 
                        <div className="ml-2">Withdrawals</div>
                    </button>
                    <button onClick={(event) => handleClick(event, 8)} className={`${styles.dashboard} flex justify-center items-center text-white ${styles.button} ${buttonIndex===8?styles.clicked:""}`}>
                        <img src="./dashboardassets/reviews.png" alt="" /> 
                        <div className="ml-2">Reviews</div>
                    </button>
                </div>
            </section>
        </>
    )
  };
  
  export default DashboardMenu;