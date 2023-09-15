import { useState } from "react";
import { PageLocation } from "./GlobalTemplates/PageLocation";

import DashboardMenu from "./dashboard/DashboardMenu";
import DashboardOption from "./dashboard/DashboardOption";
import Settings from "./dashboard/Settings";

const Dashboard = () => {
    const [head,setHead] = useState("Dashboard")
    const [tail,setTail] = useState("Dashboard")

    const [active,setActive] = useState("Settings")
    return (
      <>
        <PageLocation head={head} tail={`Home / ${tail}`}/>
        <DashboardMenu setHead={setHead} setTail={setTail} setActive = {setActive} />
        {active === 'Dashboard' && <DashboardOption />}
        {active === 'Settings' && <Settings />}
      </>
    );
  };
  
  export default Dashboard;