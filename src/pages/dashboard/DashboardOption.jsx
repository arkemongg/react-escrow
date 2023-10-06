import { useEffect, useState } from 'react';
import styles from './styles/DashboardOption.module.css'
import { AxiosInstanceJWT, convertToFourDigits, getJWT } from '../AxiosHeaders';
import LoadingArea from '../GlobalTemplates/LoadingArea';
import { useAuth } from '../../AuthContext';
import { EmptyMessage, FloatingError } from '../home/templates/Error';
import { apiUrl } from '../Urls';

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
    const [floatMessage,setFloatMessage] = useState(null)

    const { logout } = useAuth();
    const [balanceData,setBalanceData] = useState([])

    const axiosInstanceJWT = AxiosInstanceJWT()
    useEffect(()=>{
        const timer = setTimeout(() => {
            const getBalanceData = async ()=>{
                try {
                    const response = await axiosInstanceJWT.get(`/api/balance/`);
                    return response
                  } catch (error) {
                    throw error
                  }
               }
               const data = getBalanceData()
        
               data.then(data=>{
                    if(data.status === 200){
                        setBalanceData(data.data[0])
                    }
               }).catch(err=>{
                    if (err.response) {
                        if (err.response.status === 401) {
                            logout()
                        } else if(err.response.status === 429)  {
                            setFloatMessage("Too many requests.")
                        }else{
                            console.log("Unexpected error with status code: ", err.response.status);
                        }
                    } else {
                        alert("No response received from the server.");
                    }
               })
        }, 2000);

        return (()=>clearTimeout(timer))
    },[])
    return(
        <>
        {floatMessage!==null?<FloatingError message = {floatMessage} />:""}
        <div className={styles.BalanceDetailsArea}>
            <div className="balance flex flex-col items-center text-primary justify-center">
                <h1 className='text-4xl'>{balanceData.balance===undefined?<LoadingArea /> : `$${convertToFourDigits(balanceData.balance)}`}</h1>
                <div className="text-lg">Balance</div>
            </div>
            <div className="escrowBalance flex flex-col items-center text-info justify-center">
                <h1 className='text-4xl'>{balanceData.on_hold===undefined?<LoadingArea /> : `$${convertToFourDigits(balanceData.on_hold)}`}</h1>
                <div className="text-lg">In Escrow</div>
            </div>
            <div className="totalDeposit flex flex-col items-center text-success justify-center">
                
                <h1 className='text-4xl'>{balanceData.total_deposit===undefined?<LoadingArea /> : `$${convertToFourDigits(balanceData.total_deposit)}`}</h1>
                <div className="text-lg">Total Deposit</div>
            </div>
            <div className="totalPurchase flex flex-col items-center text-error justify-center">
                
                <h1 className='text-4xl'>{balanceData.total_withdraw===undefined?<LoadingArea /> : `$${convertToFourDigits(balanceData.total_withdraw)}`}</h1>
                <div className="text-lg">Total Withdraw</div>

            </div>
        </div>
        </>
    )
  }

//   Canged to most viewd items for simplicity (didn't change the component name)
  const RecentSoldItems = ()=>{
    const { logout } = useAuth();
    const [fetched,setFetched] = useState(false)
    const [data,setData] = useState([])
    
    useEffect(()=>{

        setTimeout(() => {
            const popularProducts = getJWT('/api/myproducts/?limit=6&ordering=-view_count')
            popularProducts.then(data=>{
                if(data.status===200){
                    setData(data.data.results)
                    setFetched(true)
                }
            }).catch(err=>{
                if (err.response) {
                    if (err.response.status === 401) {
                        logout()
                    } else if(err.response.status === 429)  {
                        alert("Too many requests.")
                    }
                } else {
                    //alert("No response received from the server.");
                }
            })
        }, 2000);

    },[])
    return(
        <div className={`${styles.RecentSoldItemsArea}`}>
            <div className="text-2xl p-5">
                Most Viewed Products
            </div>
            <hr />

            <div className={styles.recentSoldItemsWrapper}>
                {fetched ? (
                        data.length > 0 ?
                            data.map(product => {
                                
                                return <RecentSoldItem
                                    key = {product.id}
                                    title = {product.title}
                                    price  = {product.price}
                                    view_count = {product.view_count}
                                    img = {product.image}
                                />
                            }) : <EmptyMessage message={"No Products found."} />
                ) : <LoadingArea />}
                

            </div>
            
        </div>
    )
  }

  const RecentSoldItem = (props)=>{
    return(
        <>
        <div className={`${styles.SoldItemsArea} p-2`}>
                <div className={styles.imageArea}>
                    <img src={apiUrl+props.img} alt="" />
                </div>
                <div>
                    <p className='text-sm font-bold text-center'>{props.title}</p>
                    <p className='text-sm text-center text-primary'> ${props.price}</p>
                    <p className='text-sm text-center text-info'> {props.view_count} views</p>
                </div>
            </div>
        </>
    )
  }


  const PopularProducts = ()=>{
    const { logout } = useAuth();
    const [fetched,setFetched] = useState(false)
    const [data,setData] = useState([])
    
    useEffect(()=>{

        setTimeout(() => {
            const popularProducts = getJWT('/api/myproducts/?limit=6&ordering=-sales')
            popularProducts.then(data=>{
                if(data.status===200){
                    setData(data.data.results)
                    setFetched(true)
                }
            }).catch(err=>{
                if (err.response) {
                    if (err.response.status === 401) {
                        logout()
                    } else if(err.response.status === 429)  {
                        
                    }
                } else {
                    alert("No response received from the server.");
                }
            })
        }, 2000);

    },[])
    return(
        <div className={`${styles.RecentSoldItemsArea}`}>
            <div className="text-2xl p-5">
                Popular Items
            </div>
            <hr />

            <div className={styles.PopularProductWrapper}>
            {fetched ? (
                        data.length > 0 ?
                            data.map(product => {
                                
                                return <PopularProduct
                                    key = {product.id}
                                    title = {product.title}
                                    price  = {product.price}
                                    sales = {product.sales}
                                    img = {product.image}
                                />
                            }) : <EmptyMessage message={"No products found."} />
                    ) : <LoadingArea />}
            </div>
        </div>
    )
  }

  const PopularProduct = (props)=>{
    
    return(
        <>
        <div className={`${styles.PopularProductArea}`}>
                <div className={styles.imageArea}>
                    <img src={apiUrl+props.img} alt={props.title} />
                </div>
                <div>
                    <p className='text-sm font-bold text-center'> {props.title} </p>
                    <p className='text-sm text-center text-primary'> ${props.price}</p>
                    <p className='text-sm text-center font-light'> {props.sales} sales</p> 
                </div>

            </div>
            
        </>
    )
  }

  