import { memo, useEffect, useState } from "react";
import { PageLocation } from "./GlobalTemplates/PageLocation";

import DashboardMenu from "./dashboard/DashboardMenu";
import DashboardOption from "./dashboard/DashboardOption";
import Settings from "./dashboard/Settings";
import Subscribe from "./home/Subscribe";
import Deposit from "./dashboard/Deposit";
import Withdrawals from "./dashboard/Withdrawals";
import Purchase from "./dashboard/Purchase";
import Sellitems from "./dashboard/SellItems";
import Sales from "./dashboard/Sales";
import ManageItems from "./dashboard/ManageItems";
import ReviewsDashboard from "./dashboard/Reviews";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";

const Dashboard = () => {
    const { isLogged } = useAuth();
    const navigate = useNavigate()
    useEffect(()=>{
        if(!isLogged){
            navigate('/')
        }
    },[])

    const [index,setIndex] = useState(null)

    const [head,setHead] = useState("Dashboard")
    const [tail,setTail] = useState("Dashboard")

    const [active,setActive] = useState("Settings")
    useEffect(() => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });

    }, [active]);
    return (
      <>
        <PageLocation head={head} tail={`Home / ${tail}`}/>
        <DashboardMenu index = {index} setHead={setHead} setTail={setTail} setActive = {setActive} />
        {active === 'Dashboard' && <DashboardOption />}
        {active === 'Settings' && <Settings />}
        {active === 'Purchase' && <Purchase />}
        {active === 'Deposit' && <Deposit />}
        {active === 'Sales' && <Sales />}
      
        {active === 'Sell Items' && <Sellitems setHead ={setHead} setTail={setTail} setIndex={setIndex} setActive={setActive}/>}
        {active === 'Withdrawals' && <Withdrawals  />}
        {active === 'Manage Items' && <ManageItems setHead ={setHead} setTail={setTail} setIndex={setIndex} setActive={setActive} />}
        {active === 'Reviews' && <ReviewsDashboard  />}

        <Subscribe />
      </>
    );
  };
  
  export default memo(Dashboard)