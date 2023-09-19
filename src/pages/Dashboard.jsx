import { useState } from "react";
import { PageLocation } from "./GlobalTemplates/PageLocation";

import DashboardMenu from "./dashboard/DashboardMenu";
import DashboardOption from "./dashboard/DashboardOption";
import Settings from "./dashboard/Settings";
import Subscribe from "./home/Subscribe";
import Deposit from "./dashboard/Deposit";
import Withdrawals from "./dashboard/Withdrawals";
import Purchase from "./dashboard/Purchase";
import Sellitems from "./dashboard/SellItems";

const Dashboard = () => {
    const [head,setHead] = useState("Dashboard")
    const [tail,setTail] = useState("Dashboard")

    const [active,setActive] = useState("Sell Items")
    return (
      <>
        <PageLocation head={head} tail={`Home / ${tail}`}/>
        <DashboardMenu setHead={setHead} setTail={setTail} setActive = {setActive} />
        {active === 'Dashboard' && <DashboardOption />}
        {active === 'Settings' && <Settings />}
        {active === 'Deposit' && <Deposit />}
        {active === 'Withdrawals' && <Withdrawals />}
        {active === 'Purchase' && <Purchase />}
        {active === 'Sell Items' && <Sellitems />}


        <Subscribe />
      </>
    );
  };
  
  export default Dashboard;